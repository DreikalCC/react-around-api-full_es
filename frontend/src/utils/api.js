const { TEST_URL } = process.env;

class Api {
  constructor({ address, headers }) {
    this.baseUrl = address;
    this.headers = headers;
    //this.auth = this.headers.authorization;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error getting user data: ${res.status},
      ${res.statusText}`);
  }

  getInitialCards(token) {
    return fetch(`${this.baseUrl}/cards`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(this._checkResponse)
      .catch((err) => console.log(err));
  }

  getUserInfo(token) {
    console.log('api getuserinfo token', token);
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(this._checkResponse)
      .catch((err) => console.log(err));
  }

  postUserInfo(name, about, token) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: `Bearer ${token}`,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    })
      .then(this._checkResponse)
      .catch((err) => console.log(err));
  }

  postUserAvatar(link, token) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: `Bearer ${token}`,
      body: JSON.stringify({
        avatar: link,
      }),
    })
      .then(this._checkResponse)
      .catch((err) => console.log(err));
  }

  postCard(name, link, token) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: `Bearer ${token}`,
      body: JSON.stringify({
        name,
        link,
      }),
    })
      .then(this._checkResponse)
      .catch((err) => console.log(err));
  }

  changeLikeCardStatus(cardId, isLiked, token) {
    if (isLiked) {
      return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: `Bearer ${token}`,
        body: JSON.stringify({}),
      })
        .then(this._checkResponse)
        .catch((err) => console.log(err));
    } else {
      return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: `Bearer ${token}`,
        body: JSON.stringify({}),
      })
        .then(this._checkResponse)
        .catch((err) => console.log(err));
    }
  }

  deleteCard(cardId, token) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: `Bearer ${token}`,
      body: JSON.stringify({}),
    })
      .then(this._checkResponse)
      .catch((err) => console.log(err));
  }
}

const api = new Api({
  address: 'http://localhost:3001',
  token: '04346056-dea4-4d40-8541-43203e80bf1',
  headers: {
    authorization: '04346056-dea4-4d40-8541-43203e80bf1',
    'Content-Type': 'application/json',
  },
});

export default api;
