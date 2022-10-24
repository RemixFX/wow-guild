import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEvents } from "../../models/eventsModel";


export interface ScheduleState {
  events: IEvents[];
  loading: boolean;
  error: boolean;
}

const initialState: ScheduleState = {
  events: [
    {
      date: '' as unknown as Date,
      name: 'ИВК 25',
      raidLeader: 'Remix',
      time: '19:30'
    },
    {
      date: '' as unknown as Date,
      name: 'Магик',
      raidLeader: 'Ximer',
      time: '16:00'
    },
  ],
  loading: false,
  error: false,
}

export const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    eventsFetching: state => {
      state.events = []
      state.loading = true
      state.error = false
    },
    eventsFetchingSuccess: (state, action: PayloadAction<IEvents[]>) => {
      state.events = action.payload
      state.loading = true
      state.error = false
    },
    eventsFetchingError: state => {
      state.events = []
      state.loading = false
      state.error = true
    }
  }
})
