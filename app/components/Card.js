import React from 'react';
import {View, Image, StyleSheet, TouchableWithoutFeedback} from 'react-native';

import Text from './Text';
import colors from '../config/colors';
import {currencyFormat} from '../utility/currency';

function Card({title, subtitle, showDetails = true, onPress}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <Image style={styles.image} />

        {showDetails && (
          <View style={styles.detailsContainer}>
            <Text style={styles.title}>{title}</Text>

            <Text style={styles.subtitle}>{currencyFormat(subtitle)}</Text>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 25,
    flex: 1,
    overflow: 'hidden',
  },
  detailsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    paddingLeft: 10,
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: colors.whiteAccent,
  },
  title: {
    color: colors.dark,
    textTransform: 'capitalize',
  },
  subtitle: {
    color: colors.medium,
  },
});

export default Card;
