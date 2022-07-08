import React from 'react'
import {useSelector} from 'react-redux'
import AddIcon from '@material-ui/icons/Add'
import { Link } from 'react-router-dom'


function FriendList() {
    const users = useSelector(state => state.users?.users)

    if (!users) return null


  return (
    <div className="sidebar-channel-block">
    <div className='sidebar-channel-header'>                
    <div className='channel-header'>
        {/* <ExpandMoreIcon /> */}
    </div>
    <AddIcon className='sidebar-add-icon' />

    </div>
    <div className='sidebar-channels'>
     {users?.map(user => {
        return (
        <div className="friend-list">
                <div className='friend-icon'>
          <Link to=''>
        <span><i className="fa-brands fa-discord"></i></span>
        </Link>
        </div>
        <h4>{user.username}</h4>
    </div>
        )
     })}   


   </div>
   </div>
  )
}

export default FriendList
