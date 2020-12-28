import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Badge} from 'react-native-paper';

import ButtonIcon from './buttons/ButtonIcon';
import colors from '../config/colors';
import useCart from '../hooks/useCart';

function CartBadge({onPress}) {
  const {cart} = useCart();

  return (
    <View>
      {cart.items !== 0 && (
        <Badge style={styles.badge} size={16}>
          {cart.items}
        </Badge>
      )}

      <ButtonIcon
        icon={require('../assets/cart-icon.png')}
        style={styles.icon}
        onPress={onPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -4,
    right: 17,
    fontSize: 10,
    backgroundColor: colors.primary,
    zIndex: 999,
  },
  icon: {
    marginRight: 20,
  },
});

export default CartBadge;
