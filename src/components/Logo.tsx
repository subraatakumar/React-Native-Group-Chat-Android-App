import React from 'react';
import {View, Image, Text} from 'react-native';
import {ThemeColors} from '../settings/config';
import Logoimg from '../assets/img/logo.gif';
import {deviceHeight, deviceWidth, AppConfig} from '../settings/config';

type LogoPropTypes = {
  dW?: number | undefined;
  dH?: number | undefined;
  title?: string;
};

const Logo = ({
  dH = deviceHeight,
  dW = deviceWidth,
  title = AppConfig.title,
}: LogoPropTypes) => {
  return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <Image source={Logoimg} style={{width: dW / 3, height: dW / 4.5}} />
      <Text
        style={{
          textAlign: 'center',
          fontSize: dW / 18,
          color: ThemeColors.primary,
          fontWeight: 'bold',
          marginBottom: dW / 20,
        }}>
        {title}
      </Text>
    </View>
  );
};

export default Logo;
