import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import defaultStyle from '../../config/styles';

function TextCategory({children, active, onPress, ...otherProps}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text
        style={[
          styles.category,
          active ? styles.activeText : styles.inactiveText,
        ]}
        {...otherProps}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  category: {
    fontSize: 16,
    fontWeight: 'bold',

    marginRight: 40,
    textTransform: 'capitalize',
  },
  inactiveText: {
    color: defaultStyle.colors.medium,
  },
  activeText: {
    color: defaultStyle.colors.primary,
    borderBottomWidth: 2,
    borderBottomColor: defaultStyle.colors.primary,
  },
});

export default TextCategory;
