import { IEvents } from "../../models/eventsModel"
import { IPlayer } from "../../models/playerModel"
import { dbApi, sirusApi } from "../../utils/Api"
import { AppDispatch } from "../store"
import { OnlineComponentSlice } from "./onlineComponentSlice"
import { playerSlice } from "./playerSlice"
import { scheduleSlice } from "./scheduleSlice"

export const fetchPlayers = () => async (dispatch: AppDispatch) => {
  try {

    dispatch(playerSlice.actions.playersFetching())
    const response = await sirusApi.getUsers()
    const players: IPlayer[] = response.members;
    dispatch(playerSlice.actions.playersFetchingSuccess(
      players.sort((prev, next) => prev.pivot.rank - next.pivot.rank)
      ))
  } catch (error: any) {
    dispatch(playerSlice.actions.playersFetchingError())
    setTimeout(() => dispatch(OnlineComponentSlice.actions.hideOnline()), 700)
  }
}

export const fetchEvents = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(scheduleSlice.actions.eventsFetching());
    const response = await dbApi.getEvents();

    const events: IEvents[] = response;
    dispatch(scheduleSlice.actions.eventsFetchingSuccess(events))
  } catch (error) {
    dispatch(scheduleSlice.actions.eventsFetchingError())
  }
}
