class Api {
  private _url: any;
  private _headers: any;
  constructor(options: { url: any; headers: any; }) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _checkResponse(res: { ok: any; json: () => Promise<any>; }) {
    if (res.ok) {
      return res.json();
    }
    return res.json().then((message: any) => Promise.reject(message))
  }

  getUsers() {
    return fetch(`${this._url}/guilds/57/862`, {
      method: 'GET',
//      credentials: 'include',
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  getMessages() {
    return fetch(`${this._url}/discord`, {
      method: 'GET',
//      credentials: 'include',
      headers: this._headers
    })
      .then(this._checkResponse);
  }
}

const sirusApi = new Api({
  url: "https://api.sirus.su/api/base",
  headers: {
    'Accept': 'application/json',
    "Content-type": "application/json"
  }
});

const dbApi = new Api({
  url: "http://localhost:3001",
   //url: "https://wow-guild.herokuapp.com",
  headers: {
    'Accept': 'application/json',
    "Content-type": "application/json"
  }
});

export {sirusApi, dbApi};
