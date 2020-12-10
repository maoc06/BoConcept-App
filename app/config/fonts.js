import * as Font from 'expo-font';

const fetchFonts = () => {
  return Font.loadAsync({
    'helvetica-light': require('../assets/fonts/Helvetica-Light.ttf'),
    'helvetica-regular': require('../assets/fonts/Helvetica-Regular.ttf'),
    'helvetica-bold': require('../assets/fonts/Helvetica-Bold.ttf'),
  });
};

export default fetchFonts;
