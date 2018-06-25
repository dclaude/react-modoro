import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Text, Platform, TouchableOpacity } from 'react-native'
import { ReactModoroNavbar, Gear, Hamburger } from '../../components'
import { colors } from '../../styles'
import Score from './Score'
import Countdown from './Countdown'
import ProgressBar from './ProgressBar'
import TimerButtons from './TimerButtons'
import SkipRest from './SkipRest'

Home.propTypes = {
  timer: PropTypes.string.isRequired,
  rest: PropTypes.string.isRequired,
  activeCountdown: PropTypes.string.isRequired,
  countdownRunning: PropTypes.bool.isRequired,
  progress: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  onToggleCountdown: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  onSkipRest: PropTypes.func.isRequired,
  openDrawer: PropTypes.func, // only for android
  handleToSettings: PropTypes.func.isRequired,
}

export default function Home (props) {
  const { timer, rest, activeCountdown, countdownRunning, progress, onToggleCountdown, onReset, onSkipRest, openDrawer, handleToSettings, score } = props
  return (
    <View style={[ styles.container, { backgroundColor: activeCountdown === 'timer' ? colors.blue : colors.red } ]}>
      <ReactModoroNavbar
        title='Home'
        leftButton={Platform.OS === 'android'
            ? <Hamburger onPress={openDrawer} />
            : null}
        rightButton={<Gear onPress={handleToSettings} />}
      />
      <Score count={score} />
      <Countdown formattedTime={props[activeCountdown]} />
      <ProgressBar style={{ marginLeft: 20, marginRight: 20 }} progress={progress} />
      <View style={styles.footer}>
        {activeCountdown === 'timer'
          ? <TimerButtons
              countdownRunning={countdownRunning}
              onToggle={onToggleCountdown}
              onReset={onReset} />
          : <SkipRest onSkipRest={onSkipRest} />}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 65,
  }
})

