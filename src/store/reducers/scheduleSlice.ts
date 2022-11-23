import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEvents } from "../../models/eventsModel";


export interface ScheduleState {
  events: IEvents[];
  loading: boolean;
  error: boolean;
  openEventForm: boolean;
  selectedDate: Date | null;
  selectedEvent: IEvents | null;
}

const initialState: ScheduleState = {
  events: [],
  loading: false,
  error: false,
  openEventForm: false,
  selectedDate: null,
  selectedEvent: null
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
      state.loading = false
      state.error = false
    },
    eventsFetchingError: state => {
      state.events = []
      state.loading = false
      state.error = true
    },
    isOpenEventForm: state => {
      state.openEventForm = true;
    },
    iscloseEventForm: state => {
      state.openEventForm = false;
    },
    isSelectedDate: (state, action: PayloadAction<Date | null>) => {
      state.selectedDate = action.payload
    },
    isSelectedEvent: (state, action: PayloadAction<IEvents | null>) => {
      state.selectedEvent = action.payload
    }

  }
})
