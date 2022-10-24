import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Constants} from '../../settings/config';
import firestore from '@react-native-firebase/firestore';
import {
  SingleChatMessageType,
  FireStoreSingleChatMessageType,
} from '../../settings/types';

export const writeMessage = createAsyncThunk(
  'chatmessage/write',
  async (data: FireStoreSingleChatMessageType) => {
    await firestore().collection('Messages').add(data);
    return true;
  },
);

export const increaseLike = createAsyncThunk(
  'chatmessage/increaselike',
  async data => {
    console.log('Like to be increased');
    firestore()
      .collection('Messages')
      .doc(data.item.docId)
      .update({
        likes: [...data.item.likes, data.uid],
      });
  },
);

const chatMessageSlice = createSlice({
  name: 'chatMessage',
  initialState: {
    writeMessageStatus: Constants.IDLE,
    chatMessages: [] as SingleChatMessageType[],
    writeMessageError: 'Something went wrong!',
  },
  reducers: {
    setChatMessages: (state, action) => {
      state.chatMessages = [...action.payload];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(writeMessage.pending, state => {
        state.writeMessageStatus = Constants.LOADING;
      })
      .addCase(writeMessage.fulfilled, state => {
        state.writeMessageStatus = Constants.FULFILLED;
      })
      .addCase(writeMessage.rejected, (state, action) => {
        state.writeMessageStatus = Constants.REJECTED;
        action?.error?.message &&
          (state.writeMessageError = action?.error?.message);
      });
  },
});

export const {setChatMessages} = chatMessageSlice.actions;
export default chatMessageSlice.reducer;
