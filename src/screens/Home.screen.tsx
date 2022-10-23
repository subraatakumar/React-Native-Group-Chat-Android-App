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
import {AppConfig, Constants, Screens, ThemeColors} from '../settings/config';
import SingleUserTile from '../components/SingleUserTile';
import {globalStyle} from '../styles/global';
import ModalMenu from '../navigator/ModalMenu';
import UserList from '../components/UserList';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {
  useAppDispatch,
  getAllUsers,
  showModal,
  resetUsersData,
  resetUsersStatus,
  hideModal,
} from '../redux/store';
import {CustomModalTypes} from '../components/CustomModal';

const Home = () => {
  const [showEllipse, setShowEllipse] = useState(false);
  const {user} = useSelector((state: any) => state.userReducer);
  const {users, usersStatus, usersError} = useSelector(
    (state: any) => state.usersReducer,
  );

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
  });

  useEffect(() => {
    console.log('calling getALlUsers', users);
    //dispatch(getAllUsers());
    firestore()
      .collection('Users')
      .onSnapshot(querySnapshot => {
        if (querySnapshot == null) {
          //reject('Error receiving data');
        } else {
          let result: ResultType[] = [];
          querySnapshot.forEach(documentSnapshot => {
            const {uid, name, email} = documentSnapshot.data();
            result.push({
              uid,
              name,
              email,
            });
          });
          //console.log(result);
          dispatch(getAllUsers(result));
        }
      });
  }, []);

  useEffect(() => {
    if (user === null) {
      navigation.replace(Screens.LOGIN);
    }
  }, [user]);

  useEffect(() => {
    if (usersStatus === Constants.LOADING) {
      dispatch(
        showModal({
          type: CustomModalTypes.WARNING,
          title: 'Getting Users',
          body: 'Please wait Getting List Of Users.',
          closable: false,
        }),
      );
      return;
    }

    if (usersStatus === Constants.REJECTED) {
      dispatch(
        showModal({
          type: CustomModalTypes.ERROR,
          title: 'Getting Users',
          body: usersError,
          closable: true,
        }),
      );
      dispatch(resetUsersData());

      return;
    }

    if (usersStatus == Constants.FULFILLED) {
      dispatch(hideModal());
      dispatch(resetUsersStatus());
      return;
    }
  }, [usersStatus, usersError]);

  const onClickTile = () => {
    navigation.navigate(Screens.CHATROOM);
  };

  return (
    <View>
      {showEllipse && <ModalMenu setShowModal={setShowEllipse} />}
      <UserList users={users} />
    </View>
  );
};

export default Home;
