import {configureStore, EnhancedStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import modalReducer from './slices/modalSlice';
import userReducer from './slices/userSlice';
import {signIn} from './slices/userSlice';

const store = configureStore({
  reducer: {
    modalReducer,
    userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

const useAppDispatch = () => useDispatch<AppDispatch>();

export {signIn, useAppDispatch};
export default store;
