import client from './client';

const endpoint = '/product';

const getProducts = () => client.get(endpoint);

const getProductsByCategory = ({catId}) =>
  client.get(`${endpoint}/by-cat/${catId}`);

const getProductsByQuery = ({query}) =>
  client.get(`${endpoint}/query/${query}`);

const getProduct = (proId) => client.get(`${endpoint}/${proId}`);

const getProductImages = (proId) => client.get(`${endpoint}/image/${proId}`);

export default {
  getProducts,
  getProductsByCategory,
  getProductsByQuery,
  getProduct,
  getProductImages,
};
