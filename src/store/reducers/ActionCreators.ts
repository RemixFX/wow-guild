import { IAccount } from "../../models/aсcountModel"
import { IEvents } from "../../models/eventsModel"
import { IPlayer } from "../../models/playerModel"
import { dbApi, sirusApi } from "../../utils/Api"
import { AppDispatch } from "../store"
import { adminSlice } from "./adminSlice"
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
    setTimeout(() => {
      dispatch(scheduleSlice.actions.eventsFetchingSuccess(events))
    }, 1000)

  } catch (error) {
    dispatch(scheduleSlice.actions.eventsFetchingError())
  }
}

export const fetchCreateEvents = (event: IEvents) => async (dispatch: AppDispatch) => {
  try {
    dispatch(scheduleSlice.actions.eventFetching());
    const response = await dbApi.postEvent(event);

    setTimeout(() => {
      dispatch(scheduleSlice.actions.createEventFetchingSuccess(response))
    }, 1000)

  } catch (error: unknown) {
    dispatch(scheduleSlice.actions.eventFetchingError(error))
  }
}

export const fetchChangeEvents = (event: IEvents) => async (dispatch: AppDispatch) => {
  try {
    dispatch(scheduleSlice.actions.eventFetching());
    const response = await dbApi.changeEvent(event);

    setTimeout(() => {
      dispatch(scheduleSlice.actions.changeEventFetchingSuccess(response))
    }, 1000)

  } catch (error: unknown) {
    dispatch(scheduleSlice.actions.eventFetchingError(error))
  }
}

export const fetchDeleteEvents = (id: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch(scheduleSlice.actions.eventFetching());
    const response = await dbApi.deleteEvent(id);

    setTimeout(() => {
      dispatch(scheduleSlice.actions.deleteEventFetchingSuccess(response.id))
    }, 1000)

  } catch (error: unknown) {
    dispatch(scheduleSlice.actions.eventFetchingError(error))
  }
}

export const fetchLogin = (value: IAccount) => async (dispatch: AppDispatch) => {
  try {
    dispatch(adminSlice.actions.isFetchingForm())
    const response = await dbApi.login(value)

    setTimeout(() => {
      dispatch(adminSlice.actions.isSucessFetchingLoginForm(response.name))
    }, 1000)

  } catch (error: unknown) {
    dispatch(adminSlice.actions.isErrorFetchingForm(error))
  }
}

export const fetchRegister = (value: IAccount) => async (dispatch: AppDispatch) => {
  try {
    dispatch(adminSlice.actions.isFetchingForm())
    const response = await dbApi.createUser(value)

    setTimeout(() => {
      dispatch(adminSlice.actions.isSucessFetchingRegisterForm(response.message))
    }, 1000)

  } catch (error: unknown) {
    dispatch(adminSlice.actions.isErrorFetchingForm(error))
  }
}

export const fetchLogout = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(adminSlice.actions.isFetchingForm())
    const response = await dbApi.logout()

    setTimeout(() => {
      dispatch(adminSlice.actions.isSucessFetchingLogout(response.message))
    }, 1000)

  } catch (error: unknown) {
    dispatch(adminSlice.actions.isErrorFetchingForm(error))
  }
}

export const fetchAuthorization = () => async (dispatch: AppDispatch) => {
  try {
    const response = await dbApi.getUserData()
    dispatch(adminSlice.actions.isSucessFetchingLoginForm(response.name))

  } catch (error: unknown) {
    console.log(error)
  }
}
