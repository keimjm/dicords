import React from 'react'

function SettingsModal({children, }) {

  return (
    <div id="setting-modal-background"  >
        <div id="setting-modal-content">
            {children}
    </div>
    </div>
    );
}

export default SettingsModal
