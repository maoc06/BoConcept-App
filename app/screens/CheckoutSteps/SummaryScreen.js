import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import * as Yup from 'yup';

import Text from '../../components/Text';
import {Form, CheckBox, SubmitButton} from '../../components/forms';
import TextTotalCalc from '../../components/TextTotalCalc';
import ActivityIndicator from '../../components/ActivityIndicator';
import SwipeableCard from '../../components/SwipeableCard';
import SectionTitleEdit from '../../components/SectionTitleEdit';
import useApi from '../../hooks/useApi';
import useAuth from '../../auth/useAuth';
import useCart from '../../hooks/useCart';
import addressApi from '../../api/address';
import shippingMethodApi from '../../api/shippingMethods';
import creditCardApi from '../../api/creditCard';
import shoppingProductApi from '../../api/shoppingProduct';
import colors from '../../config/colors';
import calcTotal from '../../utility/calcTotal';
import {currencyFormat} from '../../utility/currency';

const validationSchema = Yup.object().shape({
  terms: Yup.bool().oneOf([true], 'Must accept Terms of the shop'),
});

function SummaryScreen() {
  const {user} = useAuth();
  const {cart} = useCart();
  const getAddressApi = useApi(addressApi.getAddressById);
  const getShippingMethodApi = useApi(shippingMethodApi.getShippingMethod);
  const getCreditCardApi = useApi(creditCardApi.getCreditCardById);
  const getShoppingProductApi = useApi(
    shoppingProductApi.getShoppingProductsByEnableCart
  );
  let shippingCost = 0;
  let subTotal = 0;

  useEffect(() => {
    getAddressApi.request({addressId: cart.billingAddressId});
    getShippingMethodApi.request({id: cart.shippingMethodId});
    getCreditCardApi.request({cardNumber: cart.creditCardNumber});
    getShoppingProductApi.request({email: user.info.email});
  }, []);

  const handleSubmit = () => {
    alert('Make Shopping');
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
        <Text style={styles.text}>Master Card</Text>
        <Text>{getCreditCardApi.data.data.card_number}</Text>
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
            onPress={() => alert('Edit Billing')}
          />
          {renderBillingInfo()}
        </View>

        <View style={styles.section}>
          <SectionTitleEdit
            title="Shipping"
            style={{marginBottom: 15}}
            onPress={() => alert('Edit Shipping')}
          />
          {renderShippingInfo()}
        </View>

        <View style={styles.section}>
          <SectionTitleEdit
            title="Payment"
            style={{marginBottom: 15}}
            onPress={() => alert('Edit Payment')}
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
    subTotal = calcTotal.price(getShoppingProductApi.data.data);

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
      getShoppingProductApi.data.data === undefined
    ) {
      return null;
    }

    return (
      <FlatList
        fadingEdgeLength={50}
        ListHeaderComponent={renderHeaderList()}
        data={getShoppingProductApi.data.data}
        keyExtractor={(product) => product.pro_id.toString()}
        renderItem={({item}) => (
          <SwipeableCard product={item} swipeableActive={false} />
        )}
        ListFooterComponent={renderFooterList()}
      />
    );
  };

  return (
    <>
      <ActivityIndicator
        visible={
          getAddressApi.loading ||
          getShippingMethodApi.loading ||
          getCreditCardApi.loading ||
          getShoppingProductApi.loading
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
