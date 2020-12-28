import React from 'react';
import {View, StyleSheet} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import Card from './Card';
import Text from '../texts/Text';
import Button from '../buttons/Button';
import ButtonSwip from '../buttons/ButtonSwip';
import ButtonQuantity from '../buttons/ButtonQuantity';
import {currencyFormat} from '../../utility/currency';
import colors from '../../config/colors';

function SwipeableCard({
  product,
  onPressRight,
  onPressLeft,
  swipeableActive = true,
  swipeableLeft = true,
  swipeableRight = true,
  showDescription = true,
  showQuantity = true,
  showAuxButton = false,
  handleAuxButton,
  handleAdd,
  handleRemove,
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
    return (
      <ButtonQuantity
        quantity={product.quantity}
        handleAdd={handleAdd}
        handleRemove={handleRemove}
      />
    );
  };

  const ItemCard = () => {
    return (
      <View style={styles.container}>
        <View style={styles.productImage}>
          <Card imageUrl={product.image} showDetails={false} />
        </View>

        <View style={styles.productInfo}>
          <Text style={styles.title}>{product.name}</Text>

          {showDescription && (
            <View style={styles.detailsContainer}>
              <Text style={styles.subtitle}>
                Upholstery: dusty red Cotton Velvet fabric 6118
              </Text>

              <Text style={styles.subtitle}>
                Leg style: aluminium-coloured, 15cm, 4290
              </Text>
            </View>
          )}

          <Text>{currencyFormat(product.price)}</Text>

          {!showDescription && (
            <Text style={styles.auxDescription}>View full details</Text>
          )}

          {showAuxButton && (
            <Button
              marginVertical={'30%'}
              title="Add to cart"
              onPress={handleAuxButton}
            />
          )}

          {showQuantity && QuantityComponent()}
        </View>
      </View>
    );
  };

  if (!swipeableActive) {
    return ItemCard();
  }

  if (swipeableRight && !swipeableLeft) {
    return (
      <Swipeable renderRightActions={RightActions}>{ItemCard()}</Swipeable>
    );
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
  auxDescription: {
    color: colors.medium,
  },
});

export default SwipeableCard;
