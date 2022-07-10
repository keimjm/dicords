import React from 'react'
import {useLocation} from 'react-router-dom'
import {useSelector} from 'react-redux'


function Chat() {
  const url = useLocation().pathname
  const friendId = url.split("/")[3]
  const users = useSelector(state => state.users.users)

  const friend = users.filter(user => user.id == friendId)[0]


  return (
    <div className='message-container'>
      <header className='chat-header'><span className='hash'>@</span>{friend?.username}</header>
      <div className='message-content'>
        <div className='view-messages-container'>
        <div className='messages'>
        <ul className='chat-messages'>
          <li>A message</li>
        </ul>
        </div>
        <div className='send-message-container'>
              <form className='message-form'>
                <input type='text' className='message-input' placeholder='type something' />
              </form>
          </div>
      </div>
      </div>
    </div>
  )
}

export default Chat
