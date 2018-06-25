import { fetchScore, increaseScore, decreaseScore } from '../../api/scores'
import { fetchUser } from '../../api/users'
import { addUser, addMultipleUsers } from './users'
import { ref } from '../../config/constants'
import { showFlashNotification } from './flashNotification'

const FETCHING_SCORE = 'FETCHING_SCORE'
const FETCHING_SCORE_SUCCESS = 'FETCHING_SCORE_SUCCESS'
const UPDATE_LEADERBOARD = 'UPDATE_LEADERBOARD'
const ADD_LISTENER = 'ADD_LISTENER'
const ADD_SCORES = 'ADD_SCORES'
const INCREMENT_SCORE = 'INCREMENT_SCORE'
const DECREMENT_SCORE = 'DECREMENT_SCORE'

function updateLeaderboard (uids) {
  return {
    type: UPDATE_LEADERBOARD,
    uids,
  }
}

function addScores (scores) {
  return {
    type: ADD_SCORES,
    scores,
  }
}

function addListener () {
  return {
    type: ADD_LISTENER,
  }
}

// to begin the fetching of the score of the authed user
function fetchingScore() {
  return {
    type: FETCHING_SCORE,
  }
}

// to end the fetching of the score of the authed user
function fetchingScoreSuccess(uid, score) {
  return {
    type: FETCHING_SCORE_SUCCESS,
    uid,
    score,
  }
}

function incrementScore (uid, amount) {
  return {
    type: INCREMENT_SCORE,
    uid,
    amount,
  }
}

function decrementScore (uid, amount) {
  return {
    type: DECREMENT_SCORE,
    uid,
    amount,
  }
}

export function fetchAndHandleScore(uid) {
  return (dispatch, getState) => {
    console.log(`fetchAndHandleScore ${uid}`)
    dispatch(fetchingScore()) // start the fetching
    return fetchScore(uid)
      .then((scoreInfo) => { // scoreInfo contains both the 'score' of the user and the user info (displayName, ...)
        dispatch(
          fetchingScoreSuccess(
            uid,
            // if there is no score in firebase DB use a score of zero:
            !scoreInfo || !scoreInfo.score ? 0 : scoreInfo.score
          )
        )
        //
        // add the user to our redux store
        if (scoreInfo) { // if there is a score for this user in firebase DB
          // since the '/scores' end-point of our firebase DB also contain users info, we use then to populate the users() reducer
          return dispatch(addUser(uid, {
            uid,
            displayName: scoreInfo.displayName,
            photoURL: scoreInfo.photoURL,
          }))
        } else {
          // otherwise fetch the user from the '/users' end-point of our firebase DB
          return fetchUser(uid).then((user) => dispatch(addUser(uid, user)))
        }
      })
  }
}

