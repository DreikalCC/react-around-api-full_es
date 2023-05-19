class Api {
  constructor({ address, headers }) {
    this.baseUrl = address;
    this.headers = headers;
    this.auth = this.headers.authorization;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error getting user data: ${res.status},
      ${res.statusText}`);
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: {
        authorization: this.auth,
      },
    })
      .then(this._checkResponse)
      .catch((err) => console.log(err));
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: this.auth,
      },
    })
      .then(this._checkResponse)
      .catch((err) => console.log(err));
  }

  postUserInfo(name, about) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    })
      .then(this._checkResponse)
      .catch((err) => console.log(err));
  }

  postUserAvatar(link) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: link,
      }),
    })
      .then(this._checkResponse)
      .catch((err) => console.log(err));
  }

  postCard(name, link) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name,
        link,
      }),
    })
      .then(this._checkResponse)
      .catch((err) => console.log(err));
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: this.headers,
        body: JSON.stringify({}),
      })
        .then(this._checkResponse)
        .catch((err) => console.log(err));
    } else {
      return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: this.headers,
        body: JSON.stringify({}),
      })
        .then(this._checkResponse)
        .catch((err) => console.log(err));
    }
  }

  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers,
      body: JSON.stringify({}),
    })
      .then(this._checkResponse)
      .catch((err) => console.log(err));
  }
}

const api = new Api({
  address: 'http://aldo.desarrollointerno.com/',
  token: '04346056-dea4-4d40-8541-43203e80bf1a',
  headers: {
    authorization: '04346056-dea4-4d40-8541-43203e80bf1a',
    'Content-Type': 'application/json',
  },
});

export default api;
