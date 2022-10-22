import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useAppDispatch} from '../redux/store';
import SingleUserTile from './SingleUserTile';

type SingleUserType = {
  email: string;
  uid: string;
  name: string;
};
const UserList = () => {
  const {users} = useSelector((state: any) => state.usersReducer);

  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  console.log('userList component users: ', users);
  const onClickTile = (u: SingleUserType) => {
    navigation.navigate('ChatRoom', {u} as never);
  };

  const Item = ({u}: {u: SingleUserType}) => (
    <TouchableOpacity onPress={() => onClickTile(u)}>
      <SingleUserTile u={u} />
    </TouchableOpacity>
  );

  return (
    <>
      <FlatList
        data={users}
        renderItem={item => <Item u={item.item} />}
        keyExtractor={item => item.uid}
      />
    </>
  );
};

export default UserList;
