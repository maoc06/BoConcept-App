import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import ReadMore from 'react-native-read-more-text';

import Screen from '../components/Screen';
import Text from '../components/texts/Text';
import Button from '../components/buttons/Button';
import Carousel from '../components/carousel/Carousel';
import ActivityIndicator from '../components/ActivityIndicator';
import useCart from '../hooks/useCart';
import useApi from '../hooks/useApi';
import productApi from '../api/product';
import shprApi from '../api/shoppingProduct';
import {currencyFormat} from '../utility/currency';

function ProductDetailScreen({route}) {
  const {cart, addCartItem} = useCart();
  const addToCartApi = useApi(shprApi.addShoppingProduct);
  const getProductImagesApi = useApi(productApi.getProductImages);

  const product = route.params;
  const {pro_id, name, images, description, price} = product;

  const [productImages, setProductImages] = useState(images);

  useEffect(() => {
    if (product.images === undefined) {
      getProductImagesApi.request(pro_id);
    }
  }, []);

  useEffect(() => {
    if (getProductImagesApi.data.data) {
      setProductImages(getProductImagesApi.data.data);
    }
  }, [getProductImagesApi.data.data]);

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
        {productImages !== undefined && <Carousel list={productImages} />}

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
