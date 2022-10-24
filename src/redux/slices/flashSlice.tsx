import {createSlice} from '@reduxjs/toolkit';

const flashSlice = createSlice({
  name: 'flash',
  initialState: {
    flashStatus: false,
  },
  reducers: {
    showFlash: state => {
      state.flashStatus = true;
    },
    hideFlash: state => {
      state.flashStatus = false;
    },
  },
});

export const {showFlash, hideFlash} = flashSlice.actions;
export default flashSlice.reducer;
