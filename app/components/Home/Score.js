import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text } from 'react-native'
import { colors, fontSizes } from '../../styles'

Score.propTypes = {
  count: PropTypes.number.isRequired,
}

export default function Score (props) {
  return (
    <Text style={styles.container}>
      Score: {props.count}
    </Text>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    alignSelf: 'stretch', // the component takes the full width of its parent ...
    color: colors.white,
    fontSize: fontSizes.secondary,
    textAlign: 'right', // ... but is displayed from the right of the screen
  },
})

