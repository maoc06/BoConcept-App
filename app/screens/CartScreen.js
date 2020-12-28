import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

import Screen from '../components/Screen';
import Text from '../components/texts/Text';
import Button from '../components/buttons/Button';
import ActivityIndicator from '../components/ActivityIndicator';
import TextTotalCalc from '../components/texts/TextTotalCalc';
import CardSwipeable from '../components/cards/CardSwipeable';
import routes from '../navigation/routes';
import useApi from '../hooks/useApi';
import useAuth from '../hooks/useAuth';
import useCart from '../hooks/useCart';
import shprApi from '../api/shoppingProduct';
import colors from '../config/colors';
import calcTotal from '../utility/calcTotal';
import {currencyFormat} from '../utility/currency';

function CartScreen({navigation}) {
  const {cart, addCartItem, removeCartItem} = useCart();
  const {user} = useAuth();

  const getShoppingProductApi = useApi(shprApi.getShoppingProductsByEnableCart);
  const updateShoppingProductApi = useApi(shprApi.updateShoppingProduct);
  const deleteShoppingProductApi = useApi(shprApi.deleteShoppingProduct);

  const [shoppingProducts, setShoppingProducts] = useState([]);

  useEffect(() => {
    getShoppingProductApi.request({email: user.info.email});
  }, []);

  useEffect(() => {
    if (!getShoppingProductApi.loading) {
      setShoppingProducts(getShoppingProductApi.data.data);
    }
  });

  const handleShprAdd = (shpr) => {
    shpr.quantity += 1;
    shpr.car_id = cart.cartId;
    updateShoppingProductApi.request(shpr);
    addCartItem();
  };

  const handleShprRemove = (shpr) => {
    if (shpr.quantity === 1) {
      handleRemoveProduct(shpr);
      return;
    }
    shpr.quantity -= 1;
    shpr.car_id = cart.cartId;
    updateShoppingProductApi.request(shpr);
    removeCartItem();
  };

  const handleRemoveProduct = async (shpr) => {
    const {shpr_id, quantity} = shpr;
    removeCartItem(quantity);
    await deleteShoppingProductApi.request({shprId: shpr_id});
    getShoppingProductApi.request({email: user.info.email});
  };

  const renderCart = () => {
    if (shoppingProducts.length === 0) {
      return (
        <View style={styles.emptyState}>
          <Text style={styles.message}>Your shopping cart is empty</Text>

          <Button
            title="Continue shopping"
            onPress={() => navigation.navigate(routes.HOME)}
          />
        </View>
      );
    }

    return (
      <FlatList
        fadingEdgeLength={50}
        data={shoppingProducts}
        keyExtractor={(product) => product.pro_id.toString()}
        renderItem={({item}) => (
          <CardSwipeable
            product={item}
            onPressLeft={() => alert(`Go to edit ${item.name}`)}
            onPressRight={() => handleRemoveProduct(item)}
            handleAdd={() => handleShprAdd(item)}
            handleRemove={() => handleShprRemove(item)}
          />
        )}
        ListFooterComponent={
          <>
            <TextTotalCalc
              title={'Sub total'}
              calc={currencyFormat(calcTotal.price(shoppingProducts))}
              showDisclaimer={true}
              disclaimerMessage={'(Sub total does not include shipping)'}
              bigNumber={true}
              style={{marginBottom: 40}}
            />

            <Button
              title="Checkout"
              onPress={() => navigation.navigate(routes.CHECKOUT)}
            />
          </>
        }
      />
    );
  };

  return (
    <>
      <ActivityIndicator
        visible={
          getShoppingProductApi.loading ||
          deleteShoppingProductApi.loading ||
          updateShoppingProductApi.loading
        }
      />

      <Screen>
        {getShoppingProductApi.error && (
          <>
            <Text>Couldn't retrieve cart.</Text>
            <Button
              title="Retry"
              onPress={getShoppingProductApi.request({email: user.info.email})}
            />
          </>
        )}

        {shoppingProducts && (
          <>
            <Text style={styles.title}>Shopping Cart</Text>

            <Text style={styles.quantity}>
              {shoppingProducts.length === 0
                ? '0 item(s)'
                : `${calcTotal.quantity(shoppingProducts)} item(s)`}
            </Text>

            {renderCart()}
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

export default CartScreen;
