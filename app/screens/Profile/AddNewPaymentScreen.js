import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import * as Yup from 'yup';

import Screen from '../../components/Screen';
import {Form, FormField, SubmitButton} from '../../components/forms';
import useApi from '../../hooks/useApi';
import useAuth from '../../hooks/useAuth';
import creditCardApi from '../../api/creditCard';

const validationSchema = Yup.object().shape({
  cardholders_name: Yup.string().required().min(5).label("Cardholder's name"),
  card_number: Yup.string()
    .required()
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(13)
    .max(16)
    .label('Card number'),
  expiry_month: Yup.string()
    .required()
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(1)
    .max(2)
    .label('Expiry month'),
  expiry_year: Yup.string()
    .required()
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(2)
    .max(4)
    .label('Expiry year'),
  cvv: Yup.number().required().min(3).label('cvc/cvv2'),
});

function AddNewPaymentScreen() {
  const {user} = useAuth();
  const savePaymentMethodApi = useApi(creditCardApi.saveCreditCrad);
  const [paymentId, setPaymentId] = useState();

  const handleSubmit = (cardInfo) => {
    cardInfo['credit_card_owner'] = user.info.email;
    cardInfo['pay_id'] = paymentId;
    savePaymentMethodApi.request(cardInfo);
  };

  return (
    <ScrollView>
      <Screen>
        <Form
          initialValues={{
            cardholders_name: '',
            card_number: '',
            expiry_month: '',
            expiry_year: '',
            cvv: '',
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}>
          <FormField
            name="cardholders_name"
            placeholder="Cardholder's name"
            label="Cardholder's name"
          />

          <FormField
            name="card_number"
            placeholder="Card number"
            label="Card number"
            keyboardType="phone-pad"
            textContentType="creditCardNumber"
            isCardNumber={true}
            setPaymentId={setPaymentId}
          />

          <FormField
            name="expiry_month"
            placeholder="Expiry month"
            label="Expiry month"
            keyboardType="phone-pad"
          />

          <FormField
            name="expiry_year"
            placeholder="Expiry year"
            label="Expiry year"
            keyboardType="phone-pad"
          />

          <FormField
            name="cvv"
            placeholder="cvc/cvv2"
            label="cvc/cvv2"
            keyboardType="phone-pad"
          />

          <SubmitButton title="Save" />
        </Form>
      </Screen>
    </ScrollView>
  );
}

export default AddNewPaymentScreen;
