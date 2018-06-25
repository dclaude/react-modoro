import React from 'react'
import PropTypes from 'prop-types'
import { Platform } from 'react-native'
import NavigationBar from 'react-native-navbar'
import { colors } from '../../styles'

ReactModoroNavbar.propTypes = {
  title: PropTypes.string.isRequired,
  rightButton: PropTypes.element,
  leftButton: PropTypes.element,
}

export default function ReactModoroNavbar({ title, rightButton, leftButton }) {
  /*
  - le props rightButton/leftButton de <NavigationBar> doivent soit etre de type 'react element' soit de type 'JS object'
  on ne peut donc pas passer 'null' si le user ne passe pas de prop:
  <NavigationBar rightButton={props.rightButton ? props.rightButton : null}
  - donc ce qu'on fait a la place c'est qu'on spread un JS object (le 'optionalAttrs' object ci-dessous)
  si cet object contient la prop 'rightButton' alors elle sera forwardee a <NavigationBar>
  sinon alors on n'aura pas de prop 'rightButton'
  */
  const optionalAttrs = {}
  if (rightButton) {
    /*
    clone the 'react element' to be able to add additional props
    (we add styling props)
    */
    const additionalProps = {
      /*
      this style property is not used by react-native-navbar 
      but it forwarded to the props of the react component associated to the rightButton
      (e.g. <Hamburger>)
      */
      style: {
        marginRight: 10,
        justifyContent: 'center',
      },
    }
    optionalAttrs.rightButton = React.cloneElement(rightButton, additionalProps)
  }
  if (leftButton) {
    const additionalProps = {
      style: {
        marginLeft: 10,
        justifyContent: 'center',
      },
    }
    optionalAttrs.leftButton = React.cloneElement(leftButton, additionalProps)
  }
  return (
    <NavigationBar
      title={{ title }}
      style={Platform.OS === 'android' ? {marginTop: 12, marginBottom: 12} : {marginTop: 12}}
      tintColor={colors.tabPrimary}
      {...optionalAttrs}
    />
  )
}


