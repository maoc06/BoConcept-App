import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AppLoading} from 'expo';

import fetchFonts from './app/config/fonts';
import AuthContext from './app/auth/context';
import CartContextProvider from './app/contexts/cartContext';
import authStorage from './app/auth/storage';
import AuthNavigator from './app/navigation/AuthNavigator';
import AppNavigator from './app/navigation/AppNavigator';
import navigationTheme from './app/navigation/navigationTheme';

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
        <NavigationContainer theme={navigationTheme}>
          {user ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      </CartContextProvider>
    </AuthContext.Provider>
  );
}
