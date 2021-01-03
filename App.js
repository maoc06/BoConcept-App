import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AppLoading} from 'expo';

import fetchFonts from './app/config/fonts';
import AuthContext from './app/contexts/authContext';
import CartContextProvider from './app/contexts/cartContext';
import AddressContextProvider from './app/contexts/addressContext';
import PaymentContextProvider from './app/contexts/paymentContext';
import authStorage from './app/auth/storage';
import AuthNavigator from './app/navigation/AuthNavigator';
import AppNavigator from './app/navigation/AppNavigator';
import navigationTheme from './app/navigation/navigationTheme';
import OfflineNotice from './app/components/OfflineNotice';

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [user, setUser] = useState();

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
  };

  const onInit = () => {
    fetchFonts();
    restoreUser();
  };

  if (!dataLoaded) {
    return (
      <AppLoading startAsync={onInit} onFinish={() => setDataLoaded(true)} />
    );
  }
  return (
    <AuthContext.Provider value={{user, setUser}}>
      <CartContextProvider>
        <AddressContextProvider>
          <PaymentContextProvider>
            <OfflineNotice />
            <NavigationContainer theme={navigationTheme}>
              {user ? <AppNavigator /> : <AuthNavigator />}
            </NavigationContainer>
          </PaymentContextProvider>
        </AddressContextProvider>
      </CartContextProvider>
    </AuthContext.Provider>
  );
}
