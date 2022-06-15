class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return res.json().then((message) => Promise.reject(message))
  }

  getUsers() {
    return fetch(`${this._url}/guilds/57/1`, {
      method: 'GET',
//      credentials: 'include',
      headers: this._headers
    })
      .then(this._checkResponse);
  }
}

const api = new Api({
  url: "https://api.sirusq.su/api/base",
  headers: {
    'Accept': 'application/json',
    "Content-type": "application/json"
  }
});

export default api;
