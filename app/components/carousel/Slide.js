import React, {memo} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';

import Card from '../cards/Card';
import colors from '../../config/colors';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

const Slide = memo(function Slide({data}) {
  return (
    <View style={styles.slide}>
      <Card showDetails={false} imageUrl={data.path} />
    </View>
  );
});

const styles = StyleSheet.create({
  slide: {
    height: 200,
    // height: windowHeight,
    width: windowWidth - 32,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});

export default Slide;
