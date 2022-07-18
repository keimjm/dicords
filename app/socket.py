from operator import and_
from app.models.channel_message import ChannelMessage
from flask_socketio import SocketIO, emit, join_room, leave_room
from app.models import db, DirectMessage, User
from sqlalchemy import desc, or_, and_, asc
from app.chat import pred_class, words, classes, get_response, data
import os


# configure cors_allowed_origins
if os.environ.get('FLASK_ENV') == 'production':
    origins = [
        'http://aa-dicords.herokuapp.com',
        'https://aa-dicords.herokuapp.com'
    ]
else:
    origins = "*"

# initialize your socket instance
socketio = SocketIO(cors_allowed_origins=origins)


@socketio.on('get_dm_msgs')
def handle_sync(data):
    messages = DirectMessage.query.filter(or_(and_(DirectMessage.sender_id == data["sender"], DirectMessage.recipient_id == data["recipient"]), and_(DirectMessage.recipient_id == data["sender"], DirectMessage.sender_id == data["recipient"]))
                                          ).order_by(asc(DirectMessage.updated_at)).all()

    print(data)
    user = User.query.get(data["sender"])

    print(user)

    emit('show_dm_msgs', {'messages': [
         message.to_dict(username=user.username) for message in messages]})

# handle chat messages


@ socketio.on("chat")
def handle_chat(data):

    # sender = User.query.get(data["sender"])
    # recipient = User.query.get(data["recipient"])
    message = DirectMessage(
        message=data["message"],
        sender_id=data["sender"],
        recipient_id=data["recipient"],
    )
    db.session.add(message)
    db.session.commit()

    emit("chat", data, broadcast=True)


@socketio.on('get_channel_msgs')
def handle_channel_sync(data):
    messages = ChannelMessage.query.filter_by(
        channel_id=data["channel"]).order_by(asc(ChannelMessage.updated_at)).all()

    user = User.query.get(data["sender"])
    print(messages)

    emit('show_channel_msgs', {'messages': [
         message.to_dict(username=user.username) for message in messages]})


@ socketio.on("channel_chat")
def handle_chat(data):

    message = ChannelMessage(
        message=data["message"],
        sender_id=data["sender"],
        channel_id=data["channel"],
    )
    db.session.add(message)
    db.session.commit()

    emit("channel_chat", data, broadcast=True)


# running the chatbot
@socketio.on("chatbot")
def handle_chatbot(chat_data):
    message = chat_data["message"]
    intents = pred_class(message, words, classes)
    result = get_response(intents, data)
    message = DirectMessage(
        message=result,
        sender_id=chat_data["sender"],
        recipient_id=chat_data["recipient"],
    )
    db.session.add(message)
    db.session.commit()
    print(message)
    # created_at = created_at.strftime('%m/%d/%Y')
    emit("bot_response", {'message': message.to_dict(username='chatbot')})
