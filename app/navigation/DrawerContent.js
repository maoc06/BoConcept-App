import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Drawer, Avatar} from 'react-native-paper';
import {DrawerItem, DrawerContentScrollView} from '@react-navigation/drawer';

import Text from '../components/texts/Text';
import colors from '../config/colors';
import useAuth from '../hooks/useAuth';
import routes from './routes';

function DrawerContent(props) {
  const {user, logOut} = useAuth();

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <Avatar.Image
              source={{
                uri:
                  'https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
              }}
              size={75}
              style={styles.avatar}
            />

            <Text style={styles.title}>
              {user.info.firstName} {user.info.lastName}
            </Text>

            <Text style={styles.subtitle}>{user.info.email}</Text>
          </View>

          <Drawer.Section>
            <DrawerItem
              label="Home"
              labelStyle={styles.label}
              onPress={() => props.navigation.navigate(routes.HOME)}
            />

            <DrawerItem
              label="Explore"
              labelStyle={styles.label}
              onPress={() => props.navigation.navigate(routes.EXPLORE)}
            />

            <DrawerItem
              label="Favorites"
              labelStyle={styles.label}
              onPress={() => props.navigation.navigate(routes.FAVORITES)}
            />

            <DrawerItem
              label="Find store"
              labelStyle={styles.label}
              onPress={() => props.navigation.navigate(routes.FIND_STORE)}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>

      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          label="Log out"
          labelStyle={styles.label}
          onPress={() => logOut()}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.secondary,
  },
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
    marginBottom: '30%',
  },
  bottomDrawerSection: {
    marginBottom: '15%',
  },
  title: {
    color: colors.secondary,
    fontWeight: 'bold',
  },
  subtitle: {
    color: colors.secondary,
    fontSize: 12,
  },
  avatar: {
    marginBottom: 10,
  },
});

export default DrawerContent;
