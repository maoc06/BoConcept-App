import React, {useEffect, useState} from 'react';
import {StyleSheet, ImageBackground} from 'react-native';
import * as Yup from 'yup';

import Screen from '../components/Screen';
import TitleText from '../components/TitleText';
import ActivityIndicator from '../components/ActivityIndicator';
import {ErrorMessage, Form, FormField, SubmitButton} from '../components/forms';
import authApi from '../api/auth';
import useApi from '../hooks/useApi';
import useAuth from '../auth/useAuth';

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required().label('First Name'),
  last_name: Yup.string().required().label('Last Name'),
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(4).label('Password'),
});

function RegisterScreen() {
  const registerApi = useApi(authApi.signUp);
  const loginApi = useApi(authApi.signIn);
  const auth = useAuth();
  const [error, setError] = useState();

  const handleSubmit = async (userInfo) => {
    const result = await registerApi.request(userInfo);

    if (!result.ok) {
      if (result.data) setError(result.data.error);
      else {
        setError('An unexpected error ocurred.');
        console.log(result);
      }
      return;
    }

    const resultLogin = await loginApi.request(
      userInfo.email,
      userInfo.password,
    );
    auth.logIn(resultLogin.data.token);
  };

  return (
    <>
      <ActivityIndicator visible={registerApi.loading || loginApi.loading} />

      <ImageBackground
        blurRadius={3}
        style={styles.background}
        source={require('../assets/background-first-screen.png')}>
        <Screen style={styles.container}>
          <TitleText style={styles.title}>Create{'\n'}your account</TitleText>

          <Form
            initialValues={{
              first_name: '',
              last_name: '',
              email: '',
              password: '',
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}>
            <ErrorMessage error={error} visible={error} />

            <FormField
              autoCorrect={false}
              name="first_name"
              placeholder="First Name"
            />

            <FormField
              autoCorrect={false}
              name="last_name"
              placeholder="Last Name"
            />

            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              name="email"
              placeholder="Email"
              textContentType="emailAddress"
            />

            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              name="password"
              placeholder="Password"
              secureTextEntry
              textContentType="password"
            />

            <SubmitButton title="Sign Up" />
          </Form>
        </Screen>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    justifyContent: 'center',
  },
  title: {
    marginBottom: 50,
  },
});

export default RegisterScreen;
