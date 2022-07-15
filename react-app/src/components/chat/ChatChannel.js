import React, {useEffect, useState} from 'react'
import {useLocation, useHistory} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import DefaultAvatar from '../../Discord-Logo-White.svg'
import {Avatar} from '@material-ui/core'
import {io } from 'socket.io-client'

let socket;

function ChatChannel() {
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([]);
  const users = useSelector(state => state.users.users)
  const sessionUser = useSelector(state => state.session.user)
  const url = useLocation().pathname
  const history = useHistory()
  const dispatch = useDispatch();
  const channelId = url.split("/")[3]
  const serverId = url.split("/")[2]
  const server = useSelector(state => state.servers[serverId])
  const channel = server?.channels.filter(channel => channel.id == channelId)[0]
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();

  today = mm + '/' + dd + '/' + yyyy;

  

  useEffect(() => {
    // open socket connection
    // create websocket
    socket = io();

    socket.on("show_channel_msgs", (data) => {
      console.log(data);
      data.messages.forEach(message => setMessages((messages => [...messages, message])))
      //setMessages(messages => [...messages, ])
    })

    socket.on("channel_chat", (chat) => {
        setMessages(messages => [...messages, chat])
    })
    // when component unmounts, disconnect
    return (() => {
        socket.disconnect()
    })
}, [])


  useEffect(() => {
      setMessages([])
      socket.emit("get_channel_msgs", {sender: sessionUser?.id, username: sessionUser?.username, channel: channel?.id })
  }, [channel])



const sendChat = (e) => {
  e.preventDefault()
  // emit a message
  socket.emit("channel_chat", { sender: sessionUser.id, username: sessionUser.username, channel: channel?.id,  message: chatInput });
  // clear the input field after the message is sent
  setChatInput("")
}


  


  return (
    <>
    <div className='message-container'>
      <header className='chat-header'><span className='hash'>#</span>{channel?.channel_name}</header>
      <div className='message-content'>
        <div className='view-messages-container'>
        <ul className='messages'>
    {messages.map((message, ind) => (
        <li className='message-item' key={ind}>
          <Avatar src={DefaultAvatar} className="message-icon" />
          <div className='message-content'>
          <div className='message-sender'>{message.username} <span className="created_at"> {message.created_at || today}</span></div>
            <div className="message-text">{message.message}</div>
            </div>
        </li>
    ))}
</ul>
        <div className='send-message-container'>
              <form className='message-form' onSubmit={sendChat}>
                <input 
                type='text' 
                className='message-input' 
                placeholder='say something' 
                maxLength="100"
                required
                value={chatInput} 
                onChange={(e) => setChatInput(e.target.value)} />
              </form>
          </div>
      </div>
      </div>
    </div>
    <div className='members-container'>
      <div className='member-header'>MEMBERS - {server?.members?.length}</div>
      <ul className='member-list'>
      {server?.members.map(member => {
        return (
            <div className='member'><Avatar src={DefaultAvatar} className="message-icon" /> {member.username}</div>
        )
      })}
      </ul>
    </div>

    </>
  )
}

export default ChatChannel
