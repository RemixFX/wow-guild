import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPlayer } from "../../models/playerModel";

export interface PlayerState {
  players: IPlayer[];
  onlinePlayers: IPlayer[];
  constructorPlayers: IPlayer[];
  loading: boolean;
  error: boolean;
  textOnline: string;
  noOnline: boolean;
  markSortbyRank: boolean;
  markSortbyIlvl: boolean;
  markSortbyName: boolean;
  markSortbyClass: boolean;
  markSortbyRace: boolean;
}

const initialState: PlayerState = {
  players: [],
  onlinePlayers: [],
  constructorPlayers: [],
  loading: false,
  error: false,
  textOnline: 'Список игроков',
  noOnline: false,
  markSortbyRank: false,
  markSortbyIlvl: false,
  markSortbyName: false,
  markSortbyClass: false,
  markSortbyRace: false,
}
const sortByRank = (players: IPlayer[]) => {
  return players.sort((a, b) => a.pivot.rank - b.pivot.rank)
}

const sortByIlvl = (players: IPlayer[]) => {
  return players.sort((a, b) => b.equipment_lvl.avgItemLevel - a.equipment_lvl.avgItemLevel)
}

const sortByName = (players: IPlayer[]) => {
  return players.sort((a, b) => {
    return a.name === b.name ? 0 : a.name > b.name ? 1 : -1;
  })
}

const sortByClass = (players: IPlayer[]) => {
  return players.sort((a, b) => {
    return a.class_name === b.class_name ? 0 : a.class_name > b.class_name ? 1 : -1;
  })
}

const sortByRace = (players: IPlayer[]) => {
  return players.sort((a, b) => {
    return a.race_name === b.race_name ? 0 : a.race_name > b.race_name ? 1 : -1;
  })
}

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    playersFetching: state => {
      state.players = []
      state.onlinePlayers = []
      state.constructorPlayers = []
      state.loading = true
      state.error = false
      state.textOnline = ''
      state.noOnline = false
    },
    playersFetchingSuccess: (state, action: PayloadAction<IPlayer[]>) => {

      state.players = action.payload
      state.onlinePlayers = action.payload.filter((p)=> p.online === 1)
      state.constructorPlayers = action.payload
      state.loading = false
      state.error = false
      state.textOnline = state.onlinePlayers.length === 0 ? 'Нет никого онлайн'
      : 'Список игроков'
      state.noOnline = state.onlinePlayers.length === 0 && true
    },
    playersFetchingError: state => {
      state.players = []
      state.onlinePlayers = []
      state.constructorPlayers = []
      state.loading = false
      state.error = true
      state.textOnline = 'Сервер не отвечает'
      state.noOnline = false
    },
    playersChange: (state, action: PayloadAction<IPlayer[]>) => {
      state.constructorPlayers = action.payload
      state.loading = false
      state.error = false
    },
    playersSortbyRank: state => {
      state.players =  sortByRank(state.players)
      state.onlinePlayers = sortByRank(state.onlinePlayers)
      state.constructorPlayers = sortByRank(state.constructorPlayers)
      state.markSortbyRank = true
      state.markSortbyIlvl = false
      state.markSortbyName = false
      state.markSortbyClass = false
      state.markSortbyRace = false
    },
    playersSortbyIlvl: (state, action: PayloadAction<string>) => {
      state.players = action.payload === 'players' ? sortByIlvl(state.players) : state.players
      state.onlinePlayers = sortByIlvl(state.onlinePlayers)
      state.constructorPlayers = action.payload === 'constructor_players' ? sortByIlvl(state.constructorPlayers) : state.constructorPlayers
      state.markSortbyRank = false
      state.markSortbyIlvl = true
      state.markSortbyName = false
      state.markSortbyClass = false
      state.markSortbyRace = false
    },
    playersSortbyName: (state, action: PayloadAction<string>) => {
      state.players = action.payload === 'players' ? sortByName(state.players) : state.players
      state.onlinePlayers = sortByName(state.onlinePlayers)
      state.constructorPlayers = action.payload === 'constructor_players' ? sortByName(state.constructorPlayers) : state.constructorPlayers
      state.markSortbyRank = false
      state.markSortbyIlvl = false
      state.markSortbyName = true
      state.markSortbyClass = false
      state.markSortbyRace = false
    },
    playersSortbyClass: (state, action: PayloadAction<string>) => {
      state.players = action.payload === 'players' ? sortByClass(state.players) : state.players
      state.onlinePlayers = sortByClass(state.onlinePlayers)
      state.constructorPlayers = action.payload === 'constructor_players' ? sortByClass(state.constructorPlayers) : state.constructorPlayers
      state.markSortbyRank = false
      state.markSortbyIlvl = false
      state.markSortbyName = false
      state.markSortbyClass = true
      state.markSortbyRace = false
    },
    playersSortbyRace: (state, action: PayloadAction<string>) => {
      state.players = action.payload === 'players' ? sortByRace(state.players) : state.players
      state.onlinePlayers = sortByRace(state.onlinePlayers)
      state.constructorPlayers = action.payload === 'constructor_players' ? sortByRace(state.constructorPlayers) : state.constructorPlayers
      state.markSortbyRank = false
      state.markSortbyIlvl = false
      state.markSortbyName = false
      state.markSortbyClass = false
      state.markSortbyRace = true
    }
  }
})

