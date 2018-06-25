import React from 'react'
import PropTypes from 'prop-types'
import { Animated, Dimensions, StyleSheet } from 'react-native'
//
const { width: viewPortWidth } = Dimensions.get('window')
const NOTIFICATION_WIDTH = 0.7 * viewPortWidth

export default class FlashNotification extends React.Component {
  static propTypes = {
    length: PropTypes.number,
    permanent: PropTypes.bool.isRequired,
    location: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    onHideNotification: PropTypes.func.isRequired,
  }
  static defaultProps = {
    permanent: false,
    length: 1500,
    location: 'top',
  }
  state = {
    width: new Animated.Value(50),
    opacity: new Animated.Value(0.7),
    textOpacity: new Animated.Value(0),
  }
  componentDidMount() {
    const { width, textOpacity, opacity } = this.state
    const { permanent, length, onHideNotification } = this.props
    Animated.spring(width, { toValue: NOTIFICATION_WIDTH }).start()
    Animated.timing(textOpacity, { toValue: 1, duration: 1000 }).start()
    if (!permanent) { // if the notif is not permanent, then we animate the opacity to zero to make the notif disappear
      setTimeout(() => {
        Animated.timing(opacity, { toValue: 0, duration: 1000 })
          .start(onHideNotification) /* the arg of start() is called when the animation is finished
                                        we use the callback onHideNotification() to allow the parent to remove the FlashNotification from the view */
      }, length) // start the fade-out after 'length' millis
    }
  }
  getStyle = () => {
    /*
    animated styles:
    IMPORTANT
    this method returns an object which contains all the animted styles
    the Animated library will change the value of our state props (state.width, state.textOpacity, state,opacity)
    and it will trigger a re-render of our component which will use the new style provided by this method
    */
    const { width, opacity } = this.state
    const { location } = this.props 
    return {
      width,
      opacity,
      top: location === 'top' ? 60 : undefined,
      bottom: location === 'top' ? undefined : 60,
    }
  }
  render() {
    // IMPORTANT we need to use Animated.View, Animated.Text, ... for the animations to work properly
    const { text } = this.props
    const { textOpacity } = this.state
    return (
      <Animated.View style={[ styles.container, this.getStyle() ]}>
        <Animated.Text style={[ styles.text, { opacity: textOpacity } ]}>
          {text}
        </Animated.Text>
      </Animated.View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    borderRadius: 5,
    height: 50,
    position: 'absolute', // we need to use 'absolute' to be able to show the notif on any underlying view
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    left: (viewPortWidth - NOTIFICATION_WIDTH) / 2, // left is the absolute position were we want to paint the top left corner of the notif
  },
  text: {
    color: '#fff',
  },
})

