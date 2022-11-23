import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAccount } from "../../models/aсcountModel";

interface AdminState {
  loggedIn: boolean;
  openLoginForm: boolean;
  openRegisterForm: boolean;
  loading: boolean,
  error: boolean,
  valueForm: IAccount;
}

const initialState: AdminState = {
  loggedIn: true,
  openLoginForm: false,
  openRegisterForm: false,
  loading: false,
  error: false,
  valueForm: {
    login: '',
    password: ''
  }
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
    },
    isSucessFetchingForm: (state, action: PayloadAction<IAccount>) => {
      state.loggedIn = true
      state.loading = false
      state.error = false
      state.valueForm = action.payload
    },
    isErrorFetchingForm: state => {
      state.loggedIn = false
      state.loading = false
      state.error = true
      state.valueForm = {login: '', password: ''}
    },
    isLoggedIn: state => {
      state.loggedIn = true
    },
    isNotLoggedIn: state => {
      state.loggedIn = false
    }
  }
})
