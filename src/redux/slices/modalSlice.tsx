import {createSlice} from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    title: '',
    type: '', // Error, Info, Warning
    body: '',
    visible: false,
    closable: true,
  },
  reducers: {
    showModal: (state, action) => {
      state.type = action.payload.type;
      state.title = action.payload.title;
      state.body = action.payload.body;
      state.visible = true;
      state.closable = action.payload.closable;
    },
    hideModal: state => {
      (state.title = ''), (state.body = ''), (state.visible = false);
    },
  },
});

export const {showModal, hideModal} = modalSlice.actions;
export default modalSlice.reducer;
