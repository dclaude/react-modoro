import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import { Splash } from '../../components'
import { connect } from 'react-redux'
import { handleAuthWithFirebase } from '../../redux/modules/authentication'

class SplashContainer extends Component {
  handleLoginFinished = (error, result) => {
    console.log(`SplashContainer.handleLoginFinished() error: ${error} isCancelled: ${result.isCancelled}`)
    if (error) {
      console.warn('Error in handleLoginFinished: ', error)
    } else if (result.isCancelled === true) {
      console.log('Auth cancelled')
    } else {
      this.props.dispatch(handleAuthWithFirebase())
    }
  }
  render () {
    return (
      <Splash onLoginFinished={this.handleLoginFinished} />
    )
  }
}

// connect to have 'dispatch' in our props
export default connect()(SplashContainer)

