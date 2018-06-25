import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Text } from 'react-native'
import { colors } from '../../styles'

Close.propTypes = {
  styles: PropTypes.object, // optional
  onPress: PropTypes.func.isRequired,
}

export default function Close({ onPress, style }) {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Text style={{ color: colors.blue }}>Close</Text>
    </TouchableOpacity>
  )
}

