import { IPlayer } from "../../models/playerModel"
import { sirusApi } from "../../utils/Api"
import { AppDispatch } from "../store"
import { playerSlice } from "./playerSlice"

export const fetchPlayers = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(playerSlice.actions.playersFetching())
    const response = await sirusApi.getUsers()
    const players: IPlayer[] = response.members;
    dispatch(playerSlice.actions.playersFetchingSuccess(
      players.sort((prev, next) => prev.pivot.rank - next.pivot.rank)
      ))
  } catch (error: any) {
    dispatch(playerSlice.actions.playersFetchingError(true))
  }
}
