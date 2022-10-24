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
import {Constants, Screens} from '../settings/config';
import {CustomModalTypes} from './CustomModal';
import SingleUserTile from './SingleUserTile';
import {SingleUserType} from '../settings/types';

type UserListPropTypes = {
  users: any;
  onLongPress: Function;
  showGroups: boolean;
};
const UserList = ({
  users,
  onLongPress = () => {},
  showGroups = true,
}: UserListPropTypes) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  //console.log('userList component users: ', users);

  const onClickTile = (u: SingleUserType) => {
    if (u.isGroup) {
      navigation.navigate(Screens.GROUPCHATROOM as never, {u} as never);
    } else {
      navigation.navigate(Screens.CHATROOM as never, {u} as never);
    }
  };

  const Item = ({u}: {u: SingleUserType}) =>
    !u.isGroup || showGroups ? (
      <TouchableOpacity
        onPress={() => onClickTile(u)}
        onLongPress={() => onLongPress(u)}>
        <SingleUserTile u={u} />
      </TouchableOpacity>
    ) : (
      <></>
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
