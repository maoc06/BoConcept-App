import React from 'react';
import {View, StyleSheet} from 'react-native';

import Text from './Text';
import Button from './Button';
import colors from '../config/colors';

function ButtonQuantity({quantity}) {
  return (
    <View style={styles.container}>
      <Text style={styles.quantity}>-</Text>
      <Text style={styles.quantity}>{quantity}</Text>
      <Text style={styles.quantity}>+</Text>
      {/* <Button title="-" backgroundColor="whiteAccent" textColor="primary" /> */}
      {/* <Button title="+" backgroundColor="whiteAccent" textColor="primary" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.whiteAccent,
    paddingHorizontal: 12,
    marginLeft: 20,
    maxHeight: 20,
  },
  quantity: {
    alignSelf: 'center',
  },
});

export default ButtonQuantity;
