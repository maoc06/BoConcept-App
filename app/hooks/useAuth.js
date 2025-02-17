import {useContext} from 'react';
import jwtDecode from 'jwt-decode';

import AuthContext from '../contexts/authContext';
import authStorage from '../auth/storage';

export default useAuth = () => {
  const {user, setUser} = useContext(AuthContext);

  const logIn = (authToken) => {
    const user = jwtDecode(authToken);
    setUser(user);
    authStorage.storeToken(authToken);
  };

  const logOut = () => {
    setUser(null);
    authStorage.removeToken();
  };

  return {user, logIn, logOut};
};
