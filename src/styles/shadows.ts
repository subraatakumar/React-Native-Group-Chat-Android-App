import {Platform} from 'react-native';
import {ThemeColors} from '../settings/config';

export const shadows = Platform.select({
  ios: {
    shadowColor: ThemeColors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.7,
    shadowRadius: 3,
  },
  android: {
    elevation: 3,
  },
});
