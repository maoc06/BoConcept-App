import client from './client';

const endpoint = '/shopping-product';

const getShoppingProductsCart = ({carId}) =>
  client.get(`${endpoint}/by-cart/${carId}`);

const getShoppingProductsByEnableCart = ({email}) =>
  client.get(`${endpoint}/by-enable-cart/${email}`);

const addShoppingProduct = (shprInfo) => client.post(endpoint, shprInfo);

const updateShoppingProduct = (shprInfo) => client.put(endpoint, shprInfo);

const deleteShoppingProduct = ({shprId}) =>
  client.delete(`${endpoint}/${shprId}`);

export default {
  getShoppingProductsCart,
  getShoppingProductsByEnableCart,
  addShoppingProduct,
  updateShoppingProduct,
  deleteShoppingProduct,
};
