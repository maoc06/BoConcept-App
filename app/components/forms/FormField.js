import React from 'react';
import {useFormikContext} from 'formik';

import TextInput from '../texts/TextInput';
import ErrorMessage from './ErrorMessage';
import {identifyPayment} from '../../utility/identifyPayment';

function AppFormField({
  name,
  width,
  color = 'primary',
  isCardNumber = false,
  setPaymentId,
  ...otherProps
}) {
  const {
    setFieldTouched,
    setFieldValue,
    values,
    handleChange,
    errors,
    touched,
  } = useFormikContext();

  const handleChangeCard = (value) => {
    setFieldValue(name, value);
    console.log('type', identifyPayment(value));
    setPaymentId(identifyPayment(value));
  };

  return (
    <>
      <ErrorMessage error={errors[name]} visible={touched[name]} />

      <TextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={isCardNumber ? handleChangeCard : handleChange(name)}
        value={values[name]}
        width={width}
        error={touched[name]}
        color={color}
        {...otherProps}
      />
    </>
  );
}

export default AppFormField;
