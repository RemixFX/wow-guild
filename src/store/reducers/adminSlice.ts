import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAccount } from "../../models/aсcountModel";

interface AdminState {
  loggedIn: boolean;
  currentUser: string;
  openLoginForm: boolean;
  openRegisterForm: boolean;
  loading: boolean,
  error: any,
  infoMessage: string;
}

const initialState: AdminState = {
  loggedIn: false,
  currentUser: '',
  openLoginForm: false,
  openRegisterForm: false,
  loading: false,
  error: false,
  infoMessage: ''
}

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    isOpenLoginForm: state => {
      state.openLoginForm = true
      state.loading = false
      state.error = false
    },
    isOpenRegisterForm: state => {
      state.openRegisterForm = true
      state.loading = false
      state.error = false
    },
    isCloseForm: state => {
      state.openLoginForm = false
      state.openRegisterForm = false
      state.loading = false
      state.error = false
    },
    isFetchingForm: state => {
      state.loading = true
      state.error = false
      state.infoMessage = ''
    },
    isSucessFetchingLoginForm: (state, action: PayloadAction<string>) => {
      state.loggedIn = true
      state.loading = false
      state.openLoginForm = false
      state.openRegisterForm = false
      state.error = false
      state.currentUser = action.payload
      state.infoMessage = 'Успешный вход'
    },
    isSucessFetchingRegisterForm: (state, action: PayloadAction<string>) => {
      state.loggedIn = true
      state.loading = false
      state.openLoginForm = false
      state.openRegisterForm = false
      state.error = false
      state.infoMessage = action.payload
    },
    isSucessFetchingLogout: (state, action: PayloadAction<string>) => {
      state.loggedIn = false
      state.loading = false
      state.openLoginForm = false
      state.openRegisterForm = false
      state.error = false
      state.currentUser = ''
      state.infoMessage = action.payload
    },
    isErrorFetchingForm: (state, action: PayloadAction<any>) => {
      state.loggedIn = false
      state.loading = false
      state.error = action.payload
    },
    isLoggedIn: (state, action: PayloadAction<string>) => {
      state.loggedIn = true
      state.currentUser = action.payload
    },
    isNotLoggedIn: state=> {
      state.loggedIn = false
      state.currentUser = ''
    }
  }
})
