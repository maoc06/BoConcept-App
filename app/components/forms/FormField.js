import React from 'react';
import {useFormikContext} from 'formik';

import TextInput from '../TextInput';
import ErrorMessage from './ErrorMessage';

function AppFormField({name, width, color = 'primary', ...otherProps}) {
  const {setFieldTouched, handleChange, errors, touched} = useFormikContext();

  return (
    <>
      <ErrorMessage error={errors[name]} visible={touched[name]} />
      <TextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={handleChange(name)}
        width={width}
        error={touched[name]}
        color={color}
        {...otherProps}
      />
    </>
  );
}

export default AppFormField;
