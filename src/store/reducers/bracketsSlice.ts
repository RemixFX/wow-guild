import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBrackets } from "../../models/bracketsModel";
import { IError } from "../../models/globalError";

interface BracketsSlice {
  brackets: IBrackets
  loading: boolean;
  error: boolean;
  loadingNote: boolean;
  castomError: IError;
}

const initialState: BracketsSlice = {
  brackets: {
    raid25: [],
    raid10: []
  },
  loading: false,
  error: false,
  loadingNote: false,
  castomError: { isError: false, message: '' },
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
    },
    bracketNoteFetching: state => {
      state.loadingNote = true
      state.castomError = { isError: false, message: '' }
    },
    bracketNoteFetchingSuccess: (state, action: PayloadAction<{ note: string, raid_id: string, id: string, group_name: string }>) => {
      state.brackets.raid10 = state.brackets.raid10.map((raid) => {
        if (raid.raidID === action.payload.raid_id) {
          raid.raid[action.payload.group_name].map((player) => {
            if (player.id === action.payload.id) {
              return player.note = action.payload.note
            }
            return player
          })
        }
        return raid
      });
      state.brackets.raid25 = state.brackets.raid25.map((raid) => {
        if (raid.raidID === action.payload.raid_id) {
          raid.raid[action.payload.group_name].map((player) => {
            if (player.id === action.payload.id) {
              return player.note = action.payload.note
            }
            return player
          })
        }
        return raid
      });
      state.loadingNote = false
      state.castomError = { isError: false, message: '' }
    },
    bracketNoteFetchingError: (state, action: PayloadAction<IError>) => {
      state.loadingNote = false
      state.castomError = action.payload
    },
    deleteBracketFetching: state => {
      state.castomError = { isError: false, message: ''}
    },
    deleteBracketFetchingSuccess: (state, action: PayloadAction<string>) => {
      state.brackets.raid25 = state.brackets.raid25.filter((raid) => raid.raidID !== action.payload)
      state.brackets.raid10 = state.brackets.raid10.filter((raid) => raid.raidID !== action.payload)
    },
    deleteBracketFetchingError: (state, action: PayloadAction<IError>) => {
      state.castomError = action.payload
    },
    bracketNameFetching: state => {
      state.castomError = { isError: false, message: ''}
    },
    bracketNameFetchingError: (state, action: PayloadAction<IError>) => {
      state.castomError = action.payload
    }
  }
})
