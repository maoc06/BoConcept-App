import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';

import Text from './Text';
import colors from '../config/colors';

function SectionTitleEdit({title, style, onPress}) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.edit}>Edit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  edit: {
    color: colors.medium,
  },
});

export default SectionTitleEdit;
