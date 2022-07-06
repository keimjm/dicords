import { Link } from '@material-ui/core'
import React from 'react'

function Server() {
  return (
    <div className="server-container">
        <div className='server-button'>
          <Link to='/channels'>
        <span><i className="fa-brands fa-discord"></i></span>
        </Link>
        </div>
        <div className='bottom-border'></div>
        <div className='server-button'>AA
        
        </div>
        <div className='server-button'>BB
        
        </div>
        <div className='server-button'>CC
        
        </div>
        <div className='server-button'>DD
        
        </div>
        <div className='server-button'>EE
       
        </div>
    </div>
  )
}

export default Server
