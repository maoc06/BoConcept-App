import React from 'react';
import Constants from 'expo-constants';
import {StyleSheet, View} from 'react-native';
import {useNetInfo} from '@react-native-community/netinfo';

import Text from './texts/Text';
import colors from '../config/colors';

function OfflineNotice() {
  const netInfo = useNetInfo();

  if (netInfo.type !== 'unknown' && netInfo.isInternetReachable === false)
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No Internet Connection</Text>
      </View>
    );
  return null;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.redAccent,
    height: 30,
    justifyContent: 'center',
    marginTop: Constants.statusBarHeight,
    width: '100%',
    zIndex: 999,
  },
  text: {
    color: colors.secondary,
  },
});

export default OfflineNotice;
