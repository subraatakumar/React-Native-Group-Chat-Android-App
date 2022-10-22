import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {ThemeColors} from '../settings/config';

type ModalMenuPropTypes = {
  setShowModal: Function;
};

const ModalMenu = ({setShowModal}: ModalMenuPropTypes) => {
  const navigation = useNavigation();
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
                navigation.navigate('CreateGroup');
              }}>
              <Text style={{color: ThemeColors.black}}>Create Group</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ModalMenu;
