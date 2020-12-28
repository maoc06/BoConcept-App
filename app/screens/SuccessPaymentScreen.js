import React from 'react';
import {Modal, View, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';

import Text from '../components/texts/Text';
import Button from '../components/buttons/Button';
import colors from '../config/colors';
import routes from '../navigation/routes';

function SuccessPaymentScreen({visible = false, navigation, number}) {
  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <LottieView
            autoPlay
            loop={false}
            duration={2000}
            source={require('../assets/animations/success.json')}
            style={styles.animation}
          />

          <Text style={styles.title}>Payment Successfully</Text>

          <Text style={styles.subtitle}>Transaction Number: {number}</Text>
        </View>

        <View>
          <Text style={{textAlign: 'center'}}>
            We have sent emails with the payment information and the follow-up
            guide.
          </Text>

          <Button
            title="Go Home"
            onPress={() => navigation.navigate(routes.HOME)}
            marginVertical={75}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  animation: {
    width: 70,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  innerContainer: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 15,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.whiteAccent,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    paddingVertical: 15,
  },
  subtitle: {
    color: colors.medium,
  },
});

export default SuccessPaymentScreen;
