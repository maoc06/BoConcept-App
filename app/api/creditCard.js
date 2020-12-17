import client from './client';

const endpoint = '/credit-card';

const getCreditCardsByCustomer = ({email}) =>
  client.get(`${endpoint}/by-customer/${email}`);

const getCreditCardById = ({cardNumber}) =>
  client.get(`${endpoint}/${cardNumber}`);

export default {getCreditCardsByCustomer, getCreditCardById};
