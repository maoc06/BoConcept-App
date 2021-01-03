import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';

import Map from '../components/maps/Map';
import ActivityIndicator from '../components/ActivityIndicator';
import useApi from '../hooks/useApi.js';
import storeApi from '../api/store';
import colors from '../config/colors';

function FindStoreScreen() {
  const getStoresApi = useApi(storeApi.getStores);

  useEffect(() => {
    getStoresApi.request();
  }, []);

  return (
    <>
      <ActivityIndicator visible={getStoresApi.loading} />

      <View style={styles.containerMap}>
        {getStoresApi.data.data !== undefined && (
          <Map markers={getStoresApi.data.data} />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  containerMap: {
    flex: 1,
    backgroundColor: colors.whiteAccent,
  },
});

export default FindStoreScreen;
