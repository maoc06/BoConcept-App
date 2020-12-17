import React from 'react';
import {useState} from 'react';
import {View, StyleSheet} from 'react-native';

import Screen from '../components/Screen';
import ButtonStep from '../components/ButtonStep';
import ShippingScreen from './CheckoutSteps/ShippingScreen';
import PaymentScreen from './CheckoutSteps/PaymentScreen';
import SummaryScreen from './CheckoutSteps/SummaryScreen';

function CheckoutScreen() {
  const [step, setStep] = useState(1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <ShippingScreen setStep={setStep} />;
      case 2:
        return <PaymentScreen setStep={setStep} />;
      case 3:
        return <SummaryScreen />;
      default:
        return null;
    }
  };

  return (
    <Screen>
      <View style={styles.stepsContainer}>
        <ButtonStep
          title="1. Shipping"
          buttonStep={1}
          currStep={step}
          onPress={() => setStep(1)}
        />

        <ButtonStep
          title="2. Payment"
          buttonStep={2}
          currStep={step}
          onPress={() => setStep(2)}
        />

        <ButtonStep
          title="3. Summary"
          buttonStep={3}
          currStep={step}
          onPress={() => setStep(3)}
        />
      </View>

      <View style={styles.innerContainer}>{renderStep()}</View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxHeight: 25,
    marginBottom: 40,
  },
  innerContainer: {
    flex: 1,
  },
});

export default CheckoutScreen;
