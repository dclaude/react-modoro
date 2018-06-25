import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { colors, fontSizes } from '../../styles'

SkipRest.propTypes = {
  onSkipRest: PropTypes.func.isRequired,
}

export default function SkipRest (props) {
  return (
    <TouchableOpacity onPress={props.onSkipRest}>
      <Text style={styles.skipText}>Skip Rest</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  skipText: {
    color: colors.white,
    fontSize: fontSizes.primary,
    textAlign: 'center',
  }
})

