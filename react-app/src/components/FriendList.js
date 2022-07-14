import React from 'react'
import {useSelector} from 'react-redux'
import AddIcon from '@material-ui/icons/Add'
import { Link , useHistory} from 'react-router-dom'


function FriendList() {
    const users = useSelector(state => state.users?.users)
    const history = useHistory();

    if (!users) return null

    const showChat = (user) => {
      history.push(`/channels/@me/${user.id}`)
    }


  return (
    <div className="sidebar-channel-block">
    <div className='sidebar-channel-header'>                
    <div className='channel-header'>
        {/* <ExpandMoreIcon /> */}
    </div>

    </div>
    <div className='sidebar-channels'>
     {users?.map(user => {
        return (
        <div className="friend-list" onClick={() => showChat(user)}>
        <div className='friend-icon'>
        <span><i className="fa-brands fa-discord"></i></span>
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
