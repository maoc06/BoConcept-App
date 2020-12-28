import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';

import Screen from '../components/Screen';
import Text from '../components/texts/Text';
import Button from '../components/buttons/Button';
import CardSwipeable from '../components/cards/CardSwipeable';
import ActivityIndicator from '../components/ActivityIndicator';
import useAuth from '../hooks/useAuth';
import useCart from '../hooks/useCart';
import useApi from '../hooks/useApi';
// import cartApi from '../api/cart';
import favoriteApi from '../api/favorite';
import shprApi from '../api/shoppingProduct';
import colors from '../config/colors';
import routes from '../navigation/routes';

function FavoritesScreen({navigation}) {
  const {user} = useAuth();
  const {cart, addCartItem} = useCart();

  const getFavoritesApi = useApi(favoriteApi.getFavorites);
  const deleteFavoriteApi = useApi(favoriteApi.deleteFavorite);
  // const getCartApi = useApi(cartApi.getCurrCartCustomer);
  const addShoppingProductApi = useApi(shprApi.addShoppingProduct);

  const [favorites, setFavorites] = useState();

  useEffect(() => {
    getFavoritesApi.request({email: user.info.email});
    // getCartApi.request({email: user.info.email});
  }, []);

  useEffect(() => {
    if (!getFavoritesApi.loading) {
      setFavorites(getFavoritesApi.data.data);
    }
  });

  const handleRemove = (item) => {
    const {customer_owner, pro_id} = item;
    const favorite = {
      customer_owner,
      pro_id,
    };
    deleteFavoriteApi.request(favorite);
    getFavoritesApi.request({email: user.info.email});
  };

  const handlAddToCart = (item) => {
    const shoppingProduct = {
      pro_id: item.pro_id,
      car_id: cart.cartId,
      quantity: 1,
    };
    addShoppingProductApi.request(shoppingProduct);
    addCartItem();
  };

  const renderFavorites = () => {
    if (favorites.length === 0) {
      return (
        <View style={styles.emptyState}>
          <Text style={styles.message}>No favorite yet!</Text>

          <Button
            title="Continue shopping"
            onPress={() => navigation.navigate(routes.HOME)}
          />
        </View>
      );
    }

    return (
      <FlatList
        data={favorites}
        keyExtractor={(favorite) => favorite.pro_id.toString()}
        renderItem={({item}) => (
          <CardSwipeable
            product={item}
            onPressRight={() => handleRemove(item)}
            swipeableLeft={false}
            showDescription={false}
            showQuantity={false}
            showAuxButton={true}
            handleAuxButton={() => handlAddToCart(item)}
          />
        )}
      />
    );
  };

  return (
    <>
      <ActivityIndicator
        visible={
          getFavoritesApi.loading ||
          deleteFavoriteApi.loading ||
          addShoppingProductApi.loading
        }
      />

      <Screen>
        {getFavoritesApi.error && (
          <>
            <Text>Couldn't retrieve favourites.</Text>
            <Button
              title="Retry"
              onPress={getFavoritesApi.request({email: user.info.email})}
            />
          </>
        )}

        {favorites && (
          <>
            <Text style={styles.title}>Favourites</Text>

            <Text style={styles.quantity}>
              {favorites.length === 0
                ? '0 item(s)'
                : `${favorites.length} item(s)`}
            </Text>

            {renderFavorites()}
          </>
        )}
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 18,
    color: colors.medium,
    alignSelf: 'center',
  },
  quantity: {
    paddingTop: 6,
    paddingBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: colors.dark,
    marginBottom: 12,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default FavoritesScreen;
