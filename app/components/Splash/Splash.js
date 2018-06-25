import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native'
import { LoginButton } from 'react-native-fbsdk'
import { colors, fontSizes } from '../../styles'

// retrieve viewport dimensions:
const { height } = Dimensions.get('window')

Splash.propTypes = {
  onLoginFinished: PropTypes.func.isRequired,
}

export default function Splash (props) {
  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.image} source={require('../../images/logo.png')} />
        <Text style={styles.slogan}>ReactModoro</Text>
      </View>
      <View style={styles.loginContainer}>
        <LoginButton
          style={{
            height: 30,
            width: 180,
            marginBottom: 15,
          }}
          onLoginFinished={props.onLoginFinished}/>
        <Text style={styles.assuranceText}>
          Don't worry. We don't post anything to Facebook.
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // to have the same height/width as our parent HTML element
    backgroundColor: colors.white,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 40,
  },
  slogan: {
    color: colors.blue,
    fontSize: 40,
    margin: 20,
    textAlign: 'center',
  },
  image: {
    resizeMode: 'contain',
    /*
    la variable 'height' contient la height du viewport (height du device)
    on veut que notre image scale et prenne 40% de la height
    sauf si 40% de la height c'est plus que 300px dans ce cas on utilise une image de taille 300px  
    */
    height: height * .4 > 300 ? 300 : height * .4
  },
  loginContainer: {
    paddingLeft: 30,
    paddingRight: 30,
    /* 
    TRES IMPORTANT 
    en react-native touteses <View> sont automatiquement en 'display: flex' 
    donc on a juste a rajouter les justifyContent, ...
    (et le 'flex: 1' si on veut etre de la meme taille que notre parent)
    */
    alignItems: 'center',
  },
  assuranceText: {
    color: colors.secondary,
    fontSize: fontSizes.secondary,
    textAlign: 'center',
  },
})

