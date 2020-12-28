import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import * as Yup from 'yup';

import Text from '../../components/texts/Text';
import {Form, CheckBox, SubmitButton} from '../../components/forms';
import TextTotalCalc from '../../components/texts/TextTotalCalc';
import ActivityIndicator from '../../components/ActivityIndicator';
import CardSwipeable from '../../components/cards/CardSwipeable';
import SectionTitleEdit from '../../components/lists/SectionTitleEdit';
import SuccessPaymentScreen from '../SuccessPaymentScreen';
import useApi from '../../hooks/useApi';
import useAuth from '../../hooks/useAuth';
import useCart from '../../hooks/useCart';
import orderApi from '../../api/order';
import addressApi from '../../api/address';
import shippingMethodApi from '../../api/shippingMethods';
import creditCardApi from '../../api/creditCard';
import shoppingProductApi from '../../api/shoppingProduct';
import colors from '../../config/colors';
import calcTotal from '../../utility/calcTotal';
import {currencyFormat} from '../../utility/currency';
import {getRandomInt} from '../../utility/getRandomInt';
import {dateFormat} from '../../utility/dateFormat';
import {maskCardNumber} from '../../utility/maskCardNumber';

const validationSchema = Yup.object().shape({
  terms: Yup.bool().oneOf([true], 'Must accept Terms of the shop'),
});

function SummaryScreen({setStep, navigation}) {
  const {user} = useAuth();
  const {cart, clearCart} = useCart();

  const getAddressApi = useApi(addressApi.getAddressById);
  const getShippingMethodApi = useApi(shippingMethodApi.getShippingMethod);
  const getCreditCardApi = useApi(creditCardApi.getCreditCardById);
  const getShprApi = useApi(shoppingProductApi.getShoppingProductsByEnableCart);
  const generateOrderApi = useApi(orderApi.generateOrder);

  const [orderNumber, setOrderNumber] = useState();
  const [successVisible, setSuccessVisible] = useState(false);

  let shippingCost = 0;
  let subTotal = 0;

  useEffect(() => {
    getAddressApi.request({addressId: cart.billingAddressId});
    getShippingMethodApi.request({id: cart.shippingMethodId});
    getCreditCardApi.request({cardNumber: cart.creditCardNumber});
    getShprApi.request({email: user.info.email});
  }, []);

  const handleSubmit = () => {
    const randomOrderNumber = getRandomInt(10000, 100000);
    setOrderNumber(randomOrderNumber);

    const orderInfo = {
      order_number: randomOrderNumber,
      car_id: cart.cartId,
      email: user.info.email,
      card_number: cart.creditCardNumber,
      billing_addres_id: cart.billingAddressId,
      shipping_method_id: cart.shippingMethodId,
      subtotal: subTotal,
      shipping_cost: shippingCost,
      payment_date: dateFormat(),
    };
    generateOrderApi.request(orderInfo);

    clearCart();

    setSuccessVisible(true);
  };

  const renderBillingInfo = () => {
    return (
      <View>
        <Text>
          {user.info.firstName} {user.info.lastName}
        </Text>
        <Text>
          {getAddressApi.data.data.billing_address} -{' '}
          {getAddressApi.data.data.zip_code}
        </Text>
        <Text>
          {getAddressApi.data.data.city}
          {'\n'}
        </Text>
        <Text>66542336</Text>
        <Text>{user.info.email}</Text>
      </View>
    );
  };

  const renderShippingInfo = () => {
    shippingCost =
      getShippingMethodApi.data.data.shipping_method_id === 1 ? 0 : 575;

    return (
      <>
        <Text style={styles.text}>
          Point of service:{' '}
          <Text style={{fontWeight: 'normal'}}>
            BoConcept Tottenham Court Road 158 Tottenham Court Road
          </Text>
        </Text>
        <Text>London, W1T 7NH</Text>
        <Text>United Kingdom{'\n'}</Text>
        <Text style={styles.text}>
          Shipping method:{' '}
          <Text style={{fontWeight: 'normal'}}>
            {getShippingMethodApi.data.data.name}
          </Text>
        </Text>
      </>
    );
  };

  const renderPaymentInfo = () => {
    return (
      <>
        <Text style={[styles.text, {textTransform: 'capitalize'}]}>
          {getCreditCardApi.data.data.name}
        </Text>
        <Text>{maskCardNumber(getCreditCardApi.data.data.card_number)}</Text>
      </>
    );
  };

  const renderHeaderList = () => {
    return (
      <>
        <Text style={styles.text}>Is your information correct?</Text>

        <View style={styles.section}>
          <SectionTitleEdit
            title="Billing"
            style={{marginBottom: 15}}
            onPress={() => setStep(1)}
          />
          {renderBillingInfo()}
        </View>

        <View style={styles.section}>
          <SectionTitleEdit
            title="Shipping"
            style={{marginBottom: 15}}
            onPress={() => setStep(1)}
          />
          {renderShippingInfo()}
        </View>

        <View style={styles.section}>
          <SectionTitleEdit
            title="Payment"
            style={{marginBottom: 15}}
            onPress={() => setStep(2)}
          />
          {renderPaymentInfo()}
        </View>

        <View style={[styles.section, styles.last]}>
          <SectionTitleEdit
            title="Your order"
            onPress={() => alert('Edit Order')}
          />
        </View>
      </>
    );
  };

  const renderFooterList = () => {
    subTotal = calcTotal.price(getShprApi.data.data);

    return (
      <>
        <View style={{marginBottom: 75}}>
          <TextTotalCalc title={'Sub total'} calc={currencyFormat(subTotal)} />

          <TextTotalCalc
            title={getShippingMethodApi.data.data.name}
            calc={currencyFormat(shippingCost)}
            style={{marginBottom: 40}}
          />

          <TextTotalCalc
            title={'Order total'}
            calc={currencyFormat(subTotal + shippingCost)}
            bigNumber={true}
          />
        </View>

        <Form
          initialValues={{
            terms: false,
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}>
          <CheckBox
            name="terms"
            children={'I agree to the terms and conditions of the shop'}
          />

          <SubmitButton title="Place order" />
        </Form>
      </>
    );
  };

  const renderSummaryComponent = () => {
    if (
      getAddressApi.data.data === undefined ||
      getShippingMethodApi.data.data === undefined ||
      getCreditCardApi.data.data === undefined ||
      getShprApi.data.data === undefined
    ) {
      return null;
    }

    return (
      <FlatList
        fadingEdgeLength={50}
        ListHeaderComponent={renderHeaderList()}
        data={getShprApi.data.data}
        keyExtractor={(product) => product.pro_id.toString()}
        renderItem={({item}) => (
          <CardSwipeable product={item} swipeableActive={false} />
        )}
        ListFooterComponent={renderFooterList()}
      />
    );
  };

  return (
    <>
      <SuccessPaymentScreen
        visible={successVisible}
        navigation={navigation}
        number={orderNumber}
      />

      <ActivityIndicator
        visible={
          getAddressApi.loading ||
          getShippingMethodApi.loading ||
          getCreditCardApi.loading ||
          getShprApi.loading
        }
      />

      {renderSummaryComponent()}
    </>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingVertical: 25,
    borderBottomWidth: 1,
    borderBottomColor: colors.whiteAccent,
  },
  text: {
    fontWeight: 'bold',
  },
  last: {
    borderBottomWidth: 0,
  },
});

export default SummaryScreen;
