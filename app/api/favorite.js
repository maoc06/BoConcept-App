import client from './client';

const endpoint = '/favorite';

const getFavorites = ({email}) => client.get(`${endpoint}/${email}`);

const addFavorite = (favorite) => client.post(endpoint, favorite);

const deleteFavorite = ({customer_owner, pro_id}) =>
  client.delete(`${endpoint}/${customer_owner}/${pro_id}`);

export default {
  getFavorites,
  addFavorite,
  deleteFavorite,
};
