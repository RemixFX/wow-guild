import { IAccount } from "../../models/aсcountModel"
import { IGroupDB, IBracket, IRaid } from "../../models/bracketsModel"
import { IEvents } from "../../models/eventsModel"
import { INews } from "../../models/newsModel"
import { IPlayer } from "../../models/playerModel"
import { ISearchGuild } from "../../models/searchGuild"
import { dbApi, sirusApi } from "../../utils/Api"
import { AppDispatch } from "../store"
import { adminSlice } from "./adminSlice"
import { bracketsSlice } from "./bracketsSlice"
import { newsSlice } from "./newsSlice"
import { OnlineComponentSlice } from "./onlineComponentSlice"
import { playerSlice } from "./playerSlice"
import { scheduleSlice } from "./scheduleSlice"
import { searchSlice } from "./searchSlice"

export const fetchPlayers = (id: number, realmId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(playerSlice.actions.playersFetching())
    const response = await sirusApi.getUsers(id, realmId)
    const players: IPlayer[] = response.members;
    dispatch(playerSlice.actions.getNameGuild(response.name))
    setTimeout(() => {
    dispatch(playerSlice.actions.playersFetchingSuccess(players))
    }, 1000)
    dispatch(playerSlice.actions.playersSortbyRank())
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

export const fetchGuild = (searchWord: string, realmId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(searchSlice.actions.guildFetching())
    const response = await sirusApi.searchPlaceholder(searchWord.split(' ')[0], realmId)
    let guilds: ISearchGuild[] = []
    response.forEach((data: any) => {
      if (data.type === "guild") {
        guilds = data.items
      }
      else guilds = []
    })
    dispatch(searchSlice.actions.guildFetchingSuccess(guilds))
  } catch (error: any) {
    dispatch(searchSlice.actions.guildFetchingError())
  }
}

export const fetchBrackets = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(bracketsSlice.actions.bracketsFetching())
    const response: IGroupDB[] = await dbApi.getBrackets();
    const newBracket = {raid25: [] as IBracket[], raid10: [] as IBracket[]};
    const groupedBrackets: IRaid = {};
    for (const bracket of response) {
        if (!groupedBrackets[bracket.raid_id]) {
            groupedBrackets[bracket.raid_id] = {};
        }
        if (!groupedBrackets[bracket.raid_id][bracket.group_name]) {
            groupedBrackets[bracket.raid_id][bracket.group_name] = [];
        }
        groupedBrackets[bracket.raid_id][bracket.group_name].push(bracket);
    }
    Object.entries(groupedBrackets).forEach(([raidID, raid]) => {
      if (Object.values(raid).length > 2) {
        newBracket.raid25.push({raidID, raid})
      } else {
        newBracket.raid10.push({raidID, raid})
      }
    });
    dispatch(bracketsSlice.actions.bracketsFetchingSuccess(newBracket))
  } catch (error: any) {
    dispatch(bracketsSlice.actions.bracketsFetchingError())
  }
}

export const fetchChangeNote = (note: string, playerID: string, raidID: string, ) => async (dispatch: AppDispatch) => {
  try {
    dispatch(bracketsSlice.actions.bracketNoteFetching());
    const response = await dbApi.changeNote(note, playerID, raidID);
    setTimeout(() => {
      dispatch(bracketsSlice.actions.bracketNoteFetchingSuccess(response))
    }, 1000)

  } catch (error: any) {
    dispatch(bracketsSlice.actions.bracketNoteFetchingError())
    console.log(error)
  }
}

export const fetchServerNews = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(newsSlice.actions.isFetchingServerNews());
    const response: INews[] = await dbApi.getMessages();
    setTimeout(() => {
      dispatch(newsSlice.actions.isSuccessFetchingServerNews(response))
    }, 1000)

  } catch (error: any) {
    dispatch(newsSlice.actions.isErrorFetchingServerNews({isError: true, message: error.message}))
    console.log(error)
  }
}

