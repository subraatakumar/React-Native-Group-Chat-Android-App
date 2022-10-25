import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Constants} from '../../settings/config';
import firestore from '@react-native-firebase/firestore';
import {SingleUserType} from '../../settings/types';

export const createGroup = createAsyncThunk(
  'group/create',
  async (data: SingleUserType) => {
    await firestore()
      .collection('Users')
      .doc('' + data.uid)
      .set(data);
  },
);

export const deleteGroup = createAsyncThunk(
  'group/delete',
  async (data: SingleUserType) => {
    await firestore()
      .collection('Users')
      .doc('' + data.uid)
      .delete();
    const messageQuerySnapshot = await firestore()
      .collection('Messages')
      .where('groupId', '==', data.uid)
      .get();
    const batch = firestore().batch();
    messageQuerySnapshot.forEach(documentSnapshot => {
      batch.delete(documentSnapshot.ref);
    });
    return batch.commit();
  },
);

const groupSlice = createSlice({
  name: 'group',
  initialState: {
    groupCreationStatus: Constants.IDLE,
    groupCreationError: 'Unknown Error Occured!',
    groupDeletionStatus: Constants.IDLE,
    groupDeletionError: 'Unknown Error Occured!',
  },
  reducers: {
    resetGroupStatus: state => {
      state.groupCreationStatus = Constants.IDLE;
      state.groupCreationError = 'Unknown Error Occured!';
    },
    resetGroupDeletionStatus: state => {
      state.groupDeletionStatus = Constants.IDLE;
      state.groupDeletionError = 'Unknown Error Occured!';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createGroup.pending, state => {
        state.groupCreationStatus = Constants.LOADING;
      })
      .addCase(createGroup.fulfilled, state => {
        state.groupCreationStatus = Constants.FULFILLED;
      })
      .addCase(createGroup.rejected, (state, action) => {
        state.groupCreationStatus = Constants.REJECTED;
        action?.error?.message &&
          (state.groupCreationError = action.error.message);
      })
      .addCase(deleteGroup.pending, state => {
        state.groupDeletionStatus = Constants.LOADING;
      })
      .addCase(deleteGroup.fulfilled, state => {
        state.groupDeletionStatus = Constants.FULFILLED;
      })
      .addCase(deleteGroup.rejected, (state, action) => {
        state.groupDeletionStatus = Constants.REJECTED;
        action?.error?.message &&
          (state.groupDeletionError = action.error.message);
      });
  },
});

export const {resetGroupStatus, resetGroupDeletionStatus} = groupSlice.actions;
export default groupSlice.reducer;
