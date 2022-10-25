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

  getUsers() {
    return fetch(`${this._url}/guilds/57/506`, {
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

  getEvents() {
    return fetch(`${this._url}/events`, {
      method: 'GET',
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  postEvent(date: Date, name: string, raidleader: string, time: string) {
    return fetch(`${this._url}/events`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        date,
        name,
        raidleader,
        time
      })
    })
      .then(this._checkResponse);
  }

  changeEvent(id: number) {
    return fetch(`${this._url}/events/${id}`, {
      method: 'PUT',
      headers: this._headers
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

const dbApi = new Api({
  url: "http://localhost:3001",
   //url: "https://wow-guild.herokuapp.com",
  headers: headers
});

export {sirusApi, dbApi};
