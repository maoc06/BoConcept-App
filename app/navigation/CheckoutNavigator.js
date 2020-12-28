import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import CheckoutScreen from '../screens/CheckoutScreen';
import AddNewAddressScreen from '../screens/Profile/AddNewAddressScreen';
import AddNewPaymentScreen from '../screens/Profile/AddNewPaymentScreen';
import defaultStyles from '../config/styles';

const Stack = createStackNavigator();

const CheckoutNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Checkout"
      component={CheckoutScreen}
      options={{headerStyle: defaultStyles.header, headerTitleAlign: 'center'}}
    />

    <Stack.Screen
      name="AddNewAddress"
      component={AddNewAddressScreen}
      options={{
        headerStyle: defaultStyles.header,
        title: 'Add new address',
        headerTitleAlign: 'center',
      }}
    />

    <Stack.Screen
      name="AddNewPaymentMethod"
      component={AddNewPaymentScreen}
      options={{
        headerStyle: defaultStyles.header,
        title: 'Add new payment',
        headerTitleAlign: 'center',
      }}
    />
  </Stack.Navigator>
);

export default CheckoutNavigator;
