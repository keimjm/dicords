import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Modal } from '../../context/Modal'
import ServerInfo from './ServerInfo'
import Server from './Server'
import AddServer from './AddServer'

function Sidebar() {
    // const {serverId} = useParams()
    // //const current = useSelector(state => state.servers)["current"]
    // const sessionUser = useSelector(state => state.session.user)
    // const server = useSelector(state => state.servers[1])
    
    // const channels = server?.channels  

    const [showModal, setShowModal] = useState(false);

    console.log(showModal)

  return (
    <>
    <Server setShowModal={() => setShowModal(true)} />
    <ServerInfo />
    {showModal && (
      <Modal onClose={() => setShowModal(false)}>
          <h4>Create a new Server</h4>
          <AddServer  />
      </Modal>
  )}
    </>
  )
}

export default Sidebar
