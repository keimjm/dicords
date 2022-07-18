import React, {useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'
import {useSelector} from 'react-redux'
import DefaultAvatar from '../../Discord-Logo-White.svg'
import {Avatar} from '@material-ui/core'
import {io } from 'socket.io-client'

let socket;

function ChatBot() {
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([]);
  const sessionUser = useSelector(state => state.session.user)
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();
  let empty = true;

  today = mm + '/' + dd + '/' + yyyy;

  useEffect(() => {
    // open socket connection
    // create websocket
    socket = io();

    socket.on("bot_response", (data) => {
        console.log(data)
        setMessages(messages => [...messages, data.message])
    })

    socket.on("chat", (chat) => {
        setMessages(messages => [...messages, chat])
    })
    
    // when component unmounts, disconnect
    return (() => {
        socket.disconnect()
    })
}, [])

const sendChat = (e) => {
  e.preventDefault()
  // emit a message
  socket.emit("chat", { sender: sessionUser.id, username: sessionUser.username, recipient: 6,  message: chatInput });
  socket.emit("chatbot", {  message: chatInput, sender: 6, username: "chatbot", recipient: 1,  });
  // clear the input field after the message is sent
  setChatInput("")
}

if (messages.length > 0) empty = false




  


  return (
    <div className='message-container'>
      <header className='chat-header'><span className='hash'>@</span>chatbot</header>
      <div className='message-content'>
        <div className='view-messages-container'>
        <ul className='messages'>  
        {!empty ? 
            messages.map((message, ind) => (
                  <li className='message-item' key={ind}>
                    <Avatar src={DefaultAvatar} className="message-icon" />
                    <div className='message-content'>
                      <div className='message-sender'>{message.username} <span className="created_at"> {message.created_at || today}</span></div>
                      <div className="message-text">{message.message}</div>
                      </div>
                  </li>)) :
        <li className='message-item'>
        <div className='message-content'>
          <div className='message-sender'>Looks empty in here</div>
          <div className="message-text">Type something in the chat to start this conversation</div>
          </div>
      </li> 
    }
    </ul>
        <div className='send-message-container'>
              <form className='message-form' onSubmit={sendChat}>
                <input 
                type='text' 
                className='message-input'
                maxLength="100"
                required
                placeholder='@chatbot'
                value={chatInput} 
                onChange={(e) => setChatInput(e.target.value)} />
              </form>
          </div>
      </div>
      </div>
    </div>
  )
}

export default ChatBot
