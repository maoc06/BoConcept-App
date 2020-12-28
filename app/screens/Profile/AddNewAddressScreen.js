import React from 'react';
import * as Yup from 'yup';

import Screen from '../../components/Screen';
import {Form, FormField, SubmitButton} from '../../components/forms';
import useApi from '../../hooks/useApi';
import useAuth from '../../hooks/useAuth';
import addressApi from '../../api/address';

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(2).label('Name'),
  billing_address: Yup.string().required().min(6).label('Address'),
  zip_code: Yup.string().required().min(2).label('ZIP Code'),
  city: Yup.string().required().min(2).label('City'),
});

function AddNewAddressScreen() {
  const {user} = useAuth();
  const saveAddressApi = useApi(addressApi.saveAddress);

  const handleSubmit = (addressInfo) => {
    addressInfo['customer_owner'] = user.info.email;
    addressInfo['is_default'] = 'N';
    saveAddressApi.request(addressInfo);
  };

  return (
    <Screen>
      <Form
        initialValues={{name: '', billing_address: '', zip_code: '', city: ''}}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}>
        <FormField name="name" placeholder="Name" label="Name" />

        <FormField
          name="billing_address"
          placeholder="Address"
          label="Address"
          autoCompleteType="street-address"
        />

        <FormField
          name="zip_code"
          placeholder="ZIP Code"
          label="ZIP Code"
          autoCompleteType="postal-code"
          textContentType="postalCode"
        />

        <FormField
          name="city"
          placeholder="City"
          label="City"
          textContentType="addressCity"
        />

        <SubmitButton title="Save" />
      </Form>
    </Screen>
  );
}

export default AddNewAddressScreen;
