import {configureStore, EnhancedStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import modalReducer from './slices/modalSlice';
import userReducer from './slices/userSlice';
import usersReducer from './slices/usersSlice';
import chatMessageReducer from './slices/chatMessageSlice';

import {signIn, signUp, signOut, resetUserState} from './slices/userSlice';
import {showModal, hideModal} from './slices/modalSlice';
import {writeMessage, setChatMessages} from './slices/chatMessageSlice';

import {
  getAllUsers,
  resetUsersStatus,
  resetUsersData,
} from './slices/usersSlice';

const store = configureStore({
  reducer: {
    modalReducer,
    userReducer,
    usersReducer,
    chatMessageReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

const useAppDispatch = () => useDispatch<AppDispatch>();

export {
  signIn,
  signUp,
  signOut,
  resetUserState,
  showModal,
  hideModal,
  getAllUsers,
  resetUsersStatus,
  resetUsersData,
  writeMessage,
  setChatMessages,
  useAppDispatch,
};
export default store;
