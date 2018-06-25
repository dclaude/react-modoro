import { getAccessToken, authWithToken, updateUser, logout } from '../../api/auth'
import { fetchSettings } from '../../api/settings'
import { addSettingsTimerDuration, addSettingsRestDuration } from './settings'
import { fetchAndHandleScore } from './scores'

const AUTHENTICATING = 'AUTHENTICATING'
const NOT_AUTHED = 'NOT_AUTHED'
const IS_AUTHED = 'IS_AUTHED'
export const LOGGING_OUT = 'LOGGING_OUT'

function authenticating () {
  console.log('authenticating()')
  return {
    type: AUTHENTICATING,
  }
}

function notAuthed () {
  console.log('notAuthed()')
  return {
    type: NOT_AUTHED,
  }
}

function isAuthed (uid) {
  console.log(`isAuthed() uid: ${uid}`)
  return {
    type: IS_AUTHED,
    uid,
  }
}

function loggingOut () {
  return {
    type: LOGGING_OUT
  }
}

export function handleAuthWithFirebase () {
  return function (dispatch, getState) {
    // on appelle le action creator authenticating() pour passer notre redux store en state 'we are authenticating'
    dispatch(authenticating())
    //
    // on recupere le token qui est le resultat de notre facebook login button
    return getAccessToken()
      .then(({accessToken}) => authWithToken(accessToken)) // puis on se connecte a firebase
      .catch((error) => console.warn('Error in handleAuthWithFirebase: ', error))
  }
}

export function onAuthChange (user) {
  console.log(`onAuthChange() user ${JSON.stringify(user, 0, 2)}`)
  // the use of redux-tunk is not mandatory here
  return function (dispatch) {
    if (!user) {
      dispatch(notAuthed())
    } else {
      const { uid, displayName, photoURL } = user
      updateUser({
        uid,
        displayName,
        photoURL,
      })
      .then(() => fetchSettings(uid) /* fetch initial data from firebase DB */)
      .then((settings) => Promise.all([
        // if fetch is successful then update our redux store accordingly
        dispatch(addSettingsTimerDuration(settings.timerDuration)),
        dispatch(addSettingsRestDuration(settings.restDuration)),
        dispatch(fetchAndHandleScore(uid))
      ]))
      .then(() => dispatch(isAuthed(uid)))
    }
  }
}

export function handleUnauth () {
  return function (dispatch) {
    logout()
    dispatch(loggingOut())
  }
}

const initialState = {
  isAuthed: false,
  isAuthenticating: true,
  authedId: '',
}

export default function authentication(state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATING :
      return {
        ...state,
        isAuthenticating: true,
      }
    case NOT_AUTHED :
      return {
        isAuthenticating: false,
        isAuthed: false,
        authedId: '',
      }
    case IS_AUTHED :
      return {
        isAuthed: true,
        isAuthenticating: false,
        authedId: action.uid,
      }
    default :
      return state
  }
}

