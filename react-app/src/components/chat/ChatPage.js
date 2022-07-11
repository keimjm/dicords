import React, {useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {io } from 'socket.io-client'

let socket;

function Chat() {
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([]);
  const url = useLocation().pathname
  const friendId = url.split("/")[3]
  const users = useSelector(state => state.users.users)
  const sessionUser = useSelector(state => state.session.user)

  const friend = users?.filter(user => user.id == friendId)[0]

  useEffect(() => {
    // open socket connection
    // create websocket
    socket = io();

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
  socket.emit("chat", { user: sessionUser.username, msg: chatInput });
  // clear the input field after the message is sent
  setChatInput("")
}
  


  


  return (
    <div className='message-container'>
      <header className='chat-header'><span className='hash'>@</span>{friend?.username}</header>
      <div className='message-content'>
        <div className='view-messages-container'>
        <div className='messages'>
    {messages.map((message, ind) => (
        <div key={ind}>{`${message.user}: ${message.msg}`}</div>
    ))}
</div>
        <div className='send-message-container'>
              <form className='message-form' onSubmit={sendChat}>
                <input 
                type='text' 
                className='message-input' 
                placeholder={`@${friend?.username}`} 
                value={chatInput} 
                onChange={(e) => setChatInput(e.target.value)} />
              </form>
          </div>
      </div>
      </div>
    </div>
  )
}

export default Chat
