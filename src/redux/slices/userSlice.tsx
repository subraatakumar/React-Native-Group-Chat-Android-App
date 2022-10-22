import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import {Constants} from '../../settings/config';

type signInDataType = {
  email: string;
  password: string;
};

export const signIn = createAsyncThunk(
  'user/signin',
  async (data: signInDataType) => {
    console.log('Sign in Started', data.email, data.password);
    const userData = await auth().signInWithEmailAndPassword(
      data.email,
      data.password,
    );
    console.log(userData);
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: [],
    userStatus: Constants.IDLE,
    userError: 'Unknown Error Occured!',
  },
  reducers: {
    resetUserState: state => {
      state.userStatus = Constants.IDLE;
      state.userError = 'Unknown Error Occured!';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(signIn.pending, (state, action) => {
        state.userStatus = Constants.LOADING;
        console.log('Pending');
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.userStatus = Constants.FULFILLED;
        console.log('Fulfilled', action);
      })
      .addCase(signIn.rejected, (state, action) => {
        state.userStatus = Constants.REJECTED;
        if (action.error.code === 'auth/user-not-found') {
          state.userError = 'No user found for the given credentials.';
        }
        console.log('Rejected', action.error.message);
      });
  },
});

export const {resetUserState} = userSlice.actions;
export default userSlice.reducer;
