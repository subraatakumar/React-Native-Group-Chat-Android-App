import {useRoute} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import UserList from '../components/UserList';

const ViewGroupMembers = () => {
  const params = useRoute().params;

  useEffect(() => {}, []);

  const members =
    params?.members && params?.uid
      ? JSON.parse(params.members).filter(m => m.uid != params?.uid)
      : null;

  return (
    <View>
      <UserList users={members} onLongPress={() => {}} showGroups={false} />
    </View>
  );
};

export default ViewGroupMembers;
