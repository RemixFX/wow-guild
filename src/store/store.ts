import { configureStore } from "@reduxjs/toolkit";
import { OnlineComponentSlice } from "./reducers/onlineComponentSlice";
import { playerSlice } from './reducers/playerSlice';

export const store = configureStore({
  reducer: {
    player: playerSlice.reducer,
    online: OnlineComponentSlice.reducer
  }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
