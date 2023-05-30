class Api {
  constructor({ address, headers }) {
    this.baseUrl = address;
    this.headers = headers;
  }

  _checkResponse(res) {
    console.log("res del api check response ", res);
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error getting user data: ${res.status},
      ${res.statusText}`);
  }

  getInitialCards(token) {
    console.log('api getinicards token', token);
    return fetch(`${this.baseUrl}/cards`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(this._checkResponse)
      .catch((err) => console.log(err));
  }

  getUserInfo(token) {
    console.log('api getuserinfo', token);
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(this._checkResponse)
      .catch((err) => console.log(err));
  }

  postUserInfo(name, about, token) {
    console.log('api postinfo ', name, about, token);
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    })
      .then(this._checkResponse)
      .catch((err) => console.log(err));
  }

  postUserAvatar(link, token) {
    console.log('api avatar ', link, token);
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        avatar: link,
      }),
    })
      .then(this._checkResponse)
      .catch((err) => console.log(err));
  }

  postCard(name, link, token) {
    console.log('api de postcard ', name, link, token);
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        link,
      }),
    })
      .then(this._checkResponse)
      .catch((err) => console.log(err));
  }

  changeLikeCardStatus(cardId, isLiked, token) {
    console.log('api card stat ', cardId,isLiked,token);
    if (isLiked) {
      return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res)=>this._checkResponse(res))
        .catch((err) => console.log(err));
    } else {
      return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res)=>this._checkResponse(res))
      .catch((err) => console.log(err));
    }
  }

  deleteCard(cardId, token) {
    console.log('api delete card ', cardId, token);
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
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
    Authorization: '04346056-dea4-4d40-8541-43203e80bf1',
    'Content-Type': 'application/json',
  },
});

export default api;
