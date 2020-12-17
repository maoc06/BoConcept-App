import React, {useState, useEffect} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';

import Text from '../../components/Text';
import Button from '../../components/Button';
import ActivityIndicator from '../../components/ActivityIndicator';
import {SelectPayment, AddNewContainer} from '../../components/lists';
import {ErrorMessage} from '../../components/forms';
import useApi from '../../hooks/useApi';
import useAuth from '../../auth/useAuth';
import useCart from '../../hooks/useCart';
import creditCardApi from '../../api/creditCard';

function PaymentScreen({setStep}) {
  const {user} = useAuth();
  const {cart, setCartCreditCard} = useCart();
  const getCreditCards = useApi(creditCardApi.getCreditCardsByCustomer);
  const [error, setError] = useState(false);

  useEffect(() => {
    getCreditCards.request({email: user.info.email});
  }, []);

  const handlePaymentMethod = (value) => {
    setError(false);
    setCartCreditCard(value);
  };

  const handleSubmit = () => {
    if (cart.creditCardNumber === null) {
      setError(true);
      return;
    }
    setStep(3);
  };

  return (
    <>
      <ActivityIndicator visible={getCreditCards.loading} />

      <FlatList
        ListHeaderComponent={
          <>
            <ErrorMessage error="Select a payment method" visible={error} />

            <Text style={styles.title}>Select your payment method</Text>
          </>
        }
        data={getCreditCards.data.data}
        keyExtractor={(creditCard) => creditCard.card_number.toString()}
        renderItem={({item}) => (
          <SelectPayment
            cardNumber={item.card_number}
            expiryMonth={item.expiry_month}
            expiryYear={item.expiry_year}
            value={item.card_number}
            currValue={cart.creditCardNumber}
            setValue={() => handlePaymentMethod(item.card_number)}
          />
        )}
        ListFooterComponent={
          <>
            <AddNewContainer
              title="+ Add new payment method"
              onPress={() => alert('Go to add new payment method')}
            />

            <Button
              title="Continue to summary"
              marginVertical={75}
              onPress={handleSubmit}
            />
          </>
        }
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
  },
});

export default PaymentScreen;
