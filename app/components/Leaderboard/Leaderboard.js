import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Text, Platform, ActivityIndicator } from 'react-native'
import { ReactModoroNavbar, Hamburger } from '../../components'
import { colors } from '../../styles'
import Leader from './Leader'

Leaderboard.propTypes = {
  listenerSet: PropTypes.bool.isRequired,
  leaders: PropTypes.array.isRequired,
  openDrawer: PropTypes.func, // only for android
}

export default function Leaderboard({ openDrawer, listenerSet, leaders }) {
  return (
    <View style={styles.container}>
      <ReactModoroNavbar
        title='Leaderboard'
        leftButton={Platform.OS === 'android'
            ? <Hamburger onPress={openDrawer} />
            : null}
      />
      {listenerSet === true
        ? leaders.map(leader => (
          <Leader
            key={leader.displayName}
            name={leader.displayName}
            avatar={leader.photoURL}
            score={leader.score}
          />
        ))
        : <ActivityIndicator
            size='small'
            style={styles.activityIndicator}
            color={colors.secondary}
          />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    marginBottom: 50, // for the last <Leader> of the screen to not overlap the <FooterTabs> on iOS
  },
  activityIndicator: {
    marginTop: 30,
  },
})

