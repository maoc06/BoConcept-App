import React from 'react';
import {StyleSheet} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import colors from '../config/colors';
import DrawerContent from './DrawerContent';
import HomeNavigator from '../navigation/HomeNavigator';
import ExploreScreen from '../screens/ExploreScreen';
import FavoriteNavigator from './FavoriteNavigator';
import FindStoreScreen from '../screens/FindStoreScreen';

const Drawer = createDrawerNavigator();

const AppNavigator = () => (
  <Drawer.Navigator
    overlayColor="rgba(255, 255, 255, 0.7)"
    drawerStyle={styles.drawer}
    drawerContent={(props) => <DrawerContent {...props} />}>
    <Drawer.Screen name="Home" component={HomeNavigator} />
    <Drawer.Screen name="Explore" component={ExploreScreen} />
    <Drawer.Screen name="Favorites" component={FavoriteNavigator} />
    <Drawer.Screen name="FindStore" component={FindStoreScreen} />
  </Drawer.Navigator>
);

const styles = StyleSheet.create({
  drawer: {
    backgroundColor: colors.dark,
    width: '60%',
  },
});

export default AppNavigator;
