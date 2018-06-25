import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { colors } from '../../styles'

Gear.propTypes = {
  size: PropTypes.number.isRequired,
  style: PropTypes.object, // optional
  onPress: PropTypes.func.isRequired,
}

Gear.defaultProps = {
  size: 30,
}

export default function Gear({ onPress, style, size }) {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Icon
        name='ios-settings-outline'
        size={size}
        color={colors.blue}
      />
    </TouchableOpacity>
  )
}