export function fetchAndSetScoresListener() {
  return function (dispatch) {
    let listenerSet = false // create a variable outside the on() scope, to keep its value from call to call of on()
    /*
    - firebase once()
    jusqu'a present on a utilise la methode once() de firebase qui permet de faire un fetch unique
    - firebase.on()
    ici on utilise la methode on() de firebase qui permet de mettre en place un listener sur la DB
    - listener trigger
    TRES IMPORTANT
    la callback passee en 2eme arg de on() va etre appelee a chaque fois que le /scores end-point est modified
    - orderByChild() permet de sorter tous les children du end-point /scores par leur property 'score'
    (chaque child a une property 'score', elle va etre utilisee pour sorter tous les children)
    - limitToLast() pour recuperer seulement les 15 derniers children de /scores
    comme on vient de sorter ce sera les 15 children avec les plus grands scores
    - Rq:
    meme si on a fait un orderByChild() ensuite firebase va nous donner un JS object dans 'snapshot'
    et ce JS object va avoir pour keys des uids
    donc les props de cet object ne sont pas sorted par score
    donc on doit qd meme fiare un Array.sort() pour que notre array 'leaderboardUids' soit sorter par 'score'
    */
    ref.child('scores')
      .orderByChild('score')
      .limitToLast(15)
      .on('value', (snapshot) => {
        const scores = snapshot.val() || {} // use an empty object if there is no 'score object' in our DB
        // create the leaderboardUids array to store in our redux state
        const leaderboardUids = Object.keys(scores)
          .sort((a,b) => scores[b].score - scores[a].score) // sort
          .filter((uid) => !!scores[uid].score || scores[uid].score > 0) // filter scores equal to zero
        // build 2 objects 'justScores' and 'users' to be stored in our redux store
        const { justScores, users } = leaderboardUids.reduce((prev, uid) => {
          prev.justScores[uid] = scores[uid].score
          prev.users[uid] = {
            displayName: scores[uid].displayName,
            photoURL: scores[uid].photoURL,
            uid: scores[uid].uid,
          }
          return prev
        }, {justScores: {}, users: {}})
        //
        dispatch(updateLeaderboard(leaderboardUids))
        dispatch(addScores(justScores))
        dispatch(addMultipleUsers(users))
        //
        if (listenerSet === false) {
          dispatch(addListener())
          listenerSet = true // this variable lives in a outer scope of on(), so next time on() will be called 'listenerSet' will be equal to true
        }
      })
  }
}

export function incrementAndHandleScore (amount) {
  return function (dispatch, getState) {
    const { authedId } = getState().authentication
    dispatch(incrementScore(authedId, amount)) // optimistically update redux
    increaseScore(authedId, amount) // call firebase update api
      .catch(() => { // 
        dispatch(decrementScore(authedId, amount)) // rollback redux in case of firebase error
        dispatch(showFlashNotification({text: 'Error updating your state'}))
      })
  }
}

export function decrementAndHandleScore (amount) {
  return function (dispatch, getState) {
    const { authedId } = getState().authentication
    dispatch(decrementScore(authedId, amount))
    decreaseScore(authedId, amount)
      .catch(() => {
        dispatch(incrementScore(authedId, amount))
        dispatch(showFlashNotification({text: 'Error updating your state'}))
      })
  }
}

/*
helper function to ease the implementation of the scores() reducer below
'state' is actually the state.userScores of the actual reducer
state.userScores is a dico JS objet (uid => score)
*/
function usersScores(state = {}, action) {
  switch (action.type) {
    case FETCHING_SCORE_SUCCESS:
      return {
        ...state,
        [action.uid]: action.score,
      }
    case ADD_SCORES :
      return {
        ...state,
        ...action.scores, // action.scores est un JS dico (uid => score)
      }
    case INCREMENT_SCORE :
      return {
        ...state,
        [action.uid]: state[action.uid] + action.amount,
      }
    case DECREMENT_SCORE :
      return {
        ...state,
        [action.uid]: state[action.uid] - action.amount,
      }
    default :
      return state
  }
}

const initialState = {
  isFetching: true,
  listenerSet: false,
  leaderboardUids: [],
  userScores: {},
}

export default function scores(state = initialState, action) {
  switch (action.type) {
    case FETCHING_SCORE :
      return {
        ...state,
        isFetching: true,
      }
    case FETCHING_SCORE_SUCCESS :
      return {
        ...state,
        isFetching: false,
        // 'usersScores' is a JS dico ('user uid' => 'user score')
        usersScores: usersScores(state.usersScores, action)
      }
    case UPDATE_LEADERBOARD :
      return {
        ...state,
        leaderboardUids: action.uids,
      }
    case ADD_SCORES :
    case INCREMENT_SCORE :
    case DECREMENT_SCORE :
      return {
        ...state,
        usersScores: usersScores(state.usersScores, action)
      }
    case ADD_LISTENER :
      return {
        ...state,
        listenerSet: true,
      }
    default:
      return state
  }
}

