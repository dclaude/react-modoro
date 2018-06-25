import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { ReactModoroNavigator } from '../../containers'
import { PreSplash, FlashNotification } from '../../components'
import { connect } from 'react-redux'
import { firebaseAuth } from '../../config/constants'
import { onAuthChange } from '../../redux/modules/authentication'
import { hideFlashNotification } from '../../redux/modules/flashNotification'

class AppContainer extends Component {
  static propTypes = {
    isAuthenticating: PropTypes.bool.isRequired,
    isAuthed: PropTypes.bool.isRequired,
    flashNotificationIsPermanent: PropTypes.bool.isRequired,
    flashNotificationLocation: PropTypes.string.isRequired,
    flashNotificationText: PropTypes.string.isRequired,
    showFlashNotification: PropTypes.bool.isRequired,
  }
  //
  componentDidMount () {
    console.log('AppContainer.componentDidMount')
    firebaseAuth.onAuthStateChanged((user) => {
      console.log(`firebaseAuth.onAuthStateChanged ${user}`)
      this.props.dispatch(onAuthChange(user))
    })
  }
  handleHideNotification = () => {
    const { dispatch } = this.props
    dispatch(hideFlashNotification())
  }
  render () {
    const { isAuthenticating, isAuthed, showFlashNotification, flashNotificationIsPermanent, flashNotificationLocation, flashNotificationText } = this.props
    console.log(`AppContainer.render() isAuthenticating: ${isAuthenticating}`)
    return (
      <View style={{ flex: 1 }}>
        {isAuthenticating
          ? <PreSplash />
          : <ReactModoroNavigator isAuthed={isAuthed} />}
        {showFlashNotification
            ? <FlashNotification
              permanent={flashNotificationIsPermanent}
              location={flashNotificationLocation}
              text={flashNotificationText}
              onHideNotification={this.handleHideNotification}
            />
            : null}
      </View>
    )
  }
}

function mapStateToProps({ authentication, flashNotification }) {
  const { isAuthenticating, isAuthed } = authentication
  const { showFlashNotification, text, permanent, location } = flashNotification
  return {
    isAuthenticating,
    isAuthed,
    //
    flashNotificationIsPermanent: permanent, 
    flashNotificationLocation: location,
    flashNotificationText: text, 
    showFlashNotification, 
  }
}

export default connect(mapStateToProps)(AppContainer)

