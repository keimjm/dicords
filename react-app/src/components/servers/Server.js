import { Link } from '@material-ui/core'
import React from 'react'
import {useDispatch, useSelector } from 'react-redux'
import {setCurrent} from '../../store/server'


function Server({servers}) {
  const dispatch = useDispatch()

  const setCurrentServer = (server) => {
    dispatch(setCurrent(server))
  }


  if (!servers) return null


  return (
    <div>
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
      <div onClick={setCurrentServer(server)} className='server-button'>{shortened}</div>
      )
    })}
    </div>
    {/* <Sidebar servers={servers} /> */}
        {/* <div className='server-button'>AA
        
        </div>
        <div className='server-button'>BB
        
        </div>
        <div className='server-button'>CC
        
        </div>
        <div className='server-button'>DD
        
        </div>
        <div className='server-button'>EE
       
        </div> */}
    </div>
  )
}

export default Server
