import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {joinServer} from '../../store/server'
import { authenticate } from '../../store/session'

function JoinServer({onClose}) {
  const dispatch = useDispatch()
  const allServers = Object.values(useSelector(state => state.servers))
  const sessionUser = useSelector(state => state.session.user)
  let serversSet = new Set();
  allServers.map(server => {serversSet.add(server.id)})
  sessionUser.servers.map(server => serversSet.delete(server.id))
  let servers = allServers.filter(server => serversSet.has(server.id) && server.user_id !== sessionUser.id)

  



  const joinAServer = async (server) => {

    await dispatch(joinServer(sessionUser?.id, server?.id))
    await dispatch(authenticate())
    onClose()
  }
    

  return (
    <div className='create-block'>
    <header className='create-channel'>Join Server</header>
    <div className='join-server-button'>
        {servers.map(server => {
            return (
                <button className='button' onClick={() => joinAServer(server)}>{server?.server_name}</button>
            )
        })}
        </div>
  </div>
  )
}

export default JoinServer
