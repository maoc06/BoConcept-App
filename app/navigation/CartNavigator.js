import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import LogoTitleHeader from '../components/LogoTitleHeader';
import ButtonIcon from '../components/buttons/ButtonIcon';
import CartScreen from '../screens/CartScreen';
import CheckoutNavigator from './CheckoutNavigator';
import CartBadge from '../components/CartBadge';
import routes from './routes';
import defaultStyles from '../config/styles';

const Stack = createStackNavigator();

const CartNavigator = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Cart"
      component={CartScreen}
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
      name="Checkout"
      component={CheckoutNavigator}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

export default CartNavigator;
