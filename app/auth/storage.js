import * as SecureStore from 'expo-secure-store';
import jwtDecode from 'jwt-decode';

const key = 'accessToken';

const storeToken = async (authToken) => {
  try {
    await SecureStore.setItemAsync(key, authToken);
  } catch (error) {
    console.error('Error storing the access token', error);
  }
};

const getToken = async () => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.error('Error getting the access token', error);
  }
};

const getUser = async () => {
  const token = await getToken();
  return token ? jwtDecode(token) : null;
};

const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.error('Error removing the access token', error);
  }
};

export default {getUser, getToken, storeToken, removeToken};
