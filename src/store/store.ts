import { configureStore } from "@reduxjs/toolkit";
import { adminSlice } from "./reducers/adminSlice";
import { OnlineComponentSlice } from "./reducers/onlineComponentSlice";
import { playerSlice } from './reducers/playerSlice';
import { scheduleSlice } from "./reducers/scheduleSlice";

export const store = configureStore({
  reducer: {
    player: playerSlice.reducer,
    online: OnlineComponentSlice.reducer,
    admin: adminSlice.reducer,
    schedule: scheduleSlice.reducer
  }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
