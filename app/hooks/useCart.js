import {useContext} from 'react';

import {CartContext} from '../contexts/cartContext';

export default useCart = () => {
  const {cart, setCart} = useContext(CartContext);

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

  return {
    cart,
    setCartCreditCard,
    setCartBillingAddress,
    setCartShippingMethod,
    setCartPaymentDate,
  };
};
