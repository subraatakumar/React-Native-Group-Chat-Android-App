import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';
import {useSelector} from 'react-redux';
import UserList from '../components/UserList';
import {
  createGroup,
  hideModal,
  resetGroupStatus,
  showModal,
  useAppDispatch,
} from '../redux/store';
import {Constants, ThemeColors} from '../settings/config';
import {CustomModalTypes} from '../components/CustomModal';
import {useNavigation} from '@react-navigation/native';

const CreateGroup = () => {
  const [groupName, setGroupName] = useState('');
  const [groupNameErr, setGroupNameErr] = useState(true);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const {user} = useSelector((state: any) => state.userReducer);
  const {users} = useSelector((state: any) => state.usersReducer);
  const {groupCreationStatus, groupCreationError} = useSelector(
    (state: any) => state.groupReducer,
  );
  console.log('CreateGroupScreen', users);

  useEffect(() => {
    setFilteredUsers([...users]);
  }, [users]);

  const onLongPressFilteredUsers = (prop: any) => {
    console.log('Long Pressed:', prop);
    setSelectedUsers(prev => [...prev, prop]);
    setFilteredUsers(prev => prev.filter(a => a.uid !== prop.uid));
  };
  const onLongPressSelectedUsers = prop => {
    setSelectedUsers(prev => prev.filter(a => a.uid !== prop.uid));
  };

  useEffect(() => {
    dispatch(resetGroupStatus());
  }, []);

  useEffect(() => {
    if (groupCreationStatus === Constants.LOADING) {
      dispatch(
        showModal({
          type: CustomModalTypes.WARNING,
          title: 'Creating Group',
          body: 'Please wait Sending List Of Users to server.',
          closable: false,
        }),
      );
      return;
    }

    if (groupCreationStatus === Constants.REJECTED) {
      dispatch(
        showModal({
          type: CustomModalTypes.ERROR,
          title: 'Creating Group',
          body: groupCreationError,
          closable: true,
        }),
      );

      return;
    }

    if (groupCreationStatus === Constants.FULFILLED) {
      dispatch(hideModal());
      dispatch(resetGroupStatus());
      if (navigation.canGoBack()) {
        navigation.goBack();
      }
      return;
    }
  }, [groupCreationStatus]);

  const createGroupInServer = () => {
    dispatch(resetGroupStatus());
    dispatch(
      createGroup({
        uid: Date.now().toString(),
        name: groupName,
        email: null,
        isGroup: true,
        members: JSON.stringify(filteredUsers),
        adminId: user.uid,
        createdAt: Date.now(),
      }),
    );
  };

  return (
    <ScrollView style={{flex: 1}}>
      <Text style={{textAlign: 'center', fontSize: 10}}>
        Press and Hold any user to add to group
      </Text>
      <UserList
        users={selectedUsers}
        onLongPress={onLongPressSelectedUsers}
        showGroups={false}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <CustomTextInput
          value={groupName}
          setValue={setGroupName}
          err={groupNameErr}
          setErr={setGroupNameErr}
          validation={['min', 'max']}
          min={4}
          max={50}
          w={200}
          m={10}
          placeholder="Enter Group Name"
          hideTitle={true}
        />
        <CustomButton
          title={'Create'}
          w={70}
          h={40}
          br={5}
          textStyle={{marginLeft: 10}}
          bgc={ThemeColors.primary}
          disabled={groupNameErr || selectedUsers.length === 0}
          onPressFn={createGroupInServer}
        />
      </View>
      <UserList
        users={filteredUsers}
        onLongPress={onLongPressFilteredUsers}
        showGroups={false}
      />
    </ScrollView>
  );
};

export default CreateGroup;
