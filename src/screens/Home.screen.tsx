import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import {AppConfig, ThemeColors} from '../settings/config';
import SingleUserTile from '../components/SingleUserTile';
import {globalStyle} from '../styles/global';
import ModalMenu from '../navigator/ModalMenu';
import UserList from '../components/UserList';

const Home = () => {
  const [showEllipse, setShowEllipse] = useState(false);
  const navigation = useNavigation();
  console.log('showEllipse: ', showEllipse);
  const GroupChatHomeHeader = () => {
    return (
      <View style={globalStyle.headerTitleContainer}>
        <Text style={{...globalStyle.headerTitle, flex: 1}}>
          {AppConfig.title}
        </Text>
        <View style={{left: -20}}>
          <CustomButton
            leftIcon={'ellipsis-vertical'}
            onPressFn={() => setShowEllipse(prev => !prev)}
            bgc={'transparent'}
            bc={'transparent'}
            sc={'transparent'}
          />
        </View>
      </View>
    );
  };
  useEffect(() => {
    navigation.setOptions({headerTitle: () => <GroupChatHomeHeader />});
  }, []);

  const onClickTile = () => {
    navigation.navigate('ChatRoom');
  };

  return (
    <View>
      {showEllipse && <ModalMenu setShowModal={setShowEllipse} />}
      <UserList />
    </View>
  );
};

export default Home;
