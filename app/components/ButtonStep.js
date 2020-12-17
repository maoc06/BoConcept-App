import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import Text from './Text';
import colors from '../config/colors';

function ButtonStep({title, currStep, buttonStep, onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text
        style={[
          styles.stepTitle,
          currStep === buttonStep ? styles.stepActive : styles.stepInactive,
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  stepTitle: {
    fontWeight: 'bold',
  },
  stepActive: {
    color: colors.primary,
  },
  stepInactive: {
    color: colors.medium,
  },
});

export default ButtonStep;
