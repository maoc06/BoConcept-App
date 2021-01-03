import React from 'react';
import LottieView from 'lottie-react-native';
import {StyleSheet, View} from 'react-native';

import Screen from '../components/Screen';
import Text from '../components/texts/Text';
import Button from '../components/buttons/Button';
import routes from '../navigation/routes';
import colors from '../config/colors';

function ExploreScreen({navigation}) {
  return (
    <Screen>
      <View style={styles.overlay}>
        <LottieView
          autoPlay
          loop
          source={require('../assets/animations/construction.json')}
        />
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Under construction</Text>

        <Text style={styles.subtitle}>
          We are working hard to give you a better experience.
        </Text>

        <Button
          title="Go home"
          onPress={() => navigation.navigate(routes.HOME)}
          marginVertical={50}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: '-15%',
    backgroundColor: colors.secondary,
    height: '100%',
    width: '100%',
    zIndex: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
  },
  container: {
    position: 'absolute',
    top: '50%',
  },
});

export default ExploreScreen;
