import React, {useEffect, useState} from 'react';

import ButtonIcon from './ButtonIcon';
import useAuth from '../../hooks/useAuth';
import useApi from '../../hooks/useApi';
import favoriteApi from '../../api/favorite';

function ButtonFavorite({proId}) {
  const {user} = useAuth();
  const getFavoritesApi = useApi(favoriteApi.getFavorites);
  const addToFavoriteApi = useApi(favoriteApi.addFavorite);
  const removeToFavoriteApi = useApi(favoriteApi.deleteFavorite);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    getFavoritesApi.request({email: user.info.email});
  }, []);

  useEffect(() => {
    handleSetAsFavorite();
  }, [getFavoritesApi.data.data]);

  const handleSetAsFavorite = () => {
    if (getFavoritesApi.data.data !== undefined) {
      if (getFavoritesApi.data.data.some((item) => item.pro_id === proId)) {
        setIsFavorite(true);
        return;
      }
      setIsFavorite(false);
    }
  };

  const handleFavorite = async () => {
    const favorite = {
      customer_owner: user.info.email,
      pro_id: proId,
    };

    isFavorite
      ? await removeToFavoriteApi.request(favorite)
      : await addToFavoriteApi.request(favorite);

    getFavoritesApi.request({email: user.info.email});
  };

  return (
    <ButtonIcon
      icon={
        isFavorite
          ? require('../../assets/favorite-icon-fill.png')
          : require('../../assets/favorite-icon.png')
      }
      style={{marginRight: 16}}
      onPress={handleFavorite}
    />
  );
}

export default ButtonFavorite;
