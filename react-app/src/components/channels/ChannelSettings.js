import React, {useState} from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { useLocation, useHistory } from 'react-router-dom'
import { updateChannel, deleteChannel } from '../../store/server'

function ChannelSettings({onClose}) {
  const url = useLocation().pathname
  const history = useHistory()
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const channelId = url.split("/")[3]
  const serverId = url.split("/")[2]
  const server = useSelector(state => state.servers[serverId])
  const sessionUser = useSelector(state => state.session.user)
  const channel = server?.channels.filter(channel => channel.id == channelId)[0]
  const [channelName, setChannelName] = useState(channel?.channel_name);

  const handleDelete = () => {
    const data = dispatch(deleteChannel(channelId))
    onClose()
  }

  const updateChannelName = async () => {

    if(channelName == "") {
      setErrors(['Channel Name is required']) 
      return
    }

    
    let payload = {
      channelName, 
      channelId,
      serverId
  }


  let data = await dispatch(updateChannel(payload))
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
      <h4><span className="hash">#</span>{channel?.channel_name} </h4> 
      <div className=''>Overview</div>
      <div className='settings-bottom-border'></div>
      <div onClick={handleDelete} className='settings-delete'>Delete Channel <i className="fa-solid fa-trash"></i></div>
      </div>
        <div className='channel-settings-edit'>
          <h3>OVERVIEW</h3>
          <form className='channel-update' onSubmit={updateChannelName}>
          {errors.length > 0 && <ul className='errors'>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>}
            <label>CHANNEL NAME</label>
            <input
             type='text'
             className='input'
             required
             maxLength="25"
             value={channelName}
             onChange={(e) => setChannelName(e.target.value)} /> 
             <button className='button'>Edit Name</button>
          </form>
        </div>
    </div>
  )
}

export default ChannelSettings
