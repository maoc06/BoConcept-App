import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import ButtonIcon from '../components/buttons/ButtonIcon';
import LogoTitleHeader from '../components/LogoTitleHeader';
import CartNavigator from './CartNavigator';
import CartBadge from '../components/CartBadge';
import ButtonFavorite from '../components/buttons/ButtonFavorite';
import routes from './routes';
import defaultStyles from '../config/styles';

const Stack = createStackNavigator();

const HomeNavigator = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        headerStyle: defaultStyles.header,
        headerTitle: (props) => <LogoTitleHeader {...props} />,
        headerLeft: () => (
          <ButtonIcon
            icon={require('../assets/menu-icon.png')}
            style={{marginLeft: 16}}
            onPress={() => navigation.openDrawer()}
          />
        ),
        headerRight: () => (
          <CartBadge onPress={() => navigation.navigate(routes.CART)} />
        ),
      }}
    />

    <Stack.Screen
      name="ProductDetail"
      component={ProductDetailScreen}
      options={({route}) => ({
        headerStyle: defaultStyles.header,
        title: '',
        headerRight: () => <ButtonFavorite proId={route.params.pro_id} />,
      })}
    />

    <Stack.Screen
      name="Cart"
      component={CartNavigator}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

export default HomeNavigator;
