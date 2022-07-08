import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux';
import Sidebar from './servers/Sidebar.js';
import Chat from './chat/ChatPage'
import Server from './servers/Server.js';
import {setCurrent} from '../store/server'
import { Link } from 'react-router-dom';


function HomePage() {
  const dispatch = useDispatch();
  let channels;

  const servers = Object.values(useSelector(state => state.servers))
  let users = Object.values(useSelector(state => state.users))
  

  if (!servers) return null

  return (
    <div className="home-page">
        <Chat />
    </div>
  )
}

export default HomePage
