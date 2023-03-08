import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEvents } from "../../models/eventsModel";
import { IError } from "../../models/globalError";


export interface ScheduleState {
  events: IEvents[];
  loading: boolean;
  loadingEvent: boolean;
  error: IError;
  errorForm : IError;
  openEventForm: boolean;
  selectedDate: Date | null;
  selectedEvent: IEvents | null;
}

const initialState: ScheduleState = {
  events: [],
  loading: false,
  loadingEvent: false,
  error: { isError: false, message: ''},
  errorForm: { isError: false, message: ''},
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
      state.error = { isError: false, message: ''}
    },
    eventsFetchingSuccess: (state, action: PayloadAction<IEvents[]>) => {
      state.events = action.payload
      state.loading = false
      state.error = { isError: false, message: ''}
    },
    eventsFetchingError: (state, action: PayloadAction<IError>) => {
      state.events = []
      state.loading = false
      state.error = action.payload
    },
    eventFetching: state => {
      state.loadingEvent = true
      state.errorForm = { isError: false, message: ''}
    },
    createEventFetchingSuccess: (state, action: PayloadAction<IEvents>) => {
      state.events = [...state.events, action.payload]
      state.loadingEvent = false
      state.errorForm = { isError: false, message: ''}
      state.openEventForm = false;
    },
    changeEventFetchingSuccess: (state, action: PayloadAction<IEvents>) => {
      state.events = state.events.map(updatedEvent => {
        return updatedEvent.id === action.payload.id ? action.payload : updatedEvent
      })
      state.loadingEvent = false
      state.errorForm = { isError: false, message: ''}
      state.openEventForm = false;
    },
    deleteEventFetchingSuccess: (state, action: PayloadAction<number>) => {
      state.events = state.events.filter(deletedEvent => deletedEvent.id !== action.payload)
      state.loadingEvent = false
      state.errorForm = { isError: false, message: ''}
      state.openEventForm = false;
    },
    eventFetchingError: (state, action: PayloadAction<IError>) => {
      state.loadingEvent = false
      state.errorForm = action.payload
    },
    isOpenEventForm: state => {
      state.openEventForm = true;
    },
    iscloseEventForm: state => {
      state.openEventForm = false;
    }
  }
})
