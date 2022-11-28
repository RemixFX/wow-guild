import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEvents } from "../../models/eventsModel";


export interface ScheduleState {
  events: IEvents[];
  loading: boolean;
  loadingEvent: boolean;
  error: boolean;
  errorEvent : any;
  openEventForm: boolean;
  selectedDate: Date | null;
  selectedEvent: IEvents | null;

}

const initialState: ScheduleState = {
  events: [],
  loading: false,
  loadingEvent: false,
  error: false,
  errorEvent: false,
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
    eventFetching: state => {
      state.loadingEvent = true
      state.error = false
    },
    createEventFetchingSuccess: (state, action: PayloadAction<IEvents>) => {
      state.events = [...state.events, action.payload]
      state.loadingEvent = false
      state.error = false
      state.errorEvent = false
      state.openEventForm = false;
    },
    changeEventFetchingSuccess: (state, action: PayloadAction<IEvents>) => {
      state.events = state.events.map(updatedEvent => {
        return updatedEvent.id === action.payload.id ? action.payload : updatedEvent
      })
      state.loadingEvent = false
      state.error = false
      state.errorEvent = false
      state.openEventForm = false;
    },
    deleteEventFetchingSuccess: (state, action: PayloadAction<number>) => {
      state.events = state.events.filter(deletedEvent => deletedEvent.id !== action.payload)
      state.loadingEvent = false
      state.error = false
      state.errorEvent = false
      state.openEventForm = false;
    },
    eventFetchingError: (state, action: PayloadAction<any>) => {
      state.loadingEvent = false
      state.errorEvent = action.payload
    },
    isOpenEventForm: state => {
      state.openEventForm = true;
    },
    iscloseEventForm: state => {
      state.openEventForm = false;
    }
  }
})
