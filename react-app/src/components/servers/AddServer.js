import React, {useState} from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux'
import {createServer} from '../../store/server'


function AddServer({onClose}) {
    const history = useHistory();
    const [serverName, setServerName] = useState("");
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const sessionUser = useSelector(state => state.session.user)
    


    const handleSubmit = async (e) => {
        e.preventDefault();

        let payload = {
            serverName, 
            adminId: sessionUser.id
        }
    
        let data = await dispatch(createServer(payload))
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
      <header className='create-channel'>Create Server</header>
        <form className='create-form' onSubmit={handleSubmit}>
        {errors.length > 0 && <ul className='errors'>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>}
        <input
        type="text"
        placeholder="Server Name"
        required
        maxLength="25"
        className='input'
        value={serverName}
        onChange={(e) => setServerName(e.target.value)} />
        <div className='cancel-submit'>
          <button type='button' className='button' onClick={handleCancel}>Cancel</button>
        <button className='button' type="submit">Create Server</button>
        </div>
        </form>
    </div>
  )
}

export default AddServer
