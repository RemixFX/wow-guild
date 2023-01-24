import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBracket } from "../../models/bracketsModel";

export interface IBrackets {
  bracket: IBracket[]
  loading: boolean;
  error: boolean;
}

interface bracket {
  group1:
  {
    title: string,
    players: [
      {
        id: string;
        role?: string;
        name: string;
        class_name: string;
        race: string;
        ilvl?: number | null;
      }
    ]
  },
  group2:
  {
    title: string,
    players: [
      {
        id: string;
        role?: string;
        name: string;
        class_name: string;
        race: string;
        ilvl?: number | null;
      }
    ]
  },
  group3:
  {
    title: string,
    players: [
      {
        id: string;
        role?: string;
        name: string;
        class_name: string;
        race: string;
        ilvl?: number | null;
      }
    ]
  },
  group4:
  {
    title: string,
    players: [
      {
        id: string;
        role?: string;
        name: string;
        class_name: string;
        race: string;
        ilvl?: number | null;
      }
    ]
  },
  group:
  {
    title: string,
    players: [
      {
        id: string;
        role?: string;
        name: string;
        class_name: string;
        race: string;
        ilvl?: number | null;
      }
    ]
  },
}

interface brackets {
  raid: [
    {
      title: string,
      players: [
        {
          id: string;
          role?: string;
          name: string;
          class_name: string;
          race: string;
          ilvl?: number | null;
        }
      ]
    }
  ]
}

const NewBrackets = {
  raid: [
    {
      title: 'Igroup',
      players: [
        {
          id: '1',
          role: 'tank',
          name: 'NAME',
          class_name: 'rouge',
          race: 'orc',
          ilvl: '232'
        },
        {
          id: '2',
          role: 'healer',
          name: 'NAME11',
          class_name: 'rougewar',
          race: 'orcoso',
          ilvl: '121'
        },
        {
          id: '3',
          role: 'damage',
          name: 'NAME',
          class_name: 'clea',
          race: 'deed',
          ilvl: '333'
        }
      ]
    }
  ]
}

const initialState: IBrackets = {
  bracket: [],
  loading: false,
  error: false
}

export const bracketsSlice = createSlice({
  name: 'brackets',
  initialState,
  reducers: {
    bracketsFetching: state => {
      state.bracket = []
      state.loading = true
      state.error = false
    },
    bracketsFetchingSuccess: (state, action: PayloadAction<IBracket[]>) => {
      state.bracket = action.payload
      state.loading = false
      state.error = false
    },
    bracketsFetchingError: state => {
      state.bracket = []
      state.loading = false
      state.error = true
    }
  }
})
