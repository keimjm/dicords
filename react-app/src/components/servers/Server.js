import { Link } from 'react-router-dom'
import React, {useState} from 'react'
import {useDispatch, useSelector } from 'react-redux'
import {setCurrent} from '../../store/server'


function Server({setShowModal}) {
  const dispatch = useDispatch()
  const servers = Object.values(useSelector(state => state.servers))
  

  // const setCurrentServer = (server) => {
  //   dispatch(setCurrent(server))
  // }

  const addNewServer = () => {
    console.log("SHOWING MODAL")
    setShowModal()
    
  }


  if (!servers) return null


  return (
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
            <Link to={`/channels/${server.id}/${server.id}`} server={server} className="no-decor">
          <div className='server-button'>{shortened}</div>
          </Link>
          )
        })}
          <div className='bottom-border'></div>
          <div className='server-button' onClick={addNewServer}><i className="fa-solid fa-plus"></i></div>
        </div>
  )
}

export default Server
