import {DefaultTheme} from '@react-navigation/native';
import colors from '../config/colors';

export default {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    background: colors.light,
    card: colors.light,
  },
};
