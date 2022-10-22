import {useFocusEffect, useNavigation} from '@react-navigation/native';
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
import {AppConfig, Screens, ThemeColors} from '../settings/config';
import SingleUserTile from '../components/SingleUserTile';
import {globalStyle} from '../styles/global';
import ModalMenu from '../navigator/ModalMenu';
import UserList from '../components/UserList';
import {useSelector} from 'react-redux';
import {useAppDispatch, getAllUsers} from '../redux/store';

const Home = () => {
  const [showEllipse, setShowEllipse] = useState(false);
  const {user} = useSelector((state: any) => state.userReducer);

  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  console.log('HomeScreen showEllipse: ', showEllipse);

  const groupChatHomeHeader = () => {
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

  useFocusEffect(() => {
    navigation.setOptions({
      headerTitle: () => groupChatHomeHeader(),
      headerLeft: () => null,
    });
    dispatch(getAllUsers());
  });

  useEffect(() => {
    if (user === null) {
      navigation.replace(Screens.LOGIN);
    }
  }, [user]);

  const onClickTile = () => {
    navigation.navigate(Screens.CHATROOM);
  };

  return (
    <View>
      {showEllipse && <ModalMenu setShowModal={setShowEllipse} />}
      <UserList />
    </View>
  );
};

export default Home;
