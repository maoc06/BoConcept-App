import React from 'react';
import {Image, StyleSheet} from 'react-native';

function LogoTitleHeader() {
  return (
    <Image
      style={styles.logo}
      source={require('../assets/simple-logo-black.png')}
    />
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});

export default LogoTitleHeader;
