import firebase from 'firebase'

firebase.initializeApp({
  apiKey: "AIzaSyCNZs6TJBl4K8cOGtQ25cBXDAhEaZZwzFM",
  authDomain: "tyler-react-modoro.firebaseapp.com",
  databaseURL: "https://tyler-react-modoro.firebaseio.com",
  projectId: "tyler-react-modoro",
  storageBucket: "tyler-react-modoro.appspot.com",
  messagingSenderId: "495623891599"
})

// pour faire un logout de firebase:
//firebase.auth().signOut()

const ref = firebase.database().ref()
const firebaseAuth = firebase.auth()
const facebookProvider = firebase.auth.FacebookAuthProvider

export {
  ref,
  firebaseAuth,
  facebookProvider,
}

