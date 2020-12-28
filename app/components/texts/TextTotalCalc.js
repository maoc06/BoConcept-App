import React from 'react';
import {StyleSheet, View} from 'react-native';

import Text from './Text';
import colors from '../../config/colors';

function TextTotalCalc({
  title,
  calc,
  bigNumber = false,
  showDisclaimer = false,
  disclaimerMessage,
  style,
}) {
  return (
    <View style={[styles.subtotalContainer, style]}>
      <Text>{title}</Text>

      <View>
        <Text style={[styles.subtotal, {fontSize: bigNumber ? 24 : 16}]}>
          {calc}
        </Text>

        {showDisclaimer && (
          <Text style={styles.disclaimer}>{disclaimerMessage}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  subtotalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginBottom: 40,
  },
  subtotal: {
    fontWeight: 'bold',
    textAlign: 'right',
  },
  disclaimer: {
    fontSize: 12,
    color: colors.medium,
    textAlign: 'right',
  },
});

export default TextTotalCalc;
