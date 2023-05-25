export const BASE_URL = 'https://api.aldo.desarrollointerno.com';

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.error) {
        throw new Error(data.error);
      }
    });
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      console.log('data del auth 1  ', res);
      if(res.ok){
        return res.json();
      }
      throw new Error(res.error)
    })
    .then((data) => {
      localStorage.setItem('jwt', data.token);
      console.log('data del auth 2  ', data);
      return Promise.resolve(data.token);
    });
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => data);
};
