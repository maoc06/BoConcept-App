import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

import defaultStyle from '../../config/styles';

function Button({
  title,
  onPress,
  backgroundColor = 'primary',
  textColor = 'secondary',
  marginVertical = 10,
  alignText = 'center',
}) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {backgroundColor: defaultStyle.colors[backgroundColor]},
        {marginVertical: marginVertical},
      ]}
      onPress={onPress}>
      <Text
        style={[
          styles.text,
          {color: defaultStyle.colors[textColor]},
          {alignSelf: alignText},
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    // width: '100%',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Button;
