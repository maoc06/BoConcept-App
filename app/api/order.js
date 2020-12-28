import client from './client';

const endpoint = '/order';

const generateOrder = (orderInfo) =>
  client.post(`${endpoint}/generate`, orderInfo);

export default {
  generateOrder,
};
