import React from 'react';
import {Image, ImageBackground, View, StyleSheet} from 'react-native';

import Button from '../components/Button';

function FirstScreen(props) {
  return (
    <ImageBackground
      style={styles.background}
      source={require('../assets/background-first-screen.png')}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('../assets/logo-white.png')}
        />
      </View>

      <View style={styles.buttonsContainer}>
        <Button
          title="Sign Up with Email"
          backgroundColor="secondary"
          textColor="primary"
        />
        <Button title="Already have account" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonsContainer: {
    padding: 16,
    marginBottom: '10%',
    width: '100%',
  },
  logo: {
    width: 180,
    height: 80,
    resizeMode: 'contain',
  },
  logoContainer: {
    position: 'absolute',
    top: 150,
    alignItems: 'center',
  },
});

export default FirstScreen;
