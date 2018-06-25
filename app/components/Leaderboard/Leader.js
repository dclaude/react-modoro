import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image, StyleSheet } from 'react-native'
import { colors, fontSizes } from '../../styles'

Leader.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
}

export default function Leader({ avatar, name, score }) {
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image style={styles.image} source={{ uri: avatar }} />
        <Text style={styles.nameText}>{name}</Text>
      </View>
      <Text style={styles.scoreText}>Score: {score}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    //flex: 1, // do not set 'flex: 1' otherwise one <Leader> takes the full size of the <Leaderboard>
    padding: 10,
    borderBottomWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    padding: 10,
    fontSize: fontSizes.secondary,
    color: colors.primary,
  },
  scoreText: {
    color: colors.secondary,
  },
})

