import React from 'react';
import {View, StyleSheet} from 'react-native';

import colors from '../../config/colors';

function Pagination({index, list}) {
  return (
    <View style={styles.pagination} pointerEvents="none">
      {list.map((_, i) => {
        return (
          <View
            key={i}
            style={[
              styles.paginationDot,
              index === i
                ? styles.paginationDotActive
                : styles.paginationDotInactive,
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  pagination: {
    position: 'absolute',
    bottom: 8,
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 2,
  },
  paginationDotActive: {
    backgroundColor: colors.primary,
  },
  paginationDotInactive: {
    backgroundColor: colors.medium,
  },
});

export default Pagination;
