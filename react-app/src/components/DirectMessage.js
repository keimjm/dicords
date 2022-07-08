import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux';
import Sidebar from './servers/Sidebar.js';
import Chat from './chat/ChatPage'
import Server from './servers/Server.js';
import {setCurrent} from '../store/server'
import { Link } from 'react-router-dom';


function DirectMessage() {
  const dispatch = useDispatch();
  let channels;

  const servers = Object.values(useSelector(state => state.servers))
  let users = Object.values(useSelector(state => state.users))
  

  const setCurrentServer = (server) => {
    //dispatch(setCurrent(server))
  }

  if (!servers) return null

  return (
    <div className="home-page">
      {/* <Server servers={servers} /> */}
      <div className="server-container">
        <div className='server-button'>
          <Link to='/channels/@me'>
        <span><i className="fa-brands fa-discord"></i></span>
        </Link>
        </div>
        <div className='bottom-border'></div>

        {servers?.map((server) => {
          const shortened = server.server_name.split(' ').map(word => word[0]).join("")
          return (
            <Link to={`/channels/${server.id}`} server={server} className="no-decor">
          <div onClick={() => setCurrentServer(server)} className='server-button'>{shortened}</div>
          </Link>
          )
        })}
        </div>
        <Sidebar />
        <Chat />
    </div>
  )
}

export default DirectMessage
