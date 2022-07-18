from tensorflow.keras import Sequential
import tensorflow as tf
from nltk.stem import WordNetLemmatizer
import random
from tensorflow.keras.layers import Dense, Dropout
import numpy as np
import pickle
import nltk
import string
import json

nltk.download('punkt')
nltk.download('stopwords')

data = {"intents": [
    {"tag": "greeting",
     "patterns": ["Hello", "How are you?", "Hi there", "Hi", "Whats up"],
     "responses": ["Howdy Partner!", "Hello", "How are you doing?", "Greetings!", "How do you do?"],
     },
    {"tag": "age",
     "patterns": ["how old are you?", "when is your birthday?", "when was you born?"],
     "responses": ["I am 24 years old", "I was born in 1996", "My birthday is July 3rd and I was born in 1996", "03/07/1996"]
     },
    {"tag": "date",
     "patterns": ["what are you doing this weekend?",
                  "do you want to hang out some time?", "what are your plans for this week"],
     "responses": ["I am available all week", "I don't have any plans", "I am not busy"]
     },
    {"tag": "name",
     "patterns": ["what's your name?", "what are you called?", "who are you?"],
     "responses": ["My name is chatbot", "I'm chatbot", "chatbot"]
     },
    {"tag": "goodbye",
     "patterns": ["bye", "g2g", "see ya", "adios", "cya"],
     "responses": ["It was nice speaking to you", "See you later", "Speak soon!"]
     },
    {"tag": "jokes",
     "patterns": ["Tell me a joke", "Joke", "Make me laugh"],
     "responses": [
         "A perfectionist walked into a bar...apparently, the bar wasn't set high enough",
         "I ate a clock yesterday, it was very time-consuming",
         "Never criticize someone until you've walked a mile in their shoes. That way, when you criticize them, they won't be able to hear you from that far away. Plus, you'll have their shoes.",
         "The world tongue-twister champion just got arrested. I hear they're gonna give him a really tough sentence.",
         "I own the world's worst thesaurus. Not only is it awful, it's awful.",
         "What did the traffic light say to the car? \"Don't look now, I'm changing.\"",
         "What do you call a snowman with a suntan? A puddle.",
         "How does a penguin build a house? Igloos it together",
         "I went to see the doctor about my short-term memory problems, the first thing he did was make me pay in advance",
         "As I get older and I remember all the people I've lost along the way, I think to myself, maybe a career as a tour guide wasn't for me.",
         "o what if I don't know what 'Armageddon' means? It's not the end of the world."]
     },
]
}


lemmatizer = WordNetLemmatizer()
# Each list to create
words = []
classes = []
doc_X = []
doc_y = []
# Loop through all the intents
# tokenize each pattern and append tokens to words, the patterns and
# the associated tag to their associated list
for intent in data["intents"]:
    for pattern in intent["patterns"]:
        tokens = nltk.word_tokenize(pattern)
        words.extend(tokens)
        doc_X.append(pattern)
        doc_y.append(intent["tag"])

    # add the tag to the classes if it's not there already
    if intent["tag"] not in classes:
        classes.append(intent["tag"])
# lemmatize all the words in the vocab and convert them to lowercase
# if the words don't appear in punctuation
words = [lemmatizer.lemmatize(word.lower())
         for word in words if word not in string.punctuation]
# sorting the vocab and classes in alphabetical order and taking the # set to ensure no duplicates occur
words = sorted(set(words))
classes = sorted(set(classes))


training = []
out_empty = [0] * len(classes)
# creating the bag of words model
for idx, doc in enumerate(doc_X):
    bow = []
    text = lemmatizer.lemmatize(doc.lower())
    for word in words:
        bow.append(1) if word in text else bow.append(0)
    # mark the index of class that the current pattern is associated
    # to
    output_row = list(out_empty)
    output_row[classes.index(doc_y[idx])] = 1
    # add the one hot encoded BoW and associated classes to training
    training.append([bow, output_row])
# shuffle the data and convert it to an array
random.shuffle(training)
training = np.array(training, dtype=object)
# split the features and target labels
train_X = np.array(list(training[:, 0]))
train_y = np.array(list(training[:, 1]))


input_shape = (len(train_X[0]),)
output_shape = len(train_y[0])
epochs = 300
# the deep learning model
model = Sequential()
model.add(Dense(128, input_shape=input_shape, activation="relu"))
model.add(Dropout(0.5))
model.add(Dense(64, activation="relu"))
model.add(Dropout(0.3))
model.add(Dense(output_shape, activation="softmax"))
adam = tf.keras.optimizers.Adam(learning_rate=0.01, decay=1e-6)
model.compile(loss='categorical_crossentropy',
              optimizer=adam,
              metrics=["accuracy"])
print(model.summary())
model.fit(x=train_X, y=train_y, epochs=300, verbose=1)


def clean_text(text):
    tokens = nltk.word_tokenize(text)
    tokens = [lemmatizer.lemmatize(word) for word in tokens]
    return tokens


def bag_of_words(text, vocab):
    tokens = clean_text(text)
    bow = [0] * len(vocab)
    for w in tokens:
        for idx, word in enumerate(vocab):
            if word == w:
                bow[idx] = 1
    return np.array(bow)


def pred_class(text, vocab, labels):
    bow = bag_of_words(text, vocab)
    result = model.predict(np.array([bow]))[0]
    thresh = 0.2
    y_pred = [[idx, res] for idx, res in enumerate(result) if res > thresh]

    y_pred.sort(key=lambda x: x[1], reverse=True)
    return_list = []
    for r in y_pred:
        return_list.append(labels[r[0]])
    return return_list


def get_response(intents_list, intents_json):
    tag = intents_list[0]
    list_of_intents = intents_json["intents"]
    for i in list_of_intents:
        if i["tag"] == tag:
            result = random.choice(i["responses"])
            break
    return result
