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
  showFlash,
  hideFlash,
} from '../redux/store';
import {CustomModalTypes} from '../components/CustomModal';
import {SingleUserType} from '../settings/types';
import removeGroupsFromCurrentUser from '../helpers/removeGroupsFromCurrentUser';
import Logo from '../components/Logo';

const Home = () => {
  const [showEllipse, setShowEllipse] = useState(false);
  const {user} = useSelector((state: any) => state.userReducer);
  const {users, usersStatus, usersError} = useSelector(
    (state: any) => state.usersReducer,
  );

  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  //console.log('HomeScreen showEllipse: ', showEllipse);

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
    dispatch(showFlash());
    console.log('calling getALlUsers');
    //dispatch(getAllUsers());
    const firestoreusercollection = firestore().collection('Users');

    return firestoreusercollection.onSnapshot(querySnapshot => {
      if (querySnapshot != null) {
        let result: SingleUserType[] = [];
        querySnapshot.forEach(documentSnapshot => {
          const data = documentSnapshot.data();
          result.push(data);
        });
        // Remove current user from list
        let x = user ? result.filter((x: any) => x.uid !== user.uid) : result;
        // Remove groups that does not belong to current user
        let y = removeGroupsFromCurrentUser(x, user);
        dispatch(getAllUsers(y));
        dispatch(hideFlash());
      }
    });
  }, []);

  useEffect(() => {
    if (user === null) {
      navigation.replace(Screens.LOGIN);
    } else {
      let x = users.filter((x: any) => x.uid !== user.uid);
      dispatch(getAllUsers(x));
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
      {showEllipse && <ModalMenu setShowModal={setShowEllipse} user={user} />}
      <UserList users={users} />
    </View>
  );
};

export default Home;
