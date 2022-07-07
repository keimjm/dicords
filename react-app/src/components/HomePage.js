import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux';
import Sidebar from './Sidebar.js';
import Chat from './chat/ChatPage'
import Server from './servers/Server.js';
import {setCurrent} from '../store/server'
import { Link } from '@material-ui/core'


function HomePage() {
  const dispatch = useDispatch();

  const servers = Object.values(useSelector(state => state.servers))

  let channels = Object.keys(useSelector(state => state.users))

  const setCurrentServer = (server) => {
    dispatch(setCurrent(server))
  }

  if (!servers) return null

  return (
    <div className="home-page">
      {/* <Server servers={servers} /> */}
      <div className="server-container">
        <div className='server-button'>
          <Link to='/channels'>
        <span><i className="fa-brands fa-discord"></i></span>
        </Link>
        </div>
        <div className='bottom-border'></div>

        {servers?.map((server) => {
          const shortened = server.server_name.split(' ').map(word => word[0]).join("")
          return (
          <div onClick={() => setCurrentServer(server)} className='server-button'>{shortened}</div>
          )
        })}
        </div>
        <Sidebar channels={channels} />
        <Chat />
    </div>
  )
}

export default HomePage
