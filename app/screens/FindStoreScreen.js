import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';

import Screen from '../components/Screen';
import SearchBar from '../components/forms/SearchBar';
import Map from '../components/maps/Map';
import ActivityIndicator from '../components/ActivityIndicator';
import useApi from '../hooks/useApi.js';
import storeApi from '../api/store';
import colors from '../config/colors';

function FindStoreScreen() {
  const getStoresApi = useApi(storeApi.getStores);
  const [searchQuery, setSearchQuery] = useState();

  useEffect(() => {
    getStoresApi.request();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <>
      <ActivityIndicator visible={getStoresApi.loading} />

      <Screen style={styles.containerScreen}>
        <SearchBar
          placeholder="Find the Nearest Store"
          onChangeText={handleSearch}
          value={searchQuery}
        />
      </Screen>

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
  containerScreen: {
    maxHeight: 200,
  },
});

export default FindStoreScreen;
