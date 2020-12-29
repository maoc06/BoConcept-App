import React from 'react';
import {StyleSheet} from 'react-native';
import {BlurView} from 'expo-blur';
import openMap from 'react-native-open-maps';

import Text from '../texts/Text';
import Button from '../buttons/Button';
import colors from '../../config/colors';

function CustomCallout({marker}) {
  if (!marker) {
    return null;
  }

  const {title, description, latitude, longitude} = marker;

  const goToStore = () => {
    openMap({latitude, longitude, end: title});
  };

  return (
    <BlurView intensity={250} style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text>{description}</Text>
      <Button title="Get directions" onPress={goToStore} />
    </BlurView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    width: '90%',
    height: 125,
    padding: 15,
    overflow: 'hidden',
  },
  title: {
    fontWeight: 'bold',
  },
});

export default CustomCallout;
