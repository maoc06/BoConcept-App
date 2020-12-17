import React, {useState} from 'react';
import {useFormikContext} from 'formik';
import {View, StyleSheet} from 'react-native';
import {Checkbox} from 'react-native-paper';

import Text from '../Text';
import ErrorMessage from './ErrorMessage';
import colors from '../../config/colors';

function AppCheckBox({children, name, color = 'primary'}) {
  const [termsChecked, setTermsChecked] = useState(false);

  const {setFieldValue, errors, touched} = useFormikContext();

  const handleCheck = () => {
    const tmpTermsChecked = termsChecked;
    setTermsChecked(!tmpTermsChecked);
    setFieldValue(name, !tmpTermsChecked);
  };

  return (
    <>
      <ErrorMessage error={errors[name]} visible={touched[name]} />
      <View style={styles.innerContainer}>
        <Checkbox
          uncheckedColor={colors[color]}
          color={colors[color]}
          status={termsChecked ? 'checked' : 'unchecked'}
          onPress={handleCheck}
        />
        <Text style={[styles.text, {color: colors[color]}]}>{children}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 15,
  },
  text: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default AppCheckBox;
