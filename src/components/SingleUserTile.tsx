import React from 'react';
import {View, Image, Text} from 'react-native';
import {ThemeColors} from '../settings/config';
import CustomButton from './CustomButton';
import man1 from '../assets/img/man1.png';
import {shadows} from '../styles/shadows';

type SingleUserTileProps = {
  bc?: string; // Tile background color
  p?: number | null; // padding
  m?: number | null; // Margin
  br?: number | null; //
};

const SingleUserTile = ({
  bc = ThemeColors.tileBackColor,
  p = 5,
  m = 5,
  br = 20,
}: SingleUserTileProps) => {
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
          Ramesh Jena
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
