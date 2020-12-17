import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import LogoTitleHeader from '../components/LogoTitleHeader';
import ButtonIcon from '../components/ButtonIcon';
import CartScreen from '../screens/CartScreen';
import ChechkoutScreen from '../screens/CheckoutScreen';

const Stack = createStackNavigator();

const CartNavigator = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Cart"
      component={CartScreen}
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
            onPress={() => {}}
          />
        ),
      }}
    />
    <Stack.Screen
      name="Checkout"
      component={ChechkoutScreen}
      options={{headerTitleAlign: 'center'}}
    />
  </Stack.Navigator>
);

export default CartNavigator;
