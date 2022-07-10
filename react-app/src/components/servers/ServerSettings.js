import React, {useState} from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { useLocation, useHistory } from 'react-router-dom'
import {deleteServer, updateServer} from '../../store/server'

function ServerSettings({onClose}) {
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const url = useLocation().pathname
  const serverId = url.split("/")[2]
  const sessionUser = useSelector(state => state.session.user)
  const server = useSelector(state => state.servers[serverId])


  const handleDelete = () => {
    const data = dispatch(deleteServer(serverId))
    history.push("/channels/@me")
  }

  const updateServerName = async (serverName) => {

    let payload = {
      serverName, 
      adminId: sessionUser.id, 
      serverId
  }


  let createdServer = await dispatch(updateServer(payload)).catch(async (res) => {
    const data = await res.json();
    if (data && data.errors) setErrors(data.errors);
  });

  if (createdServer) {
    history.push(`/channels/${createdServer.id}/${createdServer.id}`)
  }

  }

  return (
    <div className='channel-settings'>
      <div className='close-channel'>
      <span onClick={() => onClose()}><i className="fa-solid fa-x "></i></span>
      </div>
      <div className='channel-settings-nav'>
      <h4><span className="hash">#</span>{server?.server_name} </h4> 
      <div className=''>Overview</div>
      <div className='settings-bottom-border'></div>
      <div onClick={handleDelete} className='settings-delete'>Delete Server <i className="fa-solid fa-trash"></i></div>
      </div>
        <div className='channel-settings-edit'>
          <h3>OVERVIEW</h3>
          <form className='channel-update'>
            <label>SERVER NAME</label>
            <input
             type='text'
             className='input'
             value={server?.server_name}
             onChange={(e) => updateServerName(e.target.value)} /> 
            
          </form>
        </div>
    </div>
  )
}

export default ServerSettings
