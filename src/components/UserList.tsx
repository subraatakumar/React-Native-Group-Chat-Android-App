import {useNavigation} from '@react-navigation/native';
import React, {memo, useEffect} from 'react';
import {TouchableOpacity, FlatList, ScrollView, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  hideModal,
  resetUsersData,
  resetUsersStatus,
  showModal,
  useAppDispatch,
} from '../redux/store';
import {Constants} from '../settings/config';
import {CustomModalTypes} from './CustomModal';
import SingleUserTile from './SingleUserTile';

type SingleUserType = {
  email: string;
  uid: string;
  name: string;
};

const UserList = ({users}) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  //console.log('userList component users: ', users);

  const onClickTile = (u: SingleUserType) => {
    navigation.navigate('ChatRoom', {u} as never);
  };

  const Item = ({u}: {u: SingleUserType}) => (
    <TouchableOpacity onPress={() => onClickTile(u)}>
      <SingleUserTile u={u} />
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        data={users}
        renderItem={item => <Item u={item.item} />}
        keyExtractor={item => item.uid}
      />
    </View>
  );
};

export default memo(UserList);
