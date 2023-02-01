import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBrackets } from "../../models/bracketsModel";

 interface BracketsSlice {
  brackets: IBrackets
  loading: boolean;
  error: boolean;
  loadingNote: boolean;
  errorLoadingNote: boolean;
}

const initialState: BracketsSlice = {
  brackets: {
    raid25: [],
    raid10: []
  },
  loading: false,
  error: false,
  loadingNote: false,
  errorLoadingNote: false
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
      state.errorLoadingNote = false
    },
    bracketNoteFetchingSuccess: (state, action: PayloadAction<{note: string, raid_id: string, id: string, group_name: string}>) => {
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
      state.errorLoadingNote = false
    },
    bracketNoteFetchingError: state => {
      state.loadingNote = false
      state.errorLoadingNote = true
    },
  }
})
