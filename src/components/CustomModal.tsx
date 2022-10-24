import {View, Text, Modal} from 'react-native';
import React, {useState} from 'react';
import CustomButton from './CustomButton';
import {ThemeColors, fontSize} from '../settings/config';
import {useSelector} from 'react-redux';
import {showModal, hideModal} from '../redux/slices/modalSlice';
import {useAppDispatch} from '../redux/store';

export type CustomModalPropTypes = {
  customFn?: Function;
  primaryColor?: string;
  warningColor?: string;
  dangerColor?: string;
};

export const CustomModalTypes = {
  ERROR: 'Error',
  WARNING: 'Warning',
  SUCCESS: 'Success',
};

const CustomModal = ({
  customFn = () => {},
  primaryColor = ThemeColors.primary,
  warningColor = ThemeColors.warning,
  dangerColor = ThemeColors.danger,
}: CustomModalPropTypes) => {
  const dispatch = useAppDispatch();
  const modalVisible = useSelector((state: any) => state.modalReducer.visible);
  const modalTitle = useSelector((state: any) => state.modalReducer.title);
  const modalBody = useSelector((state: any) => state.modalReducer.body);
  const modalType = useSelector((state: any) => state.modalReducer.type);
  const modalClosable = useSelector(
    (state: any) => state.modalReducer.closable,
  );

  const modalButtonColor =
    modalType === CustomModalTypes.ERROR
      ? dangerColor
      : modalType === CustomModalTypes.WARNING
      ? warningColor
      : primaryColor;

  const onClickModal = () => {
    dispatch(hideModal());
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {}}>
      <View
        style={{
          flex: 1,
          margin: 0,
          backgroundColor: 'rgba(20,20,20,0.8)',
          height: 300,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: 200,

            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#FFF',
            borderRadius: 10,
            padding: 20,
          }}>
          <Text
            style={{
              color: modalButtonColor,
              textAlign: 'center',
              fontSize: fontSize.xl,
            }}>
            {modalTitle}
          </Text>
          <Text style={{marginVertical: 25, textAlign: 'center'}}>
            {modalBody}
          </Text>
          {modalClosable && (
            <CustomButton
              title="Ok"
              w={150}
              bgc={modalButtonColor}
              onPressFn={onClickModal}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
