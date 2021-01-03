import React, {useState} from 'react';

export const PaymentContext = React.createContext();

function paymentContextProvider({children}) {
  const [payments, setPayments] = useState([]);

  return (
    <PaymentContext.Provider value={{payments, setPayments}}>
      {children}
    </PaymentContext.Provider>
  );
}

export default paymentContextProvider;
