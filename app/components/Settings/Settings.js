import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { ReactModoroNavbar, Close } from '../../components'
import { colors, fontSizes } from '../../styles'
import Slider from 'react-native-slider'

Settings.propTypes = {
  timerDuration: PropTypes.number.isRequired,
  restDuration: PropTypes.number.isRequired,
  onBack: PropTypes.func.isRequired,
  onTimerChange: PropTypes.func.isRequired,
  onRestChange: PropTypes.func.isRequired,
  onRestComplete: PropTypes.func.isRequired,
  onTimerComplete: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
}

export default function Settings({ timerDuration, restDuration, onBack, onTimerChange, onRestChange, onRestComplete, onTimerComplete, onLogout }) {
  return (
    <View style={styles.container}>
      <ReactModoroNavbar
        title='Settings'
        leftButton={<Close onPress={onBack} />}
      />
      <View style={styles.sliderContainer}>
        <Text style={styles.titleText}>Timer Duration</Text>
        <Text style={styles.valueText}>{timerDuration}</Text>
        <Text style={styles.minutes}>{timerDuration === 1 ? 'Minute' : 'Minutes'}</Text>
        <Slider
          minimumValue={1}
          maximumValue={60}
          onSlidingComplete={onTimerComplete}
          thumbTintColor={colors.border}
          step={1}
          minimumTrackTintColor={colors.blue}
          value={timerDuration}
          onValueChange={onTimerChange} />
      </View>
      <View style={styles.sliderContainer}>
        <Text style={styles.titleText}>Rest Duration</Text>
        <Text style={styles.valueText}>{restDuration}</Text>
        <Text style={styles.minutes}>{restDuration === 1 ? 'Minute' : 'Minutes'}</Text>
        <Slider
          minimumValue={1}
          maximumValue={60}
          onSlidingComplete={onRestComplete}
          thumbTintColor={colors.border}
          step={1}
          minimumTrackTintColor={colors.blue}
          value={restDuration}
          onValueChange={onRestChange} />
      </View>
      <TouchableOpacity onPress={onLogout} style={styles.logout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  sliderContainer: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 20,
    color: colors.primary,
    textAlign: 'center',
  },
  valueText: {
    fontSize: 50,
    color: colors.blue,
    textAlign: 'center',
    padding: 15,
  },
  minutes: {
    color: colors.secondary,
    textAlign: 'center',
  },
  logout: {
    backgroundColor: colors.blue,
    alignItems: 'stretch',
    borderRadius: 25,
    margin: 25,
    padding: 10,
  },
  logoutText: {
    color: colors.white,
    fontSize: fontSizes.secondary,
    textAlign: 'center',
  },
})

