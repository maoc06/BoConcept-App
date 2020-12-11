import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

import defaultStyle from '../config/styles';

function Button({
  title,
  onPress,
  backgroundColor = 'primary',
  textColor = 'secondary',
}) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {backgroundColor: defaultStyle.colors[backgroundColor]},
      ]}
      onPress={onPress}>
      <Text style={[styles.text, {color: defaultStyle.colors[textColor]}]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    width: '100%',
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Button;
