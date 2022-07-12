import React, {useState} from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux'
import {createChannel} from '../../store/server'



function AddChannel() {
    const history = useHistory();
    const [channelName, setChannelName] = useState("");
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const sessionUser = useSelector(state => state.session.user)
    const url = useLocation().pathname
    const serverId = url.split("/")[2]


    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = [];
    
        // if (serverName.length < 3 || serverName.length > 255) {
        //   errors.push('Title length must be at least 3 and less than 255');
        // }

    
        // if (errors.length) {
        //   setErrors([...errors]);
        //   return;
        // }

        let payload = {
            channelName, 
            serverId 
        }
    
        let createdChannel = await dispatch(createChannel(payload)).catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    
        if (createdChannel) {
          history.push(`/channels/${serverId}/${createdChannel.id}`)
        }
    }

  return (
    <div className='create-block'>
      <header className='create-channel'>Create Text Channel</header>
        <form className='create-form' onSubmit={handleSubmit}>
        {errors.length > 0 && <ul className='errors'>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>}
        <input
        type="text"
        placeholder="Channel Name"
        required
        className='input'
        value={channelName}
        onChange={(e) => setChannelName(e.target.value)} />
        <div className='cancel-submit'>
          <button>Cancel</button>
          <button className='button' type="submit">Add Channel</button>

        </div>
        </form>
    </div>
  )
}

export default AddChannel
