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

  } catch (error: any) {
    dispatch(scheduleSlice.actions.eventsFetchingError({isError: true, message: error.message}))
  }
}

export const fetchCreateEvents = (event: IEvents) => async (dispatch: AppDispatch) => {
  try {
    dispatch(scheduleSlice.actions.eventFetching());
    const response = await dbApi.postEvent(event);

    setTimeout(() => {
      dispatch(scheduleSlice.actions.createEventFetchingSuccess(response))
    }, 1000)

  } catch (error: any) {
    dispatch(scheduleSlice.actions.eventFetchingError({isError: true, message: error.message}))
  }
}

export const fetchChangeEvents = (event: IEvents) => async (dispatch: AppDispatch) => {
  try {
    dispatch(scheduleSlice.actions.eventFetching());
    const response = await dbApi.changeEvent(event);

    setTimeout(() => {
      dispatch(scheduleSlice.actions.changeEventFetchingSuccess(response))
    }, 1000)

  } catch (error: any) {
    dispatch(scheduleSlice.actions.eventFetchingError({isError: true, message: error.message}))
  }
}

export const fetchDeleteEvents = (id: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch(scheduleSlice.actions.eventFetching());
    const response = await dbApi.deleteEvent(id);

    setTimeout(() => {
      dispatch(scheduleSlice.actions.deleteEventFetchingSuccess(response.id))
    }, 1000)

  } catch (error: any) {
    dispatch(scheduleSlice.actions.eventFetchingError({isError: true, message: error.message}))
  }
}

export const fetchLogin = (value: IAccount) => async (dispatch: AppDispatch) => {
  try {
    dispatch(adminSlice.actions.isFetchingForm())
    const response = await dbApi.login(value)

    setTimeout(() => {
      dispatch(adminSlice.actions.isSucessFetchingLoginForm(response.name))
    }, 1000)

  } catch (error: any) {
    dispatch(adminSlice.actions.isErrorFetchingForm({ isError: true, message: error.message }))
  }
}

export const fetchRegister = (value: IAccount) => async (dispatch: AppDispatch) => {
  try {
    dispatch(adminSlice.actions.isFetchingForm())
    const response = await dbApi.createUser(value)

    setTimeout(() => {
      dispatch(adminSlice.actions.isSucessFetchingRegisterForm(response.message))
    }, 1000)

  } catch (error: any) {
    dispatch(adminSlice.actions.isErrorFetchingForm({ isError: true, message: error.message }))
  }
}

export const fetchLogout = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(adminSlice.actions.isFetchingForm())
    const response = await dbApi.logout()

    setTimeout(() => {
      dispatch(adminSlice.actions.isSucessFetchingLogout(response.message))
    }, 1000)

  } catch (error: any) {
    dispatch(adminSlice.actions.isErrorFetchingForm({ isError: true, message: error.message }))
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
    dispatch(searchSlice.actions.guildFetchingError({isError: true, message: 'Сервер не доступен'}))
  }
}

export const fetchBrackets = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(bracketsSlice.actions.bracketsFetching())
    const response: IGroupDB[] = await dbApi.getBrackets();
    const newBracket = { raid25: [] as IBracket[], raid10: [] as IBracket[] };
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
      const raidName = Object.values(raid)[0][0].raid_name
      if (Object.keys(raid).length > 2) {
        newBracket.raid25.push({ raidID, raidName: raidName, raid })
      } else {
        newBracket.raid10.push({ raidID, raidName: raidName, raid })
      }
    });
    dispatch(bracketsSlice.actions.bracketsFetchingSuccess(newBracket))
  } catch (error: any) {
    dispatch(bracketsSlice.actions.bracketsFetchingError())
    console.log(error)
  }
}

export const fetchDeleteBracket = (id: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(bracketsSlice.actions.deleteBracketFetching())
    const response: string = await dbApi.deleteBracket(id)
    dispatch(bracketsSlice.actions.deleteBracketFetchingSuccess(response))
  } catch  (error: any ) {
    dispatch(bracketsSlice.actions.deleteBracketFetchingError({isError: true, message: error.message}))
    console.log(error)
  }
}

export const fetchChangeNameBracket = (raidName: string, raidID: string) => (dispatch: AppDispatch) => {
  try {
    dispatch(bracketsSlice.actions.bracketNameFetching());
    dbApi.changeNameBracket(raidName, raidID);
  } catch (error: any) {
    dispatch(bracketsSlice.actions.bracketNameFetchingError({isError: true, message: error.message}))
    console.log(error)
  }
}

export const fetchChangeNote = (note: string, playerID: string, raidID: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(bracketsSlice.actions.bracketNoteFetching());
    const response = await dbApi.changeNote(note, playerID, raidID);
    console.log(response)
    setTimeout(() => {
      dispatch(bracketsSlice.actions.bracketNoteFetchingSuccess(response))
    }, 1000)
  } catch (error: any) {
    dispatch(bracketsSlice.actions.bracketNoteFetchingError({isError: true, message: error.message}))
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
    dispatch(newsSlice.actions.isErrorFetchingServerNews({ isError: true, message: 'Ошибка сервера. Не удалось загрузить новости' }))
    console.log(error)
  }
}

export const fetchGuildNews = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(newsSlice.actions.isFetchingGuildNews());
    const response: INews[] = await dbApi.getGuildMessages();
    setTimeout(() => {
      dispatch(newsSlice.actions.isSuccessFetchingGuildNews(response))
    }, 1000)
  } catch (error: any) {
    dispatch(newsSlice.actions.isErrorFetchingGuildNews({ isError: true, message: error.message }))
    console.log(error)
  }
}

export const postNewsGuild = (content: string, owner: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(newsSlice.actions.isFetchingPostGuildNews())
    const response: INews = await dbApi.postGuildMessage(content, owner);
    setTimeout(() => {
    dispatch(newsSlice.actions.isSucessFetchingPostGuildNews(response))
    dispatch(newsSlice.actions.isClosingForm())
  }, 1000)
  } catch (error: any) {
    dispatch(newsSlice.actions.isErrorFetchingPostGuildNews({ isError: true, message: error.message }))
    dispatch(newsSlice.actions.isClosingForm())
    setTimeout(() => {
    dispatch(newsSlice.actions.resetError())
  }, 5000)
    console.log(error)
  }
}

export const fetchDeleteGuildNews = (id: number) => async (dispatch: AppDispatch) => {
  try {
    const response = await dbApi.deleteGuildMessage(id)
    dispatch(newsSlice.actions.isSucessDeleteGuildNews(response))
  }
  catch (error: any) {
    dispatch(newsSlice.actions.isErrorDeleteGuildNews({ isError: true, message: error.message }))
    setTimeout(() => {
    dispatch(newsSlice.actions.resetError())
  }, 5000)
    console.log(error)
  }
}

