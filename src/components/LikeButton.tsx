import React from 'react';
import {View} from 'react-native';
import {increaseLike, useAppDispatch} from '../redux/store';
import {ThemeColors} from '../settings/config';
import {SingleChatMessageType} from '../settings/types';
import CustomButton from './CustomButton';

type PositionTypes = 'left' | 'right';

type LikeButtonPropTypes = {
  item: SingleChatMessageType;
  uid: string;
  disabled?: boolean;
  tc?: string; // Text Color
  position?: PositionTypes;
  value?: number;
  setValue?: Function;
};
const LikeButton = ({
  item,
  uid,
  value = 0,
  setValue,
  disabled = false,
  tc = disabled ? ThemeColors.disabled : ThemeColors.primary,
  position = 'left',
}: LikeButtonPropTypes) => {
  //const likes = item.likes.length;
  const likes = item && item?.likes ? item?.likes.length : 0;
  const dispatch = useAppDispatch();

  const increaseLikeByOne = () => {
    if (!item.likes?.includes(uid) && !disabled) {
      dispatch(increaseLike({item, uid}));
    }
  };

  return (
    <View style={{position: 'absolute', bottom: -15, [position]: 10}}>
      <CustomButton
        leftIcon={'thumbs-up-outline'}
        title={'' + likes}
        w={'auto'}
        bgc={'#fff'}
        tc={tc}
        ts={12}
        leftIconSize={10}
        m={0}
        p={2}
        onPressFn={increaseLikeByOne}
      />
    </View>
  );
};

export default LikeButton;
