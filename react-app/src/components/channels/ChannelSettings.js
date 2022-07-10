import React from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { useLocation, useHistory } from 'react-router-dom'
import { updateChannel, deleteChannel } from '../../store/server'

function ChannelSettings({onClose}) {
  const url = useLocation().pathname
  const history = useHistory()
  const dispatch = useDispatch();
  const channelId = url.split("/")[3]
  const serverId = url.split("/")[2]
  const server = useSelector(state => state.servers[serverId])
  const sessionUser = useSelector(state => state.session.user)
  const channel = server?.channels.filter(channel => channel.id == channelId)[0]

  const handleDelete = () => {
    const data = dispatch(deleteChannel(channelId))
    onClose()
  }

  const updateChannelName = async (channelName) => {
  
    
    let payload = {
      channelName, 
      channelId,
      serverId
  }


  let updatedChannel = await dispatch(updateChannel(payload)).catch(async (res) => {
    const data = await res.json();
    if (data && data.errors) ;
  });

  if (updatedChannel) {
    history.push(`/channels/${serverId}/${updatedChannel.id}`)
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
          <form className='channel-update'>
            <label>CHANNEL NAME</label>
            <input
             type='text'
             className='input'
             value={channel?.channel_name}
             onChange={(e) => updateChannelName(e.target.value)} /> 
            
          </form>
        </div>
    </div>
  )
}

export default ChannelSettings
