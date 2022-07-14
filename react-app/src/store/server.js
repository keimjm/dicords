const GET_SERVERS = 'server/GET_SERVERS'
const CURRENT_SERVER = 'server/CURRENT_SERVER'
const CREATE_SERVER = 'server/CREATE_SERVER'
const DELETE_SERVER = 'server/DELETE_SERVER'
const UPDATE_SERVER = 'server/UPDATE_SERVER'


const retrieveAction = (servers) => ({
  type: GET_SERVERS,
  servers
});

const current = (server) => ({
  type: CURRENT_SERVER,
  server
})

const create = (server) => ({
  type: CREATE_SERVER,
  server
})

const deleteAction = (id) => ({
  type: DELETE_SERVER, 
  id
})





export const getAllServers = () => async (dispatch) => {
  const response = await fetch('/api/servers');

  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }

    dispatch(retrieveAction(data));
  }
}


export const createServer = (payload) => async (dispatch) => {

  const {
    serverName,
    adminId
  } = payload
  
  const form = new FormData();
  form.append('server_name', serverName)
  form.append('admin_id', adminId)


  const response = await fetch('/api/servers', {
    method: "POST",
    body: form
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(create(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}


export const deleteServer = (serverId) => async (dispatch) => {
  const response = await fetch(`/api/servers/${serverId}`,{ 
    method: "DELETE"
})

if (response.ok) {
  const data = await response.json()
  if(data.errors){
    return;
  }
  if(data.Successful) dispatch(deleteAction(serverId))

  else return data
}
}


export const createChannel = (payload) => async (dispatch) => {
  const {
    channelName,
    serverId
  } = payload 

  const form = new FormData()
  form.append('channel_name', channelName)
  form.append('server_id', serverId)

  const response = await fetch(`/api/servers/${serverId}/channels`, {
    method: "POST",
    body: form
  })

  if (response.ok) {
    const data = await response.json();
    dispatch(create(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

}


export const updateServer = (payload) => async dispatch => {
  const {
    serverName,
    adminId, 
    serverId
  } = payload
  
  const form = new FormData();
  form.append('server_name', serverName)
  form.append('user_id', adminId)


  const response = await fetch(`/api/servers/${serverId}`, {
    method: "PUT",
    body: form
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(create(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

}


export const updateChannel = (payload) => async (dispatch) => {
  const {
    channelName,
    channelId,
    serverId
  } = payload 

  const form = new FormData()
  form.append('channel_name', channelName)
  form.append('server_id', serverId)
  form.append('id', channelId)


  const response = await fetch(`/api/servers/${serverId}/channels`, {
    method: "PUT",
    body: form
  })

  if (response.ok) {
    const data = await response.json();
    dispatch(create(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
  }



export const deleteChannel = (channelId) => async (dispatch) => {
  const response = await fetch(`/api/channels/${channelId}`,{ 
    method: "DELETE",
})

if (response.ok) {
  const data = await response.json();
  dispatch(create(data))
  return null;
} else if (response.status < 500) {
  const data = await response.json();
  if (data.errors) {
    return data.errors;
  }
} else {
  return ['An error occurred. Please try again.']
}

}


export const joinServer = (userId, serverId) => async (dispatch) => {

  const form = new FormData()
  form.append('user_id', userId)

  const response = await fetch(`/api/servers/${serverId}/join`, {
    method: "POST",
    body: form

  })

  if (response.ok) {
    const data = await response.json();
    dispatch(create(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
    
  }





export default function serverReducer(state = {}, action) {
    switch (action.type) {
      case GET_SERVERS:
        const servers = action.servers
        return {...state, ...servers}
      case CREATE_SERVER:
        return {...state, [action.server.id]: action.server}
      case DELETE_SERVER:
        let newState = {...state}
        delete newState[action.id]
        return newState
      default:
        return state;
    }

  }
