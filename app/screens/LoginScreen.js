import React, {useState} from 'react';
import {StyleSheet, ImageBackground} from 'react-native';
import * as Yup from 'yup';

import Screen from '../components/Screen';
import TextTitle from '../components/texts/TextTitle';
import Button from '../components/buttons/Button';
import ActivityIndicator from '../components/ActivityIndicator';
import {ErrorMessage, Form, FormField, SubmitButton} from '../components/forms';
import authApi from '../api/auth';
import useAuth from '../hooks/useAuth';
import routes from '../navigation/routes';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(6).label('Password'),
});

function LoginScreen({navigation}) {
  const auth = useAuth();
  const [loginFailed, setLoginFailed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async ({email, password}) => {
    setLoading(true);
    const result = await authApi.signIn(email, password);
    if (!result.ok) {
      setLoading(false);
      return setLoginFailed(true);
    }
    setLoginFailed(false);
    setLoading(false);
    auth.logIn(result.data.token);
  };

  return (
    <ImageBackground
      blurRadius={3}
      style={styles.background}
      source={require('../assets/background-first-screen.png')}>
      <ActivityIndicator visible={loading} />

      <Screen style={styles.container}>
        <TextTitle style={styles.title}>Log into{'\n'}your account</TextTitle>

        <Form
          initialValues={{email: '', password: ''}}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}>
          <ErrorMessage
            error="Invalid email and/or password."
            visible={loginFailed}
          />

          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            name="email"
            placeholder="Email"
            label="Email"
            textContentType="emailAddress"
            color="secondary"
          />

          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            name="password"
            placeholder="Password"
            label="Password"
            secureTextEntry
            textContentType="password"
            color="secondary"
          />

          <SubmitButton
            title="Log In"
            backgroundColor="secondary"
            textColor="primary"
          />

          <Button
            title="Don't have an account? Sign up"
            backgroundColor="transparent"
            alignText="flex-start"
            marginVertical={20}
            onPress={() => navigation.navigate(routes.REGISTER)}
          />
        </Form>
      </Screen>
    </ImageBackground>
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

export default LoginScreen;
