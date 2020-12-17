import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import ButtonIcon from '../components/ButtonIcon';
import LogoTitleHeader from '../components/LogoTitleHeader';
import CartNavigator from './CartNavigator';
import routes from './routes';

const Stack = createStackNavigator();

const HomeNavigator = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        headerTitle: (props) => <LogoTitleHeader {...props} />,
        headerLeft: () => (
          <ButtonIcon
            icon={require('../assets/menu-icon.png')}
            style={{marginLeft: 16}}
            onPress={() => navigation.openDrawer()}
          />
        ),
        headerRight: () => (
          <ButtonIcon
            icon={require('../assets/cart-icon.png')}
            style={{marginRight: 16}}
            onPress={() => navigation.navigate(routes.CART)}
          />
        ),
      }}
    />
    <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
    <Stack.Screen
      name="Cart"
      component={CartNavigator}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

export default HomeNavigator;
