import React from 'react'
import {useSelector} from 'react-redux'

function JoinServer({onClose}) {
  const allServers = Object.values(useSelector(state => state.servers))
  const sessionUser = useSelector(state => state.session.user)
  let serversSet = new Set();
  allServers.map(serverId => {serversSet.add(serverId)})
  sessionUser.servers.map(serverId => serversSet.delete(serverId))
  let servers = [...serversSet]

  



  const joinServer = (server) => {

  }
    

  return (
    <div className='create-block'>
    <header className='create-channel'>Join Server</header>
        {servers.map(server => {
            return (
                <button className='button' onClick={() => joinServer(server)}>{server?.server_name}</button>
            )
        })}
  </div>
  )
}

export default JoinServer
