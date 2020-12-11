import React from 'react';
import {StyleSheet} from 'react-native';

import Screen from '../components/Screen';
import Text from '../components/Text';
import Button from '../components/Button';
import useAuth from '../auth/useAuth';

function HomeScreen(props) {
  const {user, logOut} = useAuth();

  return (
    <Screen style={styles.container}>
      <Text>{user.info.email}</Text>
      <Button title="Log Out" onPress={() => logOut()} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
