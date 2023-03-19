import { IAccount } from "../models/aсcountModel";
import { IEvents } from "../models/eventsModel";

class Api {
  private _url: string;
  private _headers;
  constructor(options: { url: string; headers: Headers; }) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _checkResponse<T>(res: { ok: boolean; json: () => Promise<T>; }) {
    if (res.ok) {
      return res.json() as Promise<T>
    }
    return res.json().then((message) => Promise.reject(message))
  }

  getUsers(id: number, realmId: string) {
    return fetch(`${this._url}/guilds/${realmId}/${id}`, {
      method: 'GET',
      //      credentials: 'include',
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  getMessages() {
    return fetch(`${this._url}/discord`, {
      method: 'GET',
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  postGuildMessage(content: string, owner: string) {
    return fetch(`${this._url}/news`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({ content, owner })
    })
      .then(this._checkResponse);
  }

  getGuildMessages() {
    return fetch(`${this._url}/news`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include'
    })
      .then(this._checkResponse);
  }

  deleteGuildMessage(id: number) {
    return fetch(`${this._url}/news/${id}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    })
      .then(this._checkResponse);
  }

  getEvents() {
    return fetch(`${this._url}/events`, {
      method: 'GET',
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  postEvent(event: IEvents) {
    return fetch(`${this._url}/events`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        date: event.date.toDateString(),
        name: event.name,
        raidleader: event.raidleader,
        time: event.time
      })
    })
      .then(this._checkResponse);
  }

  changeEvent(event: IEvents) {
    return fetch(`${this._url}/events/${event.id}`, {
      method: 'PUT',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        date: event.date.toDateString(),
        name: event.name,
        raidleader: event.raidleader,
        time: event.time
      })
    })
      .then(this._checkResponse);
  }

  deleteEvent(id: number) {
    return fetch(`${this._url}/events/${id}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    })
      .then(this._checkResponse);
  }

  createUser(user: IAccount) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: user.name,
        password: user.password
      })
    })
      .then(this._checkResponse);
  }

  login(user: IAccount) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: user.name,
        password: user.password
      })
    })
      .then(this._checkResponse);
  }

  getUserData() {
    return fetch(`${this._url}/me`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  logout = () => {
    return fetch(`${this._url}/signout`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  searchPlaceholder = (word: string, realmId: string) => {
    return fetch(`${this._url}/search?search=${word}&realm_id=${realmId}`, {
      method: 'GET',
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  getBrackets() {
    return fetch(`${this._url}/brackets`, {
      method: 'GET',
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  postBracket(bracket: any) {
    return fetch(`${this._url}/brackets`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify(bracket)
    })
      .then(this._checkResponse);
  }

  deleteBracket(id: string) {
    return fetch(`${this._url}/bracket/${id}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    })
      .then(this._checkResponse);
  }

  changeNameBracket(raidName: string, raidID: string) {
    return fetch(`${this._url}/update`, {
      method: 'PUT',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({ raidName, raidID })
    })
      .then(this._checkResponse);
  }

  changeNote(note: string, playerID: string, raidID: string) {
    return fetch(`${this._url}/update-note`, {
      method: 'PUT',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({ note, playerID, raidID })
    })
      .then(this._checkResponse);
  }
}

const headers = new Headers(
  [
    ['Accept', 'application/json'],
    ['Content-type', 'application/json']
  ]
)

const sirusApi = new Api({
  url: "https://api.sirus.su/api/base",
  headers: headers
});

//Если сервер запускается локально, использовать "http://localhost:3001"
const dbApi = new Api({
  url: "https://wow-sirus.online/api",
  headers: headers
});

export { sirusApi, dbApi };
