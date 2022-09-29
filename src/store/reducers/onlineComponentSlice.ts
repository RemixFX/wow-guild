import { createSlice } from "@reduxjs/toolkit";

export interface OnlineComponentState {
  isShowOnline: boolean;
}

const initialState: OnlineComponentState = {
  isShowOnline: true,
}


export const OnlineComponentSlice = createSlice({
  name: 'online',
  initialState,
  reducers: {
    showOnline: state => {
      state.isShowOnline = true
    },
    hideOnline: state => {
      state.isShowOnline = false
    }
  }
})
