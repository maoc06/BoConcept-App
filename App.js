import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AppLoading} from 'expo';

import fetchFonts from './app/config/fonts';
import AuthNavigator from './app/navigation/AuthNavigator';
import AuthContext from './app/auth/context';
import HomeScreen from './app/screens/HomeScreen';
import authStorage from './app/auth/storage';

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
      <NavigationContainer>
        {user ? <HomeScreen /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
