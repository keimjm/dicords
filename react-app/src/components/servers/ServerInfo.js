import React from 'react'
import Channels from '../channels/Channels'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import AddIcon from '@material-ui/icons/Add'
import SettingsIcon from '@material-ui/icons/Settings'
import {Avatar} from '@material-ui/core'
import DefaultAvatar from '../../Discord-Logo-White.svg'
import '../../display.css'
import { useSelector, useDispatch} from 'react-redux'
import { useParams, useLocation, useHistory } from 'react-router-dom'
import FriendList from '../FriendList'
import {deleteServer} from '../../store/server'

function ServerInfo() {
    const history = useHistory();
    const dispatch = useDispatch();
    const url = useLocation().pathname
    const serverId = url.split("/")[2]
    const sessionUser = useSelector(state => state.session.user)
    const server = useSelector(state => state.servers[serverId])
    let content = null

    const handleDelete = () => {
        const data = dispatch(deleteServer(serverId))
        history.push("/channels/@me")
      }
    
    
    const channels = server?.channels

    if (serverId === '@me') content =  (<FriendList />)
    else content =  (
        <div className="sidebar-channel-block">
        <div className='sidebar-channel-header'>                
        <div className='channel-header'>
            {/* <ExpandMoreIcon /> */}
        <h4>TEXT CHANNELS</h4>
        </div>
        <AddIcon className='sidebar-add-icon' />

        </div>
        <div className='sidebar-channels'>
         {channels?.map(channel => {
            return (
            <div className="channel">
            <h4><span className="hash">#</span>{channel?.channel_name}</h4>
        </div>
            )
         })}   


       </div>
       </div>
    )
    
    

  return (
    <div className="sidebar">
        <div className='sidebar-top'>
            <h3>{server?.server_name || "DIRECT MESSAGES" }</h3>
            <ExpandMoreIcon onClick={handleDelete} />
        </div>

        
            {content}

        

        <div className='sidebar-profile'>
                <Avatar src={DefaultAvatar} />
                <div className='sidebar-profile-info'>
                    <h4>{sessionUser?.username}</h4>
                    <p>#12394</p>
                    </div>

                    <div>
                        <SettingsIcon />
                    </div>
               </div>

    </div>
  )
}

export default ServerInfo
