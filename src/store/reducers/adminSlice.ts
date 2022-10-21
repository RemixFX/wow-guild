import { createSlice } from "@reduxjs/toolkit";

interface AdminState {
  loggedIn: boolean;
}

const initialState: AdminState = {
  loggedIn: false
}

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    isLoggedIn: state => {
      state.loggedIn = true
    },
    isNotLoggedIn: state => {
      state.loggedIn = false
    }
  }
})
