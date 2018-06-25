import React from 'react'
import PropTypes from 'prop-types'
import { Settings } from '../../components'
import { handleUnauth } from '../../redux/modules/authentication'
import { showFlashNotification } from '../../redux/modules/flashNotification'
import { handleAndUpdateTimer, handleAndUpdateRest } from '../../redux/modules/settings'
import { connect } from 'react-redux'

class SettingsContainer extends React.Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    timerDuration: PropTypes.number.isRequired,
    restDuration: PropTypes.number.isRequired,
  }
  //
  state = {
    /*
    the 2 properties below are not the source of truth (it is the settings() reducer)
    but the state below are needed because it does not make sense to dispatch an action to redux 
    each time the value changes during the slider move
    */
    timerDuration: this.props.timerDuration,
    restDuration: this.props.restDuration,
  }
  handleTimerChange = (timerDuration) => {
    this.setState({ timerDuration })
  }
  handleRestChange = (restDuration) => {
    this.setState({ restDuration })
  }
  handleTimerComplete = () => {
    const { dispatch } = this.props
    const { timerDuration } = this.state
    dispatch(handleAndUpdateTimer(timerDuration))
      .then(() => dispatch(showFlashNotification({ text: 'Timer Duration Saved!' })))
      .catch(() => dispatch(showFlashNotification({ text: 'Error during Timer Duration Save' })))
  }
  handleRestComplete = () => {
    const { dispatch } = this.props
    const { restDuration } = this.state
    dispatch(handleAndUpdateRest(restDuration))
      .then(() => dispatch(showFlashNotification({ text: 'Rest Duration Saved!' })))
      .catch(() => dispatch(showFlashNotification({ text: 'Error during Rest Duration Save' })))
  }
  handleLogout = () => {
    this.props.dispatch(handleUnauth())
  }
  render() {
    const { navigator } = this.props
    const { timerDuration, restDuration } = this.state
    return (
      <Settings
        onBack={navigator.pop}
        onLogout={this.handleLogout}
        onRestComplete={this.handleRestComplete}
        onTimerComplete={this.handleTimerComplete}
        onTimerChange={this.handleTimerChange}
        onRestChange={this.handleRestChange}
        timerDuration={timerDuration}
        restDuration={restDuration}
      />
    )
  }
}

function mapStateToProps({ settings }) {
  const { timerDuration, restDuration } = settings
  return {
    timerDuration,
    restDuration,
  }
}

export default connect(mapStateToProps)(SettingsContainer)

