import React from 'react';
import {View} from 'react-native';
import {ThemeColors} from '../settings/config';
import CustomButton from './CustomButton';

type PositionTypes = 'left' | 'right';

type LikeButtonPropTypes = {
  disabled?: boolean;
  tc?: string; // Text Color
  position?: PositionTypes;
  value?: number;
  setValue: Function;
};
const LikeButton = ({
  value = 0,
  setValue,
  disabled = false,
  tc = disabled ? ThemeColors.disabled : ThemeColors.primary,
  position = 'left',
}: LikeButtonPropTypes) => {
  return (
    <View style={{position: 'absolute', marginTop: 20, [position]: 10}}>
      <CustomButton
        leftIcon={'thumbs-up-outline'}
        title={'' + value}
        w={'auto'}
        bgc={'#fff'}
        tc={tc}
        ts={12}
        leftIconSize={10}
        m={0}
        p={2}
        onPressFn={setValue}
      />
    </View>
  );
};

export default LikeButton;
