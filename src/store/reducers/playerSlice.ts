import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPlayer } from "../../models/playerModel";

export interface PlayerState {
  players: IPlayer[];
  onlinePlayers: IPlayer[];
  loading: boolean;
  error: boolean;
  textOnline: string;
}

const initialState: PlayerState = {
  players: [],
  onlinePlayers: [],
  loading: false,
  error: false,
  textOnline: 'Список игроков'
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
    },
    playersFetchingSuccess: (state, action: PayloadAction<IPlayer[]>) => {
      state.players = action.payload
      state.onlinePlayers = action.payload.filter((p)=> p.online === 1)
      state.loading = false
      state.error = false
      state.textOnline = state.onlinePlayers.length === 0 ? 'Нет игроков онлайн'
      : 'Список игроков'
    },
    playersFetchingError: (state, action: PayloadAction<boolean>) => {
      state.players = []
      state.onlinePlayers = []
      state.loading = false
      state.error = action.payload
      state.textOnline = 'Нет ответа от сервера'
    }

  }
})

