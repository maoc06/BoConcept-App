import client from './client';

const endpoint = '/auth';

const signIn = (email, password) =>
  client.post(`${endpoint}/signin`, {email, password});

const signUp = (userInfo) => client.post(`${endpoint}/signup`, userInfo);

export default {
  signIn,
  signUp,
};
