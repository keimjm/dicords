const GET_SERVERS = 'server/GET_SERVERS'
const CURRENT_SERVER = 'server/CURRENT_SERVER'


const retrieveAction = (servers) => ({
  type: GET_SERVERS,
  servers
});

const current = (server) => ({
  type: CURRENT_SERVER,
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



export default function serverReducer(state = {}, action) {
    switch (action.type) {
      case GET_SERVERS:
        const servers = action.servers
        return {...state, ...servers}
      case CURRENT_SERVER:
        return { ...state, ["current"] : action.server}
      default:
        return state;
    }

  }
