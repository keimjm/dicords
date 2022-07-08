const GET_USERS = 'server/GET_USERS'


const retrieveAction = (users) => ({
  type: GET_USERS,
  users
});


export const getAllUsers = () => async (dispatch) => {
  const response = await fetch('/api/users');

  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }

    dispatch(retrieveAction(data));
  }
}




export default function userReducer(state = {}, action) {
    switch (action.type) {
      case GET_USERS:
        const users = action.users
        return {...state, ...users}
      default:
        return state;
    }

  }
