import React from 'react'
import {useSelector} from 'react-redux'
import AddIcon from '@material-ui/icons/Add'
import { Link , useHistory} from 'react-router-dom'


function FriendList() {
    const users = useSelector(state => state.users?.users)
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user)

    if (!users) return null

    const showChat = (id) => {
      history.push(`/channels/@me/${id}`)
    }


  return (
    <div className="sidebar-channel-block">
    <div className='sidebar-channel-header'>                
    <div className='channel-header'>
        {/* <ExpandMoreIcon /> */}
    </div>

    </div>
    <div className='sidebar-channels'>
    <div className="friend-list" onClick={() => showChat("bot")}>
        <div className='friend-icon'>
        <span><i className="fa-brands fa-discord"></i></span>
        </div>
        <h4>chatbot</h4>
    </div>
     {users?.map(user => {
      if (user.id == 6 || user.id == sessionUser.id) return null
       return (
        <div className="friend-list" onClick={() => showChat(user.id)}>
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
