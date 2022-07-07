import React from 'react'
import ChatHeader from './ChatHeader'

function Chat() {
  return (
    <div className='message-container'>
      <header className='chat-header'><span className='hash'>#</span>Channel</header>
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
