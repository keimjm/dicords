import React, {useState} from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux'
import {createChannel} from '../../store/server'



function AddChannel({onClose}) {
    const history = useHistory();
    const [channelName, setChannelName] = useState("");
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const url = useLocation().pathname
    const serverId = url.split("/")[2]


    const handleSubmit = async (e) => {
        e.preventDefault();
  

        let payload = {
            channelName, 
            serverId 
        }
    
        let data = await dispatch(createChannel(payload))
        if (data) {
          setErrors(data)
        }
        else {
          onClose()
        }
    }

    const handleCancel = () => {
      onClose()
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
          <button type='button' className='button' onClick={handleCancel}>Cancel</button>
          <button className='button' type="submit">Add Channel</button>

        </div>
        </form>
    </div>
  )
}

export default AddChannel
