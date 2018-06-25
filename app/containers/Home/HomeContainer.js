import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Home } from '../../components'
import { connect } from 'react-redux'
import { incrementAndHandleScore, decrementAndHandleScore } from '../../redux/modules/scores'

function secondsToHMS (secs) {
  const hours = Math.floor(secs / 3600)
  const mins = Math.floor(secs % 3600 / 60)
  const seconds = Math.floor(secs % 3600 % 60)
  return ((hours > 0 ? hours + ":" + (mins < 10 ? "0" : "") : "") + mins + ":" + (seconds < 10 ? "0" : "") + seconds)
}

class HomeContainer extends Component {
  static propTypes = {
    timerDuration: PropTypes.number.isRequired,
    restDuration: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired,
    openDrawer: PropTypes.func, // only for android
    navigator: PropTypes.object.isRequired,
  }
  state = {
    timer: this.props.timerDuration,
    rest: this.props.restDuration,
    activeCountdown: 'timer', // either 'timer' or 'rest'
    countdownRunning: false,
  }
  static getDerivedStateFromProps(props, prevState) {
    // we update our local state when the redux store changes (and so our props changes)
    const state = {}
    if (props.timerDuration !== prevState.timer) {
      state.timer = props.timerDuration
    }
    if (props.restDuration !== prevState.rest) {
      state.rest = props.restDuration
    }
    return state
  }
  handleToggleCountdown = () => {
    const { countdownRunning } = this.state
    const { dispatch } = this.props
    if (countdownRunning) { // if we pressed the pause button
      this.setState({ countdownRunning: false })
      dispatch(decrementAndHandleScore(5))
      return window.clearInterval(this.interval)
    }
    //
    // if we pressed the play button:
    this.setState({
      countdownRunning: true,
    })
    this.interval = setInterval(() => {
      const { activeCountdown } = this.state
      const { timerDuration, restDuration, dispatch } = this.props
      const nextSecond = this.state[activeCountdown] - 1 // on recupere la value de this.state.timer ou this.state.rest et on retranche 1
      if (nextSecond === 0) {
        this.setState({
          [activeCountdown]: activeCountdown === 'timer' ? timerDuration : restDuration, // reset the current timer to its initial value
          activeCountdown: activeCountdown === 'timer' ? 'rest' : 'timer', // change the active timer
        })
        dispatch(incrementAndHandleScore(5))
      }
      else {
        this.setState({
          [activeCountdown]: nextSecond,
        })
      }
      //
      if (nextSecond % 60 === 0) {
        dispatch(incrementAndHandleScore(1))
      }
    }, 1000)
  }
  handleReset = () => {
    const { timerDuration, restDuration, dispatch } = this.props
    window.clearInterval(this.interval)
    this.setState({
      timer: timerDuration,
      rest: restDuration,
      activeCountdown: 'timer',
      countdownRunning: false,
    })
    dispatch(decrementAndHandleScore(5))
  }
  handleSkipRest = () => {
    const { restDuration } = this.props
    this.setState({
      rest: restDuration,
      activeCountdown: 'timer',
    })
  }
  handleToSettings = () => {
    const { navigator } = this.props
    // the object provided as arg to navigator.push() will be the 'route' object received in Navigator.renderScene()
    navigator.push({
      settings: true,
    })
  }
  getProgress = () => {
    const { activeCountdown, timer, rest } = this.state
    const { timerDuration, restDuration } = this.props
    return activeCountdown === 'timer'
      ? 1 - (timer / timerDuration)
      : 1 - (rest / restDuration)
  }
  render () {
    const { openDrawer, score } = this.props
    const { timer, rest, activeCountdown, countdownRunning } = this.state
    return (
      <Home
        countdownRunning={countdownRunning}
        timer={secondsToHMS(timer)}
        score={score}
        rest={secondsToHMS(rest)}
        activeCountdown={activeCountdown}
        onReset={this.handleReset}
        onSkipRest={this.handleSkipRest}
        progress={this.getProgress()}
        onToggleCountdown={this.handleToggleCountdown}
        handleToSettings={this.handleToSettings}
        openDrawer={openDrawer}
      />
    )
  }
}

function mapStateToProps({ settings, scores, authentication }) {
  return {
    timerDuration: settings.timerDuration * 60,
    restDuration: settings.restDuration * 60,
    score: scores.usersScores[authentication.authedId],
  }
}

export default connect(mapStateToProps)(HomeContainer) 

