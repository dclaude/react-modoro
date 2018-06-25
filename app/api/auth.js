import { firebaseAuth, facebookProvider, ref } from '../config/constants'
import { AccessToken, LoginManager } from 'react-native-fbsdk'

export function getAccessToken () {
  return AccessToken.getCurrentAccessToken()
}

export function authWithToken (accesToken) {
  console.log('authWithToken()')
  return firebaseAuth
    .signInAndRetrieveDataWithCredential(facebookProvider.credential(accesToken))
    .then((userCredential) => {
      /*
      - signInWithCredential() returns a promise of firebase.User
      https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signInWithCredential
      the course uses this method which is deprecated
      - signInAndRetrieveDataWithCredential() returns a promise of firebase.auth.UserCredential
      which contains a user {user: nullable firebase.User, ... }
      https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signInAndRetrieveDataWithCredential
      we replace the deprecated method with this one
      and below we return the same output as the deprecated method
      */
      return userCredential.user
    })
} 

export function updateUser (user) {
  return Promise.all([
    // la methode set() va remplacer l'entry dans firebase parce qu'on passe en arg
    ref.child(`users/${user.uid}`).set(user),
    // la methode update() va merger les props de l'objet passe en arg avec les proprerties de l'entry dans la DB firebase
    ref.child(`scores/${user.uid}`).update(user)
  ])
} 

export function logout () {
  LoginManager.logOut()
  firebaseAuth.signOut()
  ref.off()
} 

