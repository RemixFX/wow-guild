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
  errorServerNews: IError;
  errorGuildNews: IError;
  errorPostGuildNews: IError;
  errorDeleteGuildNews: IError;
}

const initialState: NewsState = {
  serverNews: [],
  guildNews: [],
  loadingServerNews: false,
  loadingGuildNews: false,
  loadingPostGuildNews: false,
  isOpenForm: false,
  errorServerNews: {
    isError: false,
    message: ''
  },
  errorGuildNews: {
    isError: false,
    message: ''
  },
  errorPostGuildNews: {
    isError: false,
    message: ''
  },
  errorDeleteGuildNews: {
    isError: false,
    message: ''
  }
}

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    isFetchingServerNews: state => {
       state.serverNews = []
       state.loadingServerNews = true
       state.errorServerNews = {
        isError: false,
        message: ''
      }
    },
    isFetchingGuildNews: state => {
      state.guildNews = []
      state.loadingGuildNews = true
      state.errorGuildNews = {
       isError: false,
       message: ''
     }
   },
   isSuccessFetchingServerNews: (state, action: PayloadAction<INews[]>) => {
    state.serverNews = action.payload.reverse()
    state.loadingServerNews = false
    state.errorServerNews = {
     isError: false,
     message: ''
   }
 },
 isSuccessFetchingGuildNews: (state, action: PayloadAction<INews[]>) => {
   state.guildNews = action.payload.reverse()
   state.loadingGuildNews = false
   state.errorGuildNews = {
    isError: false,
    message: ''
  }
},
isErrorFetchingServerNews: (state, action: PayloadAction<IError>) => {
  state.serverNews = []
  state.loadingServerNews = false
  state.errorServerNews = action.payload
},
isErrorFetchingGuildNews: (state, action: PayloadAction<IError>) => {
  state.guildNews = []
  state.loadingGuildNews = false
  state.errorGuildNews = action.payload
},
isFetchingPostGuildNews: state => {
  state.loadingPostGuildNews = true
  state.errorPostGuildNews = {
    isError: false,
    message: ''
  }
},
isSucessFetchingPostGuildNews: (state, action: PayloadAction<INews>) => {
  state.guildNews.unshift(action.payload)
  state.loadingPostGuildNews = false
  state.errorPostGuildNews = {
    isError: false,
    message: ''
  }
},
isErrorFetchingPostGuildNews: (state, action: PayloadAction<IError>) => {
  state.loadingPostGuildNews = false
  state.errorPostGuildNews = action.payload
},
isOpeningForm: state => {
  state.isOpenForm = true
},
isClosingForm: state => {
  state.isOpenForm = false
},
isSucessDeleteGuildNews: (state, action: PayloadAction<number>) => {
  state.guildNews = state.guildNews.filter((news) => news.id !== action.payload)
  state.errorDeleteGuildNews = {
    isError: false,
    message: ''
  }
},
isErrorDeleteGuildNews: (state, action: PayloadAction<IError>) => {
  state.errorDeleteGuildNews = action.payload
},
resetError: state => {
  state.errorPostGuildNews = {
    isError: false,
    message: ''
  }
  state.errorDeleteGuildNews = {
    isError: false,
    message: ''
  }
}

  }
})
