import React, {useState} from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { useLocation, useHistory } from 'react-router-dom'
import {deleteServer, updateServer} from '../store/server'
import {logout} from '../store/session'
import {Avatar} from '@material-ui/core'
import DefaultAvatar from '../Discord-Logo-White.svg'

function ProfileSettings({onClose}) {
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user)


  const handleLogout = () => {
    dispatch(logout())
    history.push('/')
  }



  return (
    <div className='channel-settings'>
      <div className='close-channel'>
      <span onClick={() => onClose()}><i className="fa-solid fa-x "></i></span>
      </div>
      <div className='channel-settings-nav'>
      
      <div className=''>User Settings</div>
      <div className='settings-bottom-border'></div>
      <div onClick={handleLogout} className='settings-delete'>Log Out <i className="fa-solid fa-trash"></i></div>
      </div>
        <div className='channel-settings-edit'>
          <h3>My Account</h3>
          <div className='user-brief-info'>
            <div className='user-background'></div>
            <div className='user-icon-name'>
            <div><Avatar src={DefaultAvatar} /></div>
            <div>{sessionUser?.username}#0004</div>
            </div>
            <div className='user-information'>
            <div>
                <div className='info-field'>USERNAME<div>{sessionUser?.username}</div></div>
                <div className='info-field'>EMAIL<div>{sessionUser?.email}</div></div>
            </div>
          </div>
          </div>

        </div>
    </div>
  )
}

export default ProfileSettings
