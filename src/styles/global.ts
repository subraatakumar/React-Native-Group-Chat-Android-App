import {StyleSheet} from 'react-native';
import {ThemeColors} from '../settings/config';

export const globalStyle = StyleSheet.create({
  headerTitle: {
    color: ThemeColors.text,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  headerTitleContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
