import React from 'react';
import {Text} from 'react-native';

import defaultStyle from '../../config/styles';

function AppTitleText({children, style, ...otherProps}) {
  return (
    <Text style={[defaultStyle.title, style]} {...otherProps}>
      {children}
    </Text>
  );
}

export default AppTitleText;
