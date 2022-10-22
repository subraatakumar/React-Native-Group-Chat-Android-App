import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import SingleUserTile from './SingleUserTile';

const UserList = () => {
  const navigation = useNavigation();

  const onClickTile = () => {
    navigation.navigate('ChatRoom');
  };
  return (
    <>
      <TouchableOpacity onPress={() => onClickTile()}>
        <SingleUserTile />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onClickTile()}>
        <SingleUserTile />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onClickTile()}>
        <SingleUserTile />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onClickTile()}>
        <SingleUserTile />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onClickTile()}>
        <SingleUserTile />
      </TouchableOpacity>
    </>
  );
};

export default UserList;
