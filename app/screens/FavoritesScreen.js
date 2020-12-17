import React from 'react';
import {StyleSheet} from 'react-native';

import Screen from '../components/Screen';
import Text from '../components/Text';

function FavoritesScreen() {
  return (
    <Screen style={styles.container}>
      <Text>Favorites Screen</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FavoritesScreen;
