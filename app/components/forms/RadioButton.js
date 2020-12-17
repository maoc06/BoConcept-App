import React from 'react';
import {View, StyleSheet} from 'react-native';
import {RadioButton} from 'react-native-paper';

import Text from '../Text';
import colors from '../../config/colors';

function AppRadioButton({children, value, currValue, setValue}) {
  return (
    <View style={styles.innerContainer}>
      <RadioButton
        value={value}
        status={currValue === value ? 'checked' : 'unchecked'}
        onPress={setValue}
        uncheckedColor={colors.primary}
        color={colors.primary}
      />
      <Text>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15,
  },
});

export default AppRadioButton;
