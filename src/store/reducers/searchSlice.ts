import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IError } from "../../models/globalError";
import { ISearchGuild } from "../../models/searchGuild";

export interface SearchState {
  searchValue: ISearchGuild[];
  searchLoading: boolean;
  searchError: IError;
  searchMessage: string;
}

const initialState: SearchState = {
  searchValue: [],
  searchLoading: false,
  searchError: {isError: false, message: ''},
  searchMessage: ''
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    guildFetching: state => {
      state.searchValue = []
      state.searchLoading = true
      state.searchError = {isError: false, message: ''}
      state.searchMessage = ''
    },
    guildFetchingSuccess: (state, action: PayloadAction<ISearchGuild[]>) => {
      state.searchValue = action.payload
      state.searchLoading = false
      state.searchError = {isError: false, message: ''}
      state.searchMessage = ''
    },
    guildFetchingError: (state, action: PayloadAction<IError>) => {
      state.searchValue = []
      state.searchLoading = false
      state.searchError = action.payload
      state.searchMessage = ''
    },
    guildSearchMessageResult: state => {
      state.searchError = {isError: false, message: ''}
      state.searchLoading = false
      state.searchMessage = 'Выберите гильдию из списка'
    },
    guildSearchMessageEmpty: state => {
      state.searchError = {isError: false, message: ''}
      state.searchLoading = false
      state.searchMessage = `Попробуйте поискать гильдию \n по другим буквам`
    },
  }
})
