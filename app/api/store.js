import client from './client';

const endpoint = '/store';

const getStores = () => client.get(endpoint);

export default {
  getStores,
};
