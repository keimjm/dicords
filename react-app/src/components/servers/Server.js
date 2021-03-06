import { Link } from 'react-router-dom'
import React, {useState} from 'react'
import {useDispatch, useSelector } from 'react-redux'


function Server({setShowAddModal, setShowJoinModal}) {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)
  let joinedServers = Object.values(useSelector(state => state.session.user.servers))
  const servers = Object.values(useSelector(state => state.servers))
  let serverSet = new Set()
  joinedServers.map(server => serverSet.add(server.id))
  joinedServers = servers.filter(server => server.user_id === sessionUser.id || serverSet.has(server.id))






  const addNewServer = () => {
    setShowAddModal()
  }

  const joinServer = () => {
    setShowJoinModal()
  }

  if (!servers) return null


  return (
      <div className="server-container">
        <div className='server-nav-container'>
        <div className='server-button'>
          <Link to='/channels/@me'>
        <span><i className="fa-brands fa-discord"></i></span>
        </Link>
        </div>
        <div className='bottom-border'></div>
        {joinedServers?.map((server) => {
          const shortened = server.server_name.split(' ').map(word => word[0]).join("")
          return (
            <Link to={`/channels/${server.id}/${server?.channels[0].id}`} server={server} className="no-decor">
          <div className='server-button'>{shortened}</div>
          </Link>
          )
        })}
          <div className='bottom-border'></div>
          <div className='server-button' onClick={addNewServer}><i className="fa-solid fa-plus"></i></div>
          <div className='server-button' onClick={joinServer}><i className="fa-solid fa-compass"></i></div>
        </div>
        </div>
  )
}

export default Server
