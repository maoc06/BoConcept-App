import React from 'react';
import {StyleSheet} from 'react-native';

import Screen from '../components/Screen';
import Text from '../components/texts/Text';

function ExploreScreen() {
  return (
    <Screen style={styles.container}>
      <Text>Explore Screen</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ExploreScreen;
