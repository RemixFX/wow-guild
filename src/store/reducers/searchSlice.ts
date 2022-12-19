import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISearchGuild } from "../../models/searchGuild";

export interface SearchState {
  searchValue: ISearchGuild[];
  searchLoading: boolean;
  searchError: boolean;
  searchMessage: string;
}

const initialState: SearchState = {
  searchValue: [],
  searchLoading: false,
  searchError: false,
  searchMessage: ''
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    guildFetching: state => {
      state.searchValue = []
      state.searchLoading = true
      state.searchError = false
      state.searchMessage = ''
    },
    guildFetchingSuccess: (state, action: PayloadAction<ISearchGuild[]>) => {
      state.searchValue = action.payload
      state.searchLoading = false
      state.searchError = false
      state.searchMessage = ''
    },
    guildFetchingError: state => {
      state.searchValue = []
      state.searchLoading = false
      state.searchError = true
      state.searchMessage = ''
    },
    guildSearchMessageResult: state => {
      state.searchError = false
      state.searchLoading = false
      state.searchMessage = 'Выберите гильдию из списка'
    },
    guildSearchMessageEmpty: state => {
      state.searchError = false
      state.searchLoading = false
      state.searchMessage = `Попробуйте поискать гильдию \n по другим буквам`
    },
  }
})
