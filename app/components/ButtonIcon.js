import React from 'react';
import {Image, TouchableOpacity, StyleSheet} from 'react-native';

function ButtonIcon({icon, onPress, style}) {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Image style={styles.icon} source={icon} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 30,
    height: 30,
    overflow: 'hidden',
  },
  icon: {
    width: '100%',
    height: '100%',
  },
});

export default ButtonIcon;
