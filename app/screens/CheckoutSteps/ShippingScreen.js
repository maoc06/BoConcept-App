import React, {useState, useEffect} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';

import Text from '../../components/texts/Text';
import Button from '../../components/buttons/Button';
import ActivityIndicator from '../../components/ActivityIndicator';
import {RadioButton, ErrorMessage} from '../../components/forms';
import {SelectAddress, AddNewContainer} from '../../components/lists';
import useApi from '../../hooks/useApi';
import useAuth from '../../hooks/useAuth';
import useCart from '../../hooks/useCart';
import addressApi from '../../api/address';
import shippingMethodsApi from '../../api/shippingMethods';
import colors from '../../config/colors';
import routes from '../../navigation/routes';

function ShippingScreen({setStep, navigation}) {
  const {user} = useAuth();
  const {cart, setCartBillingAddress, setCartShippingMethod} = useCart();
  const getCustomerAddressApi = useApi(addressApi.getAddressCustomer);
  const getShippingMethodsApi = useApi(shippingMethodsApi.getShippingMethods);
  const [customerAddress, setCustomerAddress] = useState();
  const [errorBillingAddress, setErrorBillingAddress] = useState(false);

  useEffect(() => {
    getCustomerAddressApi.request({email: user.info.email});
    getShippingMethodsApi.request();
  }, []);

  useEffect(() => {
    setCustomerAddress(getCustomerAddressApi.data.data);
  });

  const handleSelectShippigMethod = (value) => {
    setCartShippingMethod(value);
  };

  const handleSelectAddress = (value) => {
    setErrorBillingAddress(false);
    setCartBillingAddress(value);
  };

  const handleSubmit = () => {
    if (cart.billingAddressId === null) {
      setErrorBillingAddress(true);
      return;
    }
    setStep(2);
  };

  const renderShippingMethodsList = () => {
    return (
      <View style={styles.shippingMethod}>
        <Text style={styles.text}>Shipping method</Text>

        <FlatList
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

  const renderHeaderList = () => {
    return (
      <>
        <ErrorMessage
          error="Select a shipping address"
          visible={errorBillingAddress}
        />
        <Text style={styles.text}>Select your address</Text>
        {renderEmptyMessage()}
      </>
    );
  };

  const renderFooterList = () => {
    return (
      <>
        <AddNewContainer
          title="+ Add new address"
          onPress={() => navigation.navigate(routes.ADD_NEW_ADDRESS)}
        />
        {renderShippingMethodsList()}
      </>
    );
  };

  const renderEmptyMessage = () => {
    if (customerAddress !== undefined) {
      if (customerAddress.length === 0) {
        return (
          <Text style={styles.empty}>
            You don't have address yet. Add a new one.
          </Text>
        );
      }
    }
    return null;
  };

  return (
    <>
      <ActivityIndicator
        visible={getCustomerAddressApi.loading || getShippingMethodsApi.loading}
      />

      <FlatList
        fadingEdgeLength={50}
        ListHeaderComponent={renderHeaderList()}
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
        ListFooterComponent={renderFooterList()}
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
  empty: {
    paddingVertical: 15,
    paddingLeft: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.whiteAccent,
  },
});

export default ShippingScreen;
