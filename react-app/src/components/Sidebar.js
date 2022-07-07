import React from 'react'

import Channels from './channels/Channels'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import AddIcon from '@material-ui/icons/Add'
import SettingsIcon from '@material-ui/icons/Settings'
import {Avatar} from '@material-ui/core'
import DefaultAvatar from '../Discord-Logo-White.svg'
import '../display.css'
import { useSelector } from 'react-redux'

function Sidebar({channels}) {

    const current = useSelector(state => state.servers)["current"]
    const sessionUser = useSelector(state => state.session)
    

  return (
    <div className="sidebar">
        <div className='sidebar-top'>
            <h3>{current?.server_name || "DIRECT MESSAGES" }</h3>
            <ExpandMoreIcon />
        </div>

        <div className="sidebar-channel-block">
            <div className='sidebar-channel-header'>
                <div className='channel-header'>
                    <ExpandMoreIcon />
                <h4>TEXT CHANNELS</h4>
                </div>
                <AddIcon className='sidebar-add-icon' />

                </div>
                <div className='sidebar-channels'>
                    <Channels />
                    <Channels />
                    <Channels />

               </div>

        </div>

        <div className='sidebar-profile'>
                <Avatar src={DefaultAvatar} />
                <div className='sidebar-profile-info'>
                    <h3>{sessionUser?.username}</h3>
                    <p>#12394</p>
                    </div>

                    <div>
                        <SettingsIcon />
                    </div>
               </div>

    </div>
  )
}

export default Sidebar
