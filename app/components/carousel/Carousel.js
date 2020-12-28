import React, {useCallback, useState, useRef} from 'react';
import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import Pagination from './Pagination';

import Slide from './Slide';

const {width: windowWidth} = Dimensions.get('window');

function Carousel({list}) {
  const [index, setIndex] = useState(0);
  const indexRef = useRef(index);
  indexRef.current = index;

  const onScroll = useCallback((event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);

    const distance = Math.abs(roundIndex - index);

    // Prevent one pixel triggering setIndex in the middle
    // of the transition. With this we have to scroll a bit
    // more to trigger the index change.
    const isNoMansLand = 0.4 < distance;

    if (roundIndex !== indexRef.current && !isNoMansLand) {
      setIndex(roundIndex);
    }
  }, []);

  const flatListOptimizationProps = {
    initialNumToRender: 0,
    maxToRenderPerBatch: 1,
    removeClippedSubviews: true,
    scrollEventThrottle: 16,
    windowSize: 2,
    keyExtractor: useCallback((item) => String(item.product_image_id), []),
    getItemLayout: useCallback(
      (_, index) => ({
        index,
        length: windowWidth - 32,
        offset: index * (windowWidth - 32),
      }),
      []
    ),
  };

  const renderItem = useCallback(function renderItem({item}) {
    return <Slide data={item} />;
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={list}
        style={styles.carousel}
        renderItem={renderItem}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onScroll={onScroll}
        {...flatListOptimizationProps}
      />

      <Pagination list={list} index={index} />
    </View>
  );
}

const styles = StyleSheet.create({
  carousel: {
    marginBottom: 25,
  },
  container: {
    position: 'relative',
  },
});

export default Carousel;
