import React from 'react';
import {StyleSheet} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

import CustomCallout from './Callout';
import useLocation from '../../hooks/useLocation';
import mapStyle from '../../config/mapStyle.json';
import {useState} from 'react';

function Map({markers}) {
  const location = useLocation();
  const [activeMarker, setActiveMarker] = useState(null);

  return (
    <>
      <MapView
        style={styles.map}
        initialRegion={location}
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapStyle}
        onPress={() => setActiveMarker(null)}>
        {markers.map((marker, index) => (
          <Marker
            key={index}
            title={marker.title}
            image={require('../../assets/pin.png')}
            onPress={() => setActiveMarker(marker)}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
          />
        ))}
      </MapView>

      <CustomCallout marker={activeMarker} />
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});

export default Map;
