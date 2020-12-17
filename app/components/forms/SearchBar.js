import React from 'react';
import {StyleSheet} from 'react-native';
import {Searchbar} from 'react-native-paper';
import colors from '../../config/colors';

function SearchBar({width, onChangeText, value, ...otherProps}) {
  return (
    <Searchbar
      onChangeText={onChangeText}
      value={value}
      style={styles.container}
      theme={{
        colors: {
          primary: colors.primary,
          placeholder: colors.medium,
          text: colors.primary,
        },
      }}
      {...otherProps}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.whiteAccent,
  },
});

export default SearchBar;
