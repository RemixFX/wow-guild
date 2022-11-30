import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPlayer } from "../../models/playerModel";

export interface PlayerState {
  players: IPlayer[];
  onlinePlayers: IPlayer[];
  loading: boolean;
  error: boolean;
  textOnline: string;
  noOnline: boolean;
}

const initialState: PlayerState = {
  players: [],
  onlinePlayers: [],
  loading: false,
  error: false,
  textOnline: 'Список игроков',
  noOnline: false
}

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    playersFetching: state => {
      state.players = []
      state.onlinePlayers = []
      state.loading = true
      state.error = false
      state.textOnline = ''
      state.noOnline = false
    },
    playersFetchingSuccess: (state, action: PayloadAction<IPlayer[]>) => {
      state.players = action.payload
      state.onlinePlayers = action.payload.filter((p)=> p.online === 1)
      state.loading = false
      state.error = false
      state.textOnline = state.onlinePlayers.length === 0 ? 'Нет никого онлайн'
      : 'Список игроков'
      state.noOnline = state.onlinePlayers.length === 0 && true
    },
    playersFetchingError: state => {
      state.players = []
      state.onlinePlayers = []
      state.loading = false
      state.error = true
      state.textOnline = 'Сервер не отвечает'
      state.noOnline = false
    },
    playersSortbyName: state => {
      state.players = state.players.sort((a, b) => {
        if (a.name > b.name) {
          return 1
        }
        if (a.name < b.name) {
          return -1
        }
        return 0
      })
    },
    playersSortbyClass: state => {
      state.players = state.players.sort((a, b) => {
        if (a.class_name > b.class_name) {
          return 1
        }
        if (a.class_name < b.class_name) {
          return -1
        }
        return 0
      })
    }
  }
})

