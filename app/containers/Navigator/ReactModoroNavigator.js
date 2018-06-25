import React from 'react'
import { Platform } from 'react-native'
import PropTypes from 'prop-types'
import { Navigator } from 'react-native-deprecated-custom-components'
import { SplashContainer, FooterTabsContainer, SettingsContainer } from '../../containers'

export default class ReactModoroNavigator extends React.Component {
  static propTypes = {
    isAuthed: PropTypes.bool.isRequired,
  }
  renderScene = (route, navigator) => {
    const { isAuthed } = this.props
    console.log(`ReactModoroNavigator.renderScene() isAuthed: ${isAuthed}`)
    if (isAuthed === false) {
      return <SplashContainer navigator={navigator} />
    }
    else if (route.settings === true) {
      return <SettingsContainer navigator={navigator} />
    }
    return <FooterTabsContainer navigator={navigator} />
  }
  configureScene = (route) => {
    if (Platform.OS === 'android') {
      return Navigator.SceneConfigs.FloatFromBottomAndroid // sous android on veut tjrs que la 'route transition' soit un fade-in
    }
    //
    // sous iOS on veut des transitions differentes selon la route:
    if (route.settings === true) {
      return Navigator.SceneConfigs.FloatFromBottom // route transition: from bottom to top
    }
    return Navigator.SceneConfigs.FloatFromRight // par defaut sous iOS la 'route transition' se fait de la droite vers la gauche
  }
  render () {
    return (
      <Navigator
        initialRoute={{}}
        renderScene={this.renderScene}
        configureScene={this.configureScene} />
    )
  }
}

