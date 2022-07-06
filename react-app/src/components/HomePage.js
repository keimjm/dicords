import React from 'react'
import Sidebar from './Sidebar.js';
import Chat from './chat/ChatPage'


function HomePage() {
  return (
    <div className="home-page">
        <Sidebar />
        <Chat />
    </div>
  )
}

export default HomePage
