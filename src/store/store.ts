import { configureStore } from "@reduxjs/toolkit";
import { adminSlice } from "./reducers/adminSlice";
import { bracketsSlice } from "./reducers/bracketsSlice";
import { OnlineComponentSlice } from "./reducers/onlineComponentSlice";
import { playerSlice } from './reducers/playerSlice';
import { scheduleSlice } from "./reducers/scheduleSlice";
import { searchSlice } from "./reducers/searchSlice";

export const store = configureStore({
  reducer: {
    player: playerSlice.reducer,
    online: OnlineComponentSlice.reducer,
    admin: adminSlice.reducer,
    schedule: scheduleSlice.reducer,
    search: searchSlice.reducer,
    brackets: bracketsSlice.reducer
  }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
