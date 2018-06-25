// will be used to add the authed user when the app starts:
const ADD_USER = 'ADD_USER'
// will be used to fill the users we get when we fetch data from the /scores end-point of firebase:
const ADD_MULTIPLE_USERS = 'ADD_MULTIPLE_USERS'

export function addUser(uid, user) {
  return {
    type: ADD_USER,
    uid,
    user,
  }
}

export function addMultipleUsers(users) {
  return {
    type: ADD_MULTIPLE_USERS,
    users,
  }
}

export default function users(state = {}, action) {
  switch (action.type) {
    case ADD_USER: {
      return {
        ...state,
        [action.uid]: action.user,
      }
    }
    case ADD_MULTIPLE_USERS: {
      return {
        ...state,
        ...action.users, // user is a objet with keys equal to 'uid' and values equal to a 'user' object
      }
    }
    default:
      return state
  }
}

