import { createSlice } from "@reduxjs/toolkit";

interface AdminState {
  loggedIn: boolean;
}

const initialState: AdminState = {
  loggedIn: true
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
