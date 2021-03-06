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
import JoinServer from './JoinServer'
import ProfileSettings from '../ProfileSettings'


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
    const [showJoinServerModal, setShowJoinServerModal] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);




  return (
    <>
    <Server setShowAddModal={() => setShowCreateServerModal(true)} setShowJoinModal={() => setShowJoinServerModal(true)}/>
    <ServerInfo setShowModal={() => setShowCreateChannelModal(true)} setChannelSettingsModal={() => setShowChannelSettingsModal(true)} setShowServerSettingsModal={() => setShowServerSettingsModal(true)} showProfileSettings={() => setShowProfileModal(true)} />
    {showCreateServerModal && (
      <Modal onClose={() => setShowCreateServerModal(false)}>
          <AddServer onClose={() => setShowCreateServerModal(false)}/>
      </Modal>
  )}
    {showCreateChannelModal && (
      <Modal onClose={() => setShowCreateChannelModal(false)}>
          <AddChannel onClose={() => setShowCreateChannelModal(false)}  />
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
  {showJoinServerModal && (
      <Modal onClose={() => setShowJoinServerModal(false)}>
          <JoinServer onClose={() => setShowJoinServerModal(false)}/> 
      </Modal>
  )}

  {showProfileModal && (
    <SettingsModal onClose={() => setShowProfileModal(false)}>
    <ProfileSettings  onClose={() => setShowProfileModal(false)}/>
</SettingsModal>
  )

  }
    </>
  )
}

export default Sidebar
