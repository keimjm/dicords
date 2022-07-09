import React from 'react'

function ChannelSettings({onClose}) {

  console.log("SHOWING CHANNEL SETTING")
  return (
    <div className='channel-settings'>
      <div className='close-channel'>
      <span onClick={() => onClose()}><i className="fa-solid fa-x "></i></span>
      </div>
      <div className='channel-settings-nav'></div>
        <div className='channel-settings-edit'></div>
    </div>
  )
}

export default ChannelSettings
