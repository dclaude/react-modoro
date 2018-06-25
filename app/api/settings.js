import { ref } from '../config/constants'

export function setTimer (duration, uid) {
  // dans firebase, dans `settings/${uid}/timerDuration`, on sette la value 'duration'
  return ref.child(`settings/${uid}/timerDuration`)
    .set(duration)
}

export function setRest (duration, uid) {
  return ref.child(`settings/${uid}/restDuration`)
    .set(duration)
}

export function fetchSettings (uid) {
  return ref.child(`settings/${uid}`)
    .once('value')
    .then((snapshot) => {
      const timerDuration = 20
      const restDuration = 5

      const settings = snapshot.val()

      if (settings === null) {
        return {
          timerDuration,
          restDuration
        }
      } else if (!settings.timerDuration) {
        // on a une restDuration dans la DB, mais on n'a pas de timerDuration (le user n'a modifie qu'un seul des sliders)
        return {
          timerDuration,
          restDuration: settings.restDuration,
        }
      } else if (!settings.restDuration) {
        return {
          restDuration,
          timerDuration: settings.timerDuration,
        }
      } else {
        return settings
      }
    })
} 

