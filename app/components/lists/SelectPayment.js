import React from 'react';
import {StyleSheet, View} from 'react-native';

import {RadioButton} from '../forms';
import Text from '../Text';
import colors from '../../config/colors';

function SelectPayment({
  cardNumber,
  expiryMonth,
  expiryYear,
  value,
  setValue,
  currValue,
}) {
  return (
    <View style={styles.container}>
      <View>
        <RadioButton value={value} currValue={currValue} setValue={setValue} />
      </View>

      <View style={styles.info}>
        <Text>Image</Text>
        <Text style={styles.title}>{cardNumber}</Text>
        <Text style={styles.date}>
          {expiryMonth}/{expiryYear}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.whiteAccent,
  },
  info: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
  },
  date: {
    color: colors.medium,
  },
});

export default SelectPayment;
