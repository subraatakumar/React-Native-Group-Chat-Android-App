import React, {useEffect} from 'react';
import {View, Image, Text, Alert} from 'react-native';
import {Constants, ThemeColors} from '../settings/config';
import CustomButton from './CustomButton';
import man1 from '../assets/img/man1.png';
import people from '../assets/img/people.png';
import {shadows} from '../styles/shadows';
import {SingleUserType} from '../settings/types';
import {deleteGroup, hideModal, showModal} from '../redux/store';
import {CustomModalTypes} from './CustomModal';
import {useSelector} from 'react-redux';

type SingleUserTileProps = {
  bc?: string; // Tile background color
  p?: number | null; // padding
  m?: number | null; // Margin
  br?: number | null; //
  u: SingleUserType;
  dispatch?: any;
  uid: string | null; // Logged in user id
};

const SingleUserTile = ({
  u,
  bc = ThemeColors.tileBackColor,
  p = 5,
  m = 5,
  br = 20,
  dispatch = () => {},
  uid = null,
}: SingleUserTileProps) => {
  const {groupDeletionError, groupDeletionStatus} = useSelector(
    (state: any) => state.groupReducer,
  );

  useEffect(() => {
    if (groupDeletionStatus === Constants.LOADING) {
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

    if (groupDeletionStatus === Constants.REJECTED) {
      dispatch(
        showModal({
          type: CustomModalTypes.ERROR,
          title: 'Getting Users',
          body: groupDeletionError,
          closable: true,
        }),
      );
      return;
    }

    if (groupDeletionStatus == Constants.FULFILLED) {
      dispatch(hideModal());
      return;
    }
  }, [groupDeletionStatus, groupDeletionError]);

  const onSubmit = () => {
    Alert.alert(
      'Deleting A Group',
      "Are you sure? It can't be reverted. Group will all it's messages will be deleted!",
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            dispatch(deleteGroup(u));
          },
        },
      ],
    );
  };

  const isTrashIcon = () =>
    u.members ? JSON.parse(u.members)[0].uid === uid : false;

  //u.members && console.log('Admin:', JSON.parse(u.members)[0].uid, uid);
  return (
    <View
      style={{
        flexDirection: 'row',
        margin: m,
        padding: p,
        backgroundColor: bc,
        borderRadius: br,
        ...shadows,
      }}>
      <Image
        source={u.isGroup ? people : man1}
        style={{width: 40, height: 40, borderRadius: 20}}
      />
      <View style={{marginLeft: 10, flex: 1}}>
        <Text style={{fontSize: 14, fontWeight: 'bold', color: '#000'}}>
          {u && u.name}
        </Text>
        <Text style={{fontSize: 12}}>Latest Message</Text>
      </View>
      {isTrashIcon() && (
        <CustomButton
          leftIcon="trash"
          bgc={ThemeColors.primary}
          onPressFn={onSubmit}
        />
      )}
    </View>
  );
};

export default SingleUserTile;
