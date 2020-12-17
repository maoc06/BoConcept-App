import React, {useState, useEffect} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';

import Text from '../../components/Text';
import Button from '../../components/Button';
import ActivityIndicator from '../../components/ActivityIndicator';
import {RadioButton, ErrorMessage} from '../../components/forms';
import {SelectAddress, AddNewContainer} from '../../components/lists';
import useApi from '../../hooks/useApi';
import useAuth from '../../auth/useAuth';
import useCart from '../../hooks/useCart';
import addressApi from '../../api/address';
import shippingMethodsApi from '../../api/shippingMethods';

function ShippingScreen({setStep}) {
  const {user} = useAuth();
  const {cart, setCartBillingAddress, setCartShippingMethod} = useCart();
  const getCustomerAddressApi = useApi(addressApi.getAddressCustomer);
  const getShippingMethodsApi = useApi(shippingMethodsApi.getShippingMethods);
  const [errorBillingAddress, setErrorBillingAddress] = useState(false);
  const [errorShippingMethod, setErrorShippingMethod] = useState(false);

  useEffect(() => {
    getCustomerAddressApi.request({email: user.info.email});
    getShippingMethodsApi.request();
  }, []);

  const handleSelectShippigMethod = (value) => {
    setErrorShippingMethod(false);
    setCartShippingMethod(value);
  };

  const handleSelectAddress = (value) => {
    setErrorBillingAddress(false);
    setCartBillingAddress(value);
  };

  const handleSubmit = () => {
    if (cart.billingAddressId === null) {
      setErrorBillingAddress(true);
    }
    if (cart.shippingMethodId === null) {
      setErrorShippingMethod(true);
      return;
    }
    setStep(2);
  };

  const renderShippingMethodsList = () => {
    return (
      <View style={styles.shippingMethod}>
        <Text style={styles.text}>Shipping method</Text>

        <FlatList
          ListHeaderComponent={
            <ErrorMessage
              error="Select a shipping method"
              visible={errorShippingMethod}
            />
          }
          data={getShippingMethodsApi.data.data}
          keyExtractor={(shippingMethod) =>
            shippingMethod.shipping_method_id.toString()
          }
          renderItem={({item}) => (
            <RadioButton
              children={item.name}
              value={item.shipping_method_id}
              currValue={cart.shippingMethodId}
              setValue={() =>
                handleSelectShippigMethod(item.shipping_method_id)
              }
            />
          )}
          ListFooterComponent={
            <Button
              marginVertical={75}
              title="Continue to payment method"
              onPress={handleSubmit}
            />
          }
        />
      </View>
    );
  };

  return (
    <>
      <ActivityIndicator
        visible={getCustomerAddressApi.loading || getShippingMethodsApi.loading}
      />

      <FlatList
        fadingEdgeLength={50}
        ListHeaderComponent={
          <>
            <ErrorMessage
              error="Select a shipping address"
              visible={errorBillingAddress}
            />
            <Text style={styles.text}>Select your address</Text>
          </>
        }
        data={getCustomerAddressApi.data.data}
        keyExtractor={(address) => address.address_id.toString()}
        renderItem={({item}) => (
          <SelectAddress
            name={item.name}
            address={item.billing_address}
            zipCode={item.zip_code}
            value={item.address_id}
            currValue={cart.billingAddressId}
            setValue={() => handleSelectAddress(item.address_id)}
          />
        )}
        ListFooterComponent={
          <>
            <AddNewContainer
              title="+ Add new address"
              onPress={() => alert('Go to add new address')}
            />
            {renderShippingMethodsList()}
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
  shippingMethod: {
    flex: 1,
    marginTop: 75,
  },
  text: {
    fontWeight: 'bold',
  },
});

export default ShippingScreen;
