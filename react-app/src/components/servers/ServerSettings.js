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
  const [serverName, setServerName] = useState(server?.server_name);


  const handleDelete = () => {
    const data = dispatch(deleteServer(serverId))
    onClose()
    history.push(`/channels/@me`)
  }

  const updateServerName = async () => {

    let payload = {
      serverName, 
      adminId: sessionUser.id, 
      serverId
  }


  let data = await dispatch(updateServer(payload))
  if (data) {
    setErrors(data)
  } else {
    onClose()
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
          <form className='channel-update' onSubmit={updateServerName}>
            <label>SERVER NAME</label>
            <input
             type='text'
             className='input'
             required
             value={serverName}
             onChange={(e) => setServerName(e.target.value)} /> 
          </form>
        </div>
    </div>
  )
}

export default ServerSettings
