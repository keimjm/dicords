import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Modal, SettingsModal } from '../../context/Modal'
import ServerInfo from './ServerInfo'
import Server from './Server'
import AddServer from './AddServer'
import AddChannel from '../channels/AddChannel'
import ChannelSettings from '../channels/ChannelSettings'
import ServerSettings from './ServerSettings'


function Sidebar() {
    // const {serverId} = useParams()
    // //const current = useSelector(state => state.servers)["current"]
    // const sessionUser = useSelector(state => state.session.user)
    // const server = useSelector(state => state.servers[1])
    
    // const channels = server?.channels  

    const [showCreateServerModal, setShowCreateServerModal] = useState(false);
    const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);
    const [showChannelSettingsModal, setShowChannelSettingsModal] = useState(false);
    const [showServerSettingsModal, setShowServerSettingsModal] = useState(false);




  return (
    <>
    <Server setShowModal={() => setShowCreateServerModal(true)} />
    <ServerInfo setShowModal={() => setShowCreateChannelModal(true)} setChannelSettingsModal={() => setShowChannelSettingsModal(true)} setShowServerSettingsModal={() => setShowServerSettingsModal(true)} />
    {showCreateServerModal && (
      <Modal onClose={() => setShowCreateServerModal(false)}>
          <h4>Create a new Server</h4>
          <AddServer  />
      </Modal>
  )}
    {showCreateChannelModal && (
      <Modal onClose={() => setShowCreateChannelModal(false)}>
          <h4>Add a new Channel</h4>
          <AddChannel  />
      </Modal>
  )}
    {showChannelSettingsModal && (
      <SettingsModal onClose={() => setShowChannelSettingsModal(false)}>
          <ChannelSettings  onClose={() => setShowChannelSettingsModal(false)}/>
      </SettingsModal>
  )}

{showServerSettingsModal && (
      <SettingsModal onClose={() => setShowServerSettingsModal(false)}>
          <ServerSettings  onClose={() => setShowServerSettingsModal(false)}/>
      </SettingsModal>
  )}
    </>
  )
}

export default Sidebar
