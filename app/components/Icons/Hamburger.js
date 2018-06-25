import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { colors } from '../../styles'

Hamburger.propTypes = {
  size: PropTypes.number.isRequired,
  style: PropTypes.object, // optional
  onPress: PropTypes.func.isRequired,
}

Hamburger.defaultProps = {
  size: 30,
}

export default function Hamburger({ size, style, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={style}
    >
      <Icon
        name='ios-menu-outline'
        size={size}
        color={colors.blue}
      />
    </TouchableOpacity>
  )
}
