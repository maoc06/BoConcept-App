import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

import defaultStyle from '../config/styles';

function AppTextInput({width = '100%', ...otherProps}) {
  return (
    <View style={[styles.container, {width}]}>
      <TextInput
        placeholderTextColor={defaultStyle.colors.whiteAccent}
        style={styles.text}
        {...otherProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 25,
    borderBottomWidth: 1,
    borderBottomColor: defaultStyle.colors.whiteAccent,
  },
  text: {
    color: defaultStyle.colors.whiteAccent,
    fontSize: 16,
  },
});

export default AppTextInput;
