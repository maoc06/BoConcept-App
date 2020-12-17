import client from './client';

const endpoint = '/shipping-method';

const getShippingMethods = () => client.get(endpoint);

const getShippingMethod = ({id}) => client.get(`${endpoint}/${id}`);

export default {getShippingMethods, getShippingMethod};
