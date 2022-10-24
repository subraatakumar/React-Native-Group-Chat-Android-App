import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Constants, Screens, ThemeColors} from '../settings/config';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  hideModal,
  resetUserState,
  showModal,
  useAppDispatch,
  signOut,
} from '../redux/store';
import {useSelector} from 'react-redux';
import {CustomModalTypes} from '../components/CustomModal';

type ModalMenuPropTypes = {
  setShowModal: Function;
  user: any;
};

const ModalMenu = ({setShowModal, user}: ModalMenuPropTypes) => {
  const {signOutStatus, signOutError} = useSelector(
    (state: any) => state.userReducer,
  );

  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    if (signOutStatus === Constants.LOADING) {
      dispatch(
        showModal({
          type: CustomModalTypes.WARNING,
          title: 'Sign Up',
          body: 'Please wait Creating user.',
          closable: false,
        }),
      );
      return;
    }
    if (signOutStatus === Constants.REJECTED) {
      dispatch(
        showModal({
          type: CustomModalTypes.ERROR,
          title: 'Sign Out Error',
          body: signOutError,
          closable: true,
        }),
      );
      dispatch(resetUserState());

      return;
    }
    if (signOutStatus == Constants.FULFILLED) {
      dispatch(hideModal());
      dispatch(resetUserState());
      return;
    }
  }, [signOutStatus]);

  return (
    <Modal
      transparent={true}
      onRequestClose={() => {
        setShowModal(prev => !prev);
      }}>
      <TouchableWithoutFeedback
        onPress={() => {
          setShowModal(prev => !prev);
        }}>
        <View
          style={{
            backgroundColor: 'transparent',
            width: '100%',
            height: '100%',
          }}>
          <View
            style={{
              position: 'absolute',
              width: 150,
              right: 10,
              top: 10,
              backgroundColor: '#fff',
              padding: 10,
              borderRadius: 4,
              overflow: 'visible',
            }}>
            <TouchableOpacity
              onPress={() => {
                setShowModal(false);
              }}>
              <View
                style={{
                  ...style.singleTile,
                  borderBottomColor: 'green',
                  borderBottomWidth: 1,
                  marginTop: 0,
                }}>
                {/* <Ionicons
                  name="md-people-circle-sharp"
                  size={20}
                  color={ThemeColors.primary}
                /> */}
                <Text style={style.singleTileText}>Hi {user.displayName}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShowModal(false);
                navigation.navigate(Screens.CREATEGROUP);
              }}>
              <View style={style.singleTile}>
                <Ionicons
                  name="md-people-circle-sharp"
                  size={20}
                  color={ThemeColors.primary}
                />
                <Text style={style.singleTileText}>Create Group</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                dispatch(signOut());
                setShowModal(false);
              }}>
              <View style={style.singleTile}>
                <Ionicons
                  name="md-log-out"
                  size={20}
                  color={ThemeColors.primary}
                />
                <Text style={style.singleTileText}>Logout</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ModalMenu;

const style = StyleSheet.create({
  singleTile: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  singleTileText: {
    color: ThemeColors.primary,
    textAlign: 'center',
    marginLeft: 10,
  },
});
