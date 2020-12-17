import React from 'react';
import {useFormikContext} from 'formik';

import Button from '../Button';

function SubmitButton({
  title,
  backgroundColor = 'primary',
  textColor = 'secondary',
}) {
  const {handleSubmit} = useFormikContext();

  return (
    <Button
      title={title}
      onPress={handleSubmit}
      backgroundColor={backgroundColor}
      textColor={textColor}
      marginVertical={50}
    />
  );
}

export default SubmitButton;
