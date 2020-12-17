import client from './client';

const endpoint = '/address';

const getAddressById = ({addressId}) => client.get(`${endpoint}/${addressId}`);

const getAddressCustomer = ({email}) =>
  client.get(`${endpoint}/by-customer/${email}`);

export default {
  getAddressById,
  getAddressCustomer,
};
