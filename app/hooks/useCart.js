import {useContext} from 'react';

import {CartContext} from '../contexts/cartContext';

export default useCart = () => {
  const {cart, setCart} = useContext(CartContext);

  const setCartId = (cartId) => {
    setCart({...cart, cartId});
  };
  const setInitialCartItems = (calcTotal) => {
    setCart({...cart, items: calcTotal});
  };

  const addCartItem = (quantity = 1) => {
    setCart({...cart, items: cart.items + quantity});
  };

  const removeCartItem = (quantity = 1) => {
    setCart({...cart, items: cart.items - quantity});
  };

  const setCartCreditCard = (cardInfo) => {
    setCart({...cart, creditCardNumber: cardInfo});
  };

  const setCartBillingAddress = (addressInfo) => {
    setCart({...cart, billingAddressId: addressInfo});
  };

  const setCartShippingMethod = (shippingInfo) => {
    setCart({...cart, shippingMethodId: shippingInfo});
  };

  const setCartPaymentDate = (dateInfo) => {
    setCart({...cart, paymentDate: dateInfo});
  };

  const clearCart = () => {
    setCart({
      cartId: null,
      items: 0,
      creditCardNumber: null,
      billingAddressId: null,
      shippingMethodId: 1,
      paymentDate: null,
    });
  };

  return {
    cart,
    setCartId,
    setInitialCartItems,
    addCartItem,
    removeCartItem,
    setCartCreditCard,
    setCartBillingAddress,
    setCartShippingMethod,
    setCartPaymentDate,
    clearCart,
  };
};
