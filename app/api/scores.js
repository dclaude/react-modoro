import { ref } from '../config/constants'

export function fetchScore (uid) {
  return ref.child(`scores/${uid}`)
    .once('value')
    .then((snapshot) => snapshot.val())
} 

export function increaseScore (uid, amount) {
  return ref.child(`scores/${uid}/score`)
    .transaction((score) => score += amount) // operator+= returns rhe incremented value. so the callback returns the incremented value
}

export function decreaseScore (uid, amount) {
  return ref.child(`scores/${uid}/score`)
    .transaction((score) => score -= amount)
} 


