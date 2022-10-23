import React from 'react';
import {View, Image, Text} from 'react-native';
import {ThemeColors} from '../settings/config';
import CustomButton from './CustomButton';
import man1 from '../assets/img/man1.png';
import {shadows} from '../styles/shadows';

type SingleUserType = {
  email: string;
  uid: string;
  name: string;
};

type SingleUserTileProps = {
  bc?: string; // Tile background color
  p?: number | null; // padding
  m?: number | null; // Margin
  br?: number | null; //
  u: SingleUserType;
};

const SingleUserTile = ({
  u,
  bc = ThemeColors.tileBackColor,
  p = 5,
  m = 5,
  br = 20,
}: SingleUserTileProps) => {
  //console.log('Single User Tile Component u: ', u);
  const onSubmit = () => {
    console.log('Trash button clicked');
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        margin: m,
        padding: p,
        backgroundColor: bc,
        borderRadius: br,
        ...shadows,
      }}>
      <Image source={man1} style={{width: 40, height: 40, borderRadius: 20}} />
      <View style={{marginLeft: 10, flex: 1}}>
        <Text style={{fontSize: 14, fontWeight: 'bold', color: '#000'}}>
          {u && u.name}
        </Text>
        <Text style={{fontSize: 12}}>Latest Message</Text>
      </View>
      <CustomButton
        leftIcon="trash"
        bgc={ThemeColors.primary}
        onPressFn={onSubmit}
      />
    </View>
  );
};

export default SingleUserTile;
