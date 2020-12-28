import client from './client';

const endpoint = '/cart';

const getCurrCartCustomer = ({email}) =>
  client.get(`${endpoint}/by-enable/${email}`);

const createCart = (cartInfo) => client.post(endpoint, cartInfo);

const updateCart = (cartInfo) => client.put(endpoint, cartInfo);

const updateBillingAddres = (data) =>
  client.patch(`${endpoint}/billing-address`, data);

const updateShippingMethod = (data) =>
  client.patch(`${endpoint}/shipping-method`, data);

const updatePaymentDate = (data) =>
  client.patch(`${endpoint}/payment-date`, data);

const updateCreditCard = (data) =>
  client.patch(`${endpoint}/credit-card`, data);

export default {
  getCurrCartCustomer,
  createCart,
  updateCart,
  updateBillingAddres,
  updateShippingMethod,
  updatePaymentDate,
  updateCreditCard,
};
