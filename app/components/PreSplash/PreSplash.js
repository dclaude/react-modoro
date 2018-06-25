import React from 'react'
import { View, StyleSheet, Animated } from 'react-native'
import { colors } from '../../styles'

class PreSplash extends React.Component {
  state = {
    rotation: new Animated.Value(0)
  }
  componentDidMount () {
    this.interval = setInterval(() => {
      Animated.sequence([
        Animated.timing(this.state.rotation, { toValue: -1, duration: 150 }),
        Animated.timing(this.state.rotation, { toValue: 1, duration: 150 }),
        Animated.timing(this.state.rotation, { toValue: 0, duration: 250 })
      ]).start() // IMPORTANT: do not forget the call to start()
    }, 1000)
  }
  componentWillUnmount () {
    window.clearInterval(this.interval) // stop the animation when the component is unmounted
  }
  getTransform () {
    return {
      transform: [
        {
          rotate: this.state.rotation.interpolate({
            inputRange: [-1, 1],
            outputRange: ['-20deg', '20deg']
          })
        }
      ]
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Animated.Image
          style={[ styles.image, this.getTransform() ]}
          source={require('../../images/logo.png')}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    /*
    resizeMode scales the image by keeping the aspect ratio
    la valeur 'contain' permet de resizer la <Image> a la taille de la parent <View> ou de la dimension que l'on donne
    */
    resizeMode: 'contain',
    height: 300,
  },
})

export default PreSplash

