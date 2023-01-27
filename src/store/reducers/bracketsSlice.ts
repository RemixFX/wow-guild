import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBrackets } from "../../models/bracketsModel";

 interface BracketsSlice {
  brackets: IBrackets
  loading: boolean;
  error: boolean;
}

const initialState: BracketsSlice = {
  brackets: {
    raid25: [],
    raid10: []
  },
  loading: false,
  error: false
}

export const bracketsSlice = createSlice({
  name: 'brackets',
  initialState,
  reducers: {
    bracketsFetching: state => {
      state.brackets = {
        raid25: [],
        raid10: []
      }
      state.loading = true
      state.error = false
    },
    bracketsFetchingSuccess: (state, action: PayloadAction<IBrackets>) => {
      state.brackets = action.payload
      state.loading = false
      state.error = false
    },
    bracketsFetchingError: state => {
      state.brackets = {
        raid25: [],
        raid10: []
      }
      state.loading = false
      state.error = true
    }
  }
})
