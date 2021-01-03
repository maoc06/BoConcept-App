import {useContext} from 'react';

import {PaymentContext} from '../contexts/paymentContext';

export default usePayments = () => {
  const {payments, setPayments} = useContext(PaymentContext);

  const setInitial = (initialPayments) => {
    setPayments(initialPayments);
  };

  const addPayment = (payment) => {
    setPayments([...payments, payment]);
  };

  return {payments, setInitial, addPayment};
};
