import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Leaderboard } from '../../components'
import { connect } from 'react-redux'
import { fetchAndSetScoresListener } from '../../redux/modules/scores'

class LeaderboardContainer extends Component {
  static propTypes = {
    openDrawer: PropTypes.func, // only for android
    navigator: PropTypes.object.isRequired,
    listenerSet: PropTypes.bool.isRequired,
    leaders: PropTypes.array.isRequired,
  }
  componentDidMount () {
    const { listenerSet, dispatch } = this.props
    if (listenerSet === false) {
      dispatch(fetchAndSetScoresListener()) // dispatch our redux-thunk action which will setup the 'firebase listener'
    }
  }
  render () {
    const { openDrawer, listenerSet, leaders } = this.props
    return (
      <Leaderboard
        leaders={leaders}
        listenerSet={listenerSet}
        openDrawer={openDrawer}
      />
    )
  }
}

function mapStateToProps({ scores, users }) {
  return {
    listenerSet: scores.listenerSet, // if the listener is not setup yet then LeaderboardContainer will setup firebase listener
    leaders: scores.leaderboardUids.map((uid) => {
      return {
        score: scores.usersScores[uid],
        ...users[uid],
      }
    }),
  }
}

export default connect(mapStateToProps)(LeaderboardContainer)

