import React from 'react';
import {Modal, View} from 'react-native';
import {useSelector} from 'react-redux';
import Logo from './Logo';

const FlashScreen = () => {
  const flashStatus = useSelector(
    (state: any) => state.flashReducer.flashStatus,
  );
  return (
    <Modal visible={flashStatus}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#FFF',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Logo />
      </View>
    </Modal>
  );
};

export default FlashScreen;
