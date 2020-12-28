import React from 'react';
import {StyleSheet} from 'react-native';
import ReadMore from 'react-native-read-more-text';

import Screen from '../components/Screen';
import Text from '../components/texts/Text';
import Button from '../components/buttons/Button';
import Carousel from '../components/carousel/Carousel';
import ActivityIndicator from '../components/ActivityIndicator';
import useCart from '../hooks/useCart';
import useApi from '../hooks/useApi';
import shprApi from '../api/shoppingProduct';
import {currencyFormat} from '../utility/currency';

function ProductDetailScreen({route}) {
  const {cart, addCartItem} = useCart();
  const addToCartApi = useApi(shprApi.addShoppingProduct);

  const product = route.params;
  const {pro_id, name, images, description, price} = product;

  const handleAddToCart = () => {
    const shoppingProduct = {
      pro_id,
      car_id: cart.cartId,
      quantity: 1,
    };
    addCartItem();
    addToCartApi.request(shoppingProduct);
  };

  return (
    <>
      <ActivityIndicator visible={addToCartApi.loading} />

      <Screen>
        <Carousel list={images} />

        <Text style={styles.title}>{name}</Text>

        <ReadMore numberOfLines={3}>
          <Text>{description}</Text>
        </ReadMore>

        <Text style={styles.price}>{currencyFormat(price)}</Text>

        <Button title="Add to cart" onPress={handleAddToCart} />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    textTransform: 'capitalize',
  },
  price: {
    fontWeight: 'bold',
    fontSize: 24,
  },
});

export default ProductDetailScreen;
