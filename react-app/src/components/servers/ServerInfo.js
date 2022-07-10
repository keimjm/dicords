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


function ServerInfo({setShowModal, setChannelSettingsModal, setShowServerSettingsModal}) {
    const history = useHistory();
    const dispatch = useDispatch();
    const url = useLocation().pathname
    const serverId = url.split("/")[2]
    const sessionUser = useSelector(state => state.session.user)
    const server = useSelector(state => state.servers[serverId])
    let content = null
    let home = serverId === '@me' || false

    const changeChannel = (channel) => {
        history.push(`/channels/${serverId}/${channel.id}`)
    }
    
    
    const channels = server?.channels

    if (home) content =  (<FriendList />)
    else content =  (
        <div className="sidebar-channel-block">
        <div className='sidebar-channel-header'>                
        <div className='channel-header'>
            {/* <ExpandMoreIcon /> */}
        <h4>TEXT CHANNELS</h4>
        </div>
        <AddIcon className='sidebar-add-icon' onClick={() => setShowModal()} />

        </div>
        <div className='sidebar-channels'>
            <ul>
         {channels?.map(channel => {
            return (
            <li className="channel">
                <div className="channel-name" onClick={() => changeChannel(channel)}>
            <h4><span className="hash">#</span>{channel?.channel_name} </h4> 
            </div>
            <div className='channel-settings-icon'><SettingsIcon onClick={() => setChannelSettingsModal()}  /></div>
        </li>
            )
         })} 
         </ul>  


       </div>
       </div>
    )
    
    

  return (
    <div className="sidebar">
        <div className='sidebar-top'>
            <h3>{server?.server_name || "DIRECT MESSAGES" }</h3>

            {home || <SettingsIcon  onClick={() => setShowServerSettingsModal()}  />}
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
