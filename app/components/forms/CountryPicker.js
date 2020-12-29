import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {useFormikContext} from 'formik';
import CountryPicker from 'react-native-country-picker-modal';

import Text from '../texts/Text';
import ErrorMessage from './ErrorMessage';

function AppCountryPicker({name, ...otherProps}) {
  const [country, setCountry] = useState(null);

  const {setFieldValue, values, errors, touched} = useFormikContext();

  const handleSelect = (country) => {
    const {name: countryName} = country;
    setFieldValue(name, countryName);
    setCountry(countryName);
  };

  const handleSelectOther = () => {
    setCountry(null);
  };

  return (
    <>
      <ErrorMessage error={errors[name]} visible={touched[name]} />

      <View style={styles.container}>
        {country !== null && (
          <>
            <TouchableOpacity onPress={handleSelectOther}>
              <Text>{values[name]}</Text>
            </TouchableOpacity>
          </>
        )}

        {country === null && (
          <CountryPicker
            withFilter
            withFlag
            withAlphaFilter
            onSelect={handleSelect}
            visible={country === null}
            {...otherProps}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    height: 50,
    marginVertical: 15,
    paddingHorizontal: 16,
    borderBottomWidth: 1.17,
  },
});

export default AppCountryPicker;
