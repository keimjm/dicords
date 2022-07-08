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

        console.log("HANDLE SUBMIT")
    
        // if (serverName.length < 3 || serverName.length > 255) {
        //   errors.push('Title length must be at least 3 and less than 255');
        // }

        console.log(errors)
    
        // if (errors.length) {
        //   setErrors([...errors]);
        //   return;
        // }

        let payload = {
            serverName, 
            adminId: sessionUser.id
        }

        console.log(payload)
    
        let createdServer = await dispatch(createServer(payload)).catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    
        if (createdServer) {
          history.push(`/channels/@me/${createdServer.id}/${createdServer.id}`)
        }
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
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
        <button className='button' type="submit">Create Server</button>
        </form>
    </div>
  )
}

export default AddServer