import React, {useState} from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux'
import {createServer} from '../../store/server'


function AddServer() {
    const history = useHistory();
    const [serverName, setServerName] = useState("");
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const sessionUser = useSelector(state => state.session.user)
    


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
            serverName, 
            adminId: sessionUser.id
        }
    
        let createdServer = await dispatch(createServer(payload)).catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    
        if (createdServer) {
          history.push(`/channels/${createdServer.id}/${createdServer.id}`)
        }
    }

  return (
    <div className='create-block'>
      <header className='create-channel'>Create Server</header>
        <form className='create-form' onSubmit={handleSubmit}>
        {errors.length > 0 && <ul className='errors'>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>}
        <input
        type="text"
        placeholder="Server Name"
        required
        className='input'
        value={serverName}
        onChange={(e) => setServerName(e.target.value)} />
        <div className='cancel-submit'>
          <button>Cancel</button>
        <button className='button' type="submit">Create Server</button>
        </div>
        </form>
    </div>
  )
}

export default AddServer
