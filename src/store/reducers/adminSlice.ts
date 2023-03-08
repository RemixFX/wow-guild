import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IError } from "../../models/globalError";

interface AdminState {
  loggedIn: boolean;
  currentUser: string;
  openLoginForm: boolean;
  openRegisterForm: boolean;
  loading: boolean,
  error: IError,
  infoMessage: string;
}

const initialState: AdminState = {
  loggedIn: false,
  currentUser: '',
  openLoginForm: false,
  openRegisterForm: false,
  loading: false,
  error: { isError: false, message: '' },
  infoMessage: ''
}

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    isOpenLoginForm: state => {
      state.openLoginForm = true
      state.loading = false
      state.error = { isError: false, message: '' }
    },
    isOpenRegisterForm: state => {
      state.openRegisterForm = true
      state.loading = false
      state.error = { isError: false, message: '' }
    },
    isFetchingForm: state => {
      state.loading = true
      state.error = { isError: false, message: '' }
      state.infoMessage = ''
    },
    isSucessFetchingLoginForm: (state, action: PayloadAction<string>) => {
      state.loggedIn = true
      state.loading = false
      state.openLoginForm = false
      state.openRegisterForm = false
      state.error = { isError: false, message: '' }
      state.currentUser = action.payload
      state.infoMessage = 'Успешный вход'
    },
    isSucessFetchingRegisterForm: (state, action: PayloadAction<string>) => {
      state.loggedIn = true
      state.loading = false
      state.openLoginForm = false
      state.openRegisterForm = false
      state.error = { isError: false, message: '' }
      state.infoMessage = action.payload
    },
    isSucessFetchingLogout: (state, action: PayloadAction<string>) => {
      state.loggedIn = false
      state.loading = false
      state.openLoginForm = false
      state.openRegisterForm = false
      state.error = { isError: false, message: '' }
      state.currentUser = ''
      state.infoMessage = action.payload
    },
    isErrorFetchingForm: (state, action: PayloadAction<IError>) => {
      state.loading = false
      state.error = action.payload
    },
    isCloseForm: state => {
      state.openLoginForm = false
      state.openRegisterForm = false
    }
  }
})
