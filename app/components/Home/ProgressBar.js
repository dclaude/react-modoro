import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Text } from 'react-native'

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
  incompleteBackgroundColor: PropTypes.string.isRequired,
}

ProgressBar.defaultProps = {
  style: {},
  incompleteBackgroundColor: '#fff',
}

export default function ProgressBar({ style, progress, incompleteBackgroundColor }) {
  return (
    <View style={[ styles.container, style ]}>
      <View style={{ flex: progress }}></View>
      <View style={{ flex: 1 - progress, backgroundColor: incompleteBackgroundColor }}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#4A90E2'
  }
})

