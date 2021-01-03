import React from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';

import defaultStyle from '../../config/styles';
import colors from '../../config/colors';

function AppTextInput({width = '100%', error, color, ...otherProps}) {
  return (
    <View style={[styles.container, {width}]}>
      <TextInput
        mode="flat"
        underlineColor={defaultStyle.colors[color]}
        placeholderTextColor={defaultStyle.colors.whiteAccent}
        theme={{
          colors: {
            primary: colors[color],
            placeholder: colors[color],
            text: colors[color],
            error: colors.primary,
          },
        }}
        error={error}
        style={[styles.text, {width}]}
        {...otherProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 10,
    borderWidth: 0,
  },
  text: {
    fontSize: 16,
    backgroundColor: 'transparent',
  },
});

export default AppTextInput;
