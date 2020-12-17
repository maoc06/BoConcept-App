import React from 'react';
import {View, Animated, StyleSheet, TouchableHighlight} from 'react-native';
import colors from '../config/colors';

function ButtonSwip({title, color = 'primary', onPress}) {
  return (
    <TouchableHighlight style={{height: '95%'}} onPress={onPress}>
      <View style={[styles.container, {backgroundColor: colors[color]}]}>
        <Animated.Text style={styles.text}>{title}</Animated.Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.whiteAccent,
    paddingHorizontal: 10,
    fontWeight: 'bold',
  },
});

export default ButtonSwip;
