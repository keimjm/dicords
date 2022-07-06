import React from 'react'
import Sidebar from './Sidebar.js';
import Chat from './chat/ChatPage'
import Server from './servers/Server.js';


function HomePage() {
  return (
    <div className="home-page">
      <Server />
        <Sidebar />
        <Chat />
    </div>
  )
}

export default HomePage
