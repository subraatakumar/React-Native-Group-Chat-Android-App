import {
  View,
  Text,
  TouchableOpacity,
  ViewPagerAndroidOnPageScrollEventData,
} from 'react-native';
import React from 'react';
import Ionicon from 'react-native-vector-icons/Ionicons';

type customButtonProps = {
  title?: string | null;
  type?: string;
  onPressFn: any;
  style?: any;
  m?: number | null;
  ml?: number | null;
  mr?: number | null;
  mt?: number | null;
  mb?: number | null;
  p?: number | null;
  pl?: number | null;
  pr?: number | null;
  pt?: number | null;
  pb?: number | null;
  bc?: string; // Border color
  tc?: string; // Text Color
  ts?: number | null; // Title Text Size
  bgc?: string; // background color
  br?: number; // border radius
  w?: number | string; // width
  h?: number | null; // height
  sc?: string; // shadow color
  disabled?: boolean;
  leftIcon?: string | null; // Ionicon Image on left
  rightIcon?: string | null;
  leftIconSize?: number | null;
  rightIconSize?: number | null;
  textStyle?: any;
};

const CustomButton = ({
  title = null,
  type,
  bc,
  onPressFn,
  style,
  bgc = 'rgba(6,146,239,1)',
  br = 30,
  w = title ? 250 : 40,
  h = null,
  sc = 'rgba(6,146,239,1)',
  tc = '#fff',
  ts = null, // Title Size
  m = null,
  ml = 0,
  mr = 0,
  mt = 0,
  mb = 0,
  p = h ? h / 5 : 10,
  pl = null,
  pr = null,
  pt = null,
  pb = null,
  disabled = false,
  leftIcon = null,
  rightIcon = null,
  leftIconSize = 20,
  rightIconSize = 20,
  textStyle = {},
}: customButtonProps) => {
  //console.log(disabled, leftIcon);
  const innerContent = () => {
    return (
      <View
        style={{
          width: w,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        {leftIcon ? (
          <Ionicon
            name={leftIcon}
            size={leftIconSize}
            color={tc}
            style={{marginLeft: p ? p : pl, marginRight: 3}}
          />
        ) : (
          <View></View>
        )}
        {title && (
          <Text
            style={{
              color: tc,
              fontSize: ts,
              textAlign: 'center',
              width: 'auto',
              ...textStyle,
            }}>
            {title}
          </Text>
        )}
        {rightIcon ? (
          <Ionicon
            name={rightIcon}
            size={rightIconSize}
            color={tc}
            style={{marginRight: p ? p : pr, marginLeft: p ? p : pl}}
          />
        ) : (
          <View
            style={{marginRight: p ? p : pr, marginLeft: p ? p : pl}}></View>
        )}
      </View>
    );
  };
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={disabled ? () => {} : onPressFn}
      style={{
        backgroundColor: disabled ? 'rgba(20,20,20,0.3)' : bgc,
        paddingLeft: p ? p : pr,
        paddingRight: p ? p : pl,
        paddingTop: p ? p : pt,
        paddingBottom: p ? p : pb,
        borderRadius: br,
        alignItems: 'center',
        shadowColor: sc,
        elevation: 8,
        shadowRadius: 8,
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 1.0,
        width: w,
        height: h,
        margin: m,
        ...style,
      }}>
      {innerContent()}
    </TouchableOpacity>
  );
};

export default CustomButton;
