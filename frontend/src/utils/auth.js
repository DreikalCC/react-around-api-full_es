export const BASE_URL = 'http://localhost:3001';

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
  console.log('auth iniciado');
  return fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      console.log('data del auth front 1  ', res);
      if(res.ok){
        return res.json();
      }
      throw new Error(res.error)
    })
    .then((data) => {
      console.log('data del auth front 2  ', data);
      localStorage.setItem('jwt', data.token);
      //return data;
      return Promise.resolve(data);
    });
};

export const checkToken = (token) => {
  console.log('log problematico checkToken  ', token);
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      console.log('log then del checkToken  ', res);
      res.json()
    })
    .then((data) => data);
};

