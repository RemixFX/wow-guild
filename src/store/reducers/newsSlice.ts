import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IError } from "../../models/globalError";
import { INews } from "../../models/newsModel";

interface NewsState {
  serverNews: INews[];
  guildNews: INews[];
  loadingServerNews: boolean;
  loadingGuildNews: boolean;
  loadingPostGuildNews: boolean;
  isOpenForm: boolean;
  errorForSlider: IError;
  errorServerNews: IError;
  errorGuildNews: IError;
}

const initialState: NewsState = {
  serverNews: [],
  guildNews: [],
  loadingServerNews: false,
  loadingGuildNews: false,
  loadingPostGuildNews: false,
  isOpenForm: false,
  errorServerNews: { isError: false, message: '' },
  errorGuildNews: { isError: false, message: '' },
  errorForSlider: { isError: false, message: '' }
}

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    isFetchingServerNews: state => {
       state.serverNews = []
       state.loadingServerNews = true
       state.errorServerNews = { isError: false, message: '' }
       state.errorForSlider = { isError: false, message: '' }
    },
    isFetchingGuildNews: state => {
      state.guildNews = []
      state.loadingGuildNews = true
      state.errorGuildNews = { isError: false, message: '' }
      state.errorForSlider = { isError: false, message: '' }
   },
   isSuccessFetchingServerNews: (state, action: PayloadAction<INews[]>) => {
    state.serverNews = action.payload.reverse()
    state.loadingServerNews = false
    state.errorServerNews = { isError: false, message: '' }
    state.errorForSlider = { isError: false, message: '' }
 },
 isSuccessFetchingGuildNews: (state, action: PayloadAction<INews[]>) => {
   state.guildNews = action.payload.reverse()
   state.loadingGuildNews = false
   state.errorGuildNews = { isError: false, message: '' }
   state.errorForSlider = { isError: false, message: '' }
},
isErrorFetchingServerNews: (state, action: PayloadAction<IError>) => {
  state.serverNews = []
  state.loadingServerNews = false
  state.errorServerNews = action.payload
  state.errorForSlider = { isError: false, message: '' }
},
isErrorFetchingGuildNews: (state, action: PayloadAction<IError>) => {
  state.guildNews = []
  state.loadingGuildNews = false
  state.errorGuildNews = action.payload
  state.errorForSlider = { isError: false, message: '' }
},
isFetchingPostGuildNews: state => {
  state.loadingPostGuildNews = true
  state.errorForSlider = { isError: false, message: '' }
},
isSucessFetchingPostGuildNews: (state, action: PayloadAction<INews>) => {
  state.guildNews.unshift(action.payload)
  state.loadingPostGuildNews = false
  state.errorForSlider = { isError: false, message: '' }
},
isErrorFetchingPostGuildNews: (state, action: PayloadAction<IError>) => {
  state.loadingPostGuildNews = false
  state.errorForSlider = action.payload
},
isOpeningForm: state => {
  state.isOpenForm = true
},
isClosingForm: state => {
  state.isOpenForm = false
},
isSucessDeleteGuildNews: (state, action: PayloadAction<number>) => {
  state.guildNews = state.guildNews.filter((news) => news.id !== action.payload)
  state.errorForSlider = { isError: false, message: '' }
},
isErrorDeleteGuildNews: (state, action: PayloadAction<IError>) => {
  state.errorForSlider = action.payload
},
resetError: state => {
  state.errorForSlider = { isError: false, message: '' }
}

  }
})
