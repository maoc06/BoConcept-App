import React from 'react';
import {View, StyleSheet} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import Card from './Card';
import Text from '../components/Text';
import ButtonQuantity from './ButtonQuantity';
import colors from '../config/colors';
import {currencyFormat} from '../utility/currency';
import ButtonSwip from './ButtonSwip';

function SwipeableCard({
  product,
  onPressRight,
  onPressLeft,
  swipeableActive = true,
}) {
  const LeftActions = () => {
    return <ButtonSwip title={'Edit'} onPress={onPressLeft} />;
  };

  const RightActions = () => {
    return (
      <ButtonSwip title={'Remove'} color={'redAccent'} onPress={onPressRight} />
    );
  };

  const QuantityComponent = () => {
    if (!swipeableActive) {
      return <Text>Qty: {product.quantity}</Text>;
    }
    return <ButtonQuantity quantity={product.quantity} />;
  };

  const ItemCard = () => {
    return (
      <View style={styles.container}>
        <View style={styles.productImage}>
          <Card showDetails={false} />
        </View>

        <View style={styles.productInfo}>
          <Text style={styles.title}>{product.name}</Text>

          <View style={styles.detailsContainer}>
            <Text style={styles.subtitle}>
              Upholstery: dusty red Cotton Velvet fabric 6118
            </Text>

            <Text style={styles.subtitle}>
              Leg style: aluminium-coloured, 15cm, 4290
            </Text>
          </View>

          <View style={styles.quantityContainer}>
            <Text>{currencyFormat(product.price)}</Text>

            {QuantityComponent()}
          </View>
        </View>
      </View>
    );
  };

  if (!swipeableActive) {
    return ItemCard();
  }
  return (
    <Swipeable
      renderLeftActions={LeftActions}
      renderRightActions={RightActions}>
      {ItemCard()}
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    minHeight: 150,
    borderBottomWidth: 1,
    borderBottomColor: colors.whiteAccent,
    backgroundColor: colors.light,
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  subtitle: {
    fontSize: 12,
    color: colors.medium,
  },
  productInfo: {
    flex: 1,
  },
  productImage: {
    flex: 1,
    marginRight: 20,
  },
  detailsContainer: {
    marginBottom: 10,
  },
  quantityContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default SwipeableCard;
