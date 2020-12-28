import React from 'react';
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {Image} from 'react-native-expo-image-cache';

import Text from '../texts/Text';
import colors from '../../config/colors';
import {currencyFormat} from '../../utility/currency';

function Card({title, subtitle, imageUrl, showDetails = true, onPress}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} uri={imageUrl} />
        </View>

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
    // borderWidth: 1,
    // borderColor: colors.redAccent,
  },
  detailsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    paddingLeft: 10,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    padding: 5,
    backgroundColor: colors.whiteAccent,
  },
  title: {
    color: colors.dark,
    textTransform: 'capitalize',
  },
  subtitle: {
    color: colors.medium,
  },
  image: {
    aspectRatio: 1.7,
  },
});

export default Card;
