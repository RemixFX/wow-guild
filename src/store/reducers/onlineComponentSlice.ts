import { createSlice } from "@reduxjs/toolkit";

export interface OnlineComponentState {
  isShowOnline: boolean;
  waitingForAnimation: boolean;
}

const initialState: OnlineComponentState = {
  isShowOnline: true,
  waitingForAnimation: true
}


export const OnlineComponentSlice = createSlice({
  name: 'online',
  initialState,
  reducers: {
    showTimedOnline: state => {
      state.waitingForAnimation = true
    },
    showOnline: state => {
      state.isShowOnline = true

    },
    hideOnline: state => {
      state.isShowOnline = false
      state.waitingForAnimation = false
    }
  }
})
