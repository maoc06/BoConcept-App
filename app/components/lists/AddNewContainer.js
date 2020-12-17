import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import Text from '../Text';
import colors from '../../config/colors';

function AddNewContainer({title, onPress}) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.whiteAccent,
  },
  text: {
    fontWeight: 'bold',
  },
});

export default AddNewContainer;
