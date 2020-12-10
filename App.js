import {AppLoading} from 'expo';
import React, {useState} from 'react';
import fetchFonts from './app/config/fonts';
import FirstScreen from './app/screens/FirstScreen';

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
      />
    );
  }
  return <FirstScreen />;
}
