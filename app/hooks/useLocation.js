import {useState} from 'react';
import * as Location from 'expo-location';
import {useEffect} from 'react';

export default useLocation = () => {
  const [location, setLocation] = useState();
  const latitudeDelta = 15.0;
  const longitudeDelta = 0.0421;

  const getLocation = async () => {
    try {
      const {granted} = await Location.requestPermissionsAsync();
      if (!granted) return;

      const {
        coords: {latitude, longitude},
      } = await Location.getCurrentPositionAsync();

      setLocation({
        latitude,
        longitude,
        latitudeDelta,
        longitudeDelta,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return location;
};
