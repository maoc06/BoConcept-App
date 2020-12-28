import React from 'react';
import {StyleSheet, View} from 'react-native';

import {RadioButton} from '../forms';
import Text from '../texts/Text';
import colors from '../../config/colors';

function SelectAddress({name, address, zipCode, value, setValue, currValue}) {
  return (
    <View style={styles.container}>
      <View>
        <RadioButton value={value} currValue={currValue} setValue={setValue} />
      </View>

      <View>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.text}>
          {address} - {zipCode}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.whiteAccent,
  },
  title: {
    fontWeight: 'bold',
  },
  text: {
    color: colors.medium,
  },
});

export default SelectAddress;
