import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';

import Text from '../texts/Text';
import colors from '../../config/colors';
import useCart from '../../hooks/useCart';

function ButtonQuantity({quantity, handleAdd, handleRemove}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleRemove}>
        <Text style={[styles.quantity, styles.controll]}>-</Text>
      </TouchableOpacity>

      <Text style={styles.quantity}>{quantity}</Text>

      <TouchableOpacity onPress={handleAdd}>
        <Text style={[styles.quantity, styles.controll]}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  controll: {
    fontSize: 20,
    textAlign: 'center',
    width: 50,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.whiteAccent,
    marginTop: 20,
    maxHeight: 30,
  },
  quantity: {
    alignSelf: 'center',
  },
});

export default ButtonQuantity;
