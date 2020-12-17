import React, {useState, useEffect} from 'react';

export const CartContext = React.createContext();

function cartContextProvider({children}) {
  const [cart, setCart] = useState();

  const initialCart = {
    creditCardNumber: null,
    billingAddressId: null,
    shippingMethodId: 1,
    paymentDate: null,
  };

  useEffect(() => {
    setCart(initialCart);
  }, []);

  return (
    <CartContext.Provider value={{cart, setCart}}>
      {children}
    </CartContext.Provider>
  );
}

export default cartContextProvider;
