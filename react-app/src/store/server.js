const GET_SERVERS = 'server/GET_SERVERS'
const CURRENT_SERVER = 'server/CURRENT_SERVER'
const CREATE_SERVER = 'server/CREATE_SERVER'


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

export const setCurrent = (server) => async (dispatch) => {
  dispatch(current(server))

}


export const createServer = (payload) => async (dispatch) => {

  console.log('REDUCER')

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
    if (data.errors) {
      return;
    }

    dispatch(create(data));
    return data

}

}


export default function serverReducer(state = {}, action) {
    switch (action.type) {
      case GET_SERVERS:
        const servers = action.servers
        return {...state, ...servers}
      case CREATE_SERVER:
        return {...state, [action.server.id]: action.server}
      default:
        return state;
    }

  }
