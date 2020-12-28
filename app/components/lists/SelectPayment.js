import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Image} from 'react-native-expo-image-cache';

import {RadioButton} from '../forms';
import Text from '../texts/Text';
import colors from '../../config/colors';
import {maskCardNumber} from '../../utility/maskCardNumber';

function SelectPayment({
  cardNumber,
  expiryMonth,
  expiryYear,
  imageUrl,
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
        <Image style={styles.tinyPayLogo} uri={imageUrl} />

        <Text style={styles.title}>{maskCardNumber(cardNumber)}</Text>

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
  tinyPayLogo: {
    width: 50,
    height: 35,
  },
  title: {
    fontWeight: 'bold',
  },
  date: {
    color: colors.medium,
  },
});

export default SelectPayment;
