import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import {Constants} from '../../settings/config';
import {compareObj} from '../../helpers';

type ResultType = {
  name: string;
  email: string;
  uid: string;
};

type StoreStateType = {
  users: ResultType[];
  usersStatus: string;
  usersError: string;
};

export const getAllUsers = createAsyncThunk('users/getallusers', async data => {
  console.log('Started getting user data');
  return data.sort((a, b) => a.name.localeCompare(b.name));
});

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    usersStatus: Constants.IDLE,
    usersError: 'Unknown Error Occured!',
  } as StoreStateType,
  reducers: {
    resetUsersStatus: state => {
      state.usersStatus = Constants.IDLE;
      state.usersError = 'Unknown Error Occured!';
    },
    resetUsersData: state => {
      state.users = [];
      state.usersStatus = Constants.IDLE;
      state.usersError = 'Unknown Error Occured!';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllUsers.pending, state => {
        state.usersStatus = Constants.LOADING;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.usersStatus = Constants.FULFILLED;
        console.log(
          'Comparing',
          !compareObj(state.users, action.payload, 'uid'),
        );
        if (!compareObj(state.users, action.payload, 'uid')) {
          console.log('Updating state of users');
          state.users = [...action.payload];
        }
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.usersStatus = Constants.REJECTED;
        action?.error?.message && (state.usersError = action?.error?.message);
        //console.log('getAllUsers Rejected', action);
      });
  },
});

export const {resetUsersStatus, resetUsersData} = usersSlice.actions;
export default usersSlice.reducer;
