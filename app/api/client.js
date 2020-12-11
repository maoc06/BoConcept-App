import {create} from 'apisauce';
import {API_URL} from '@env';
import authStorage from '../auth/storage';

const apiClient = create({
  baseURL: API_URL,
});

apiClient.addAsyncRequestTransform(async (request) => {
  const accessToken = await authStorage.getToken();
  if (!accessToken) return;
  request.headers['Authorization'] = `Bearer ${accessToken}`;
});

export default apiClient;
