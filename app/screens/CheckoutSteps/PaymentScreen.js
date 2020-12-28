import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet} from 'react-native';

import Text from '../../components/texts/Text';
import Button from '../../components/buttons/Button';
import ActivityIndicator from '../../components/ActivityIndicator';
import {SelectPayment, AddNewContainer} from '../../components/lists';
import {ErrorMessage} from '../../components/forms';
import useApi from '../../hooks/useApi';
import useAuth from '../../hooks/useAuth';
import useCart from '../../hooks/useCart';
import creditCardApi from '../../api/creditCard';
import colors from '../../config/colors';
import routes from '../../navigation/routes';

function PaymentScreen({setStep, navigation}) {
  const {user} = useAuth();
  const {cart, setCartCreditCard} = useCart();
  const getCreditCards = useApi(creditCardApi.getCreditCardsByCustomer);
  const [creditCards, setCreditCards] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    getCreditCards.request({email: user.info.email});
  }, []);

  useEffect(() => {
    setCreditCards(getCreditCards.data.data);
  });

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

  const renderEmptyMessage = () => {
    if (creditCards !== undefined) {
      if (creditCards.length === 0) {
        return (
          <Text style={styles.empty}>
            You don't have payment methods yet. Add a new one.
          </Text>
        );
      }
    }
    return null;
  };

  return (
    <>
      <ActivityIndicator visible={getCreditCards.loading} />

      <FlatList
        ListHeaderComponent={
          <>
            <ErrorMessage error="Select a payment method" visible={error} />

            <Text style={styles.title}>Select your payment method</Text>
            {renderEmptyMessage()}
          </>
        }
        data={getCreditCards.data.data}
        keyExtractor={(creditCard) => creditCard.card_number.toString()}
        renderItem={({item}) => (
          <SelectPayment
            cardNumber={item.card_number}
            expiryMonth={item.expiry_month}
            expiryYear={item.expiry_year}
            imageUrl={item.image_url}
            value={item.card_number}
            currValue={cart.creditCardNumber}
            setValue={() => handlePaymentMethod(item.card_number)}
          />
        )}
        ListFooterComponent={
          <>
            <AddNewContainer
              title="+ Add new payment method"
              onPress={() => navigation.navigate(routes.ADD_NEW_PAYMENT)}
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
  empty: {
    paddingVertical: 15,
    paddingLeft: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.whiteAccent,
  },
});

export default PaymentScreen;
