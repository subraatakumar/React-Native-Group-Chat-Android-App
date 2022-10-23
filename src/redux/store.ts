import {configureStore, EnhancedStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import modalReducer from './slices/modalSlice';
import userReducer from './slices/userSlice';
import usersReducer from './slices/usersSlice';
import chatMessageReducer from './slices/chatMessageSlice';
import groupReducer from './slices/groupSlice';

import {signIn, signUp, signOut, resetUserState} from './slices/userSlice';
import {showModal, hideModal} from './slices/modalSlice';
import {writeMessage, setChatMessages} from './slices/chatMessageSlice';
import {
  createGroup,
  deleteGroup,
  resetGroupStatus,
  resetGroupDeletionStatus,
} from './slices/groupSlice';

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
    groupReducer,
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
  createGroup,
  deleteGroup,
  resetGroupStatus,
  resetGroupDeletionStatus,
  useAppDispatch,
};
export default store;
