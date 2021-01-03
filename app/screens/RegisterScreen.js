import React, {useState} from 'react';
import {ScrollView, StyleSheet, ImageBackground} from 'react-native';
import * as Yup from 'yup';

import Screen from '../components/Screen';
import TextTitle from '../components/texts/TextTitle';
import Button from '../components/buttons/Button';
import ActivityIndicator from '../components/ActivityIndicator';
import {
  ErrorMessage,
  Form,
  FormField,
  CheckBox,
  SubmitButton,
} from '../components/forms';
import authApi from '../api/auth';
import useApi from '../hooks/useApi';
import useAuth from '../hooks/useAuth';
import routes from '../navigation/routes';

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required().label('First Name'),
  last_name: Yup.string().required().label('Last Name'),
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(4).label('Password'),
  terms: Yup.bool().oneOf([true], 'Must accept Terms of Service'),
});

function RegisterScreen({navigation}) {
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
      userInfo.password
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
          <ScrollView>
            <TextTitle style={styles.title}>Create{'\n'}your account</TextTitle>

            <Form
              initialValues={{
                first_name: '',
                last_name: '',
                email: '',
                password: '',
                terms: false,
              }}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}>
              <ErrorMessage error={error} visible={error} />

              <FormField
                autoCorrect={false}
                name="first_name"
                placeholder="Type your first name"
                label="First Name"
                color="secondary"
              />

              <FormField
                autoCorrect={false}
                name="last_name"
                placeholder="Type your last name"
                label="Last Name"
                color="secondary"
              />

              <FormField
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                name="email"
                placeholder="Type your Email"
                label="Email"
                textContentType="emailAddress"
                color="secondary"
              />

              <FormField
                autoCapitalize="none"
                autoCorrect={false}
                name="password"
                placeholder="Type your password"
                label="Password"
                secureTextEntry
                textContentType="password"
                color="secondary"
              />

              <CheckBox
                name="terms"
                children={
                  'By clicking Sing Up, you agree to our Terms of Servie and that you have read our Privacy Policy'
                }
                color="secondary"
              />

              <SubmitButton
                title="Sign Up"
                backgroundColor="secondary"
                textColor="primary"
              />

              <Button
                title="Already have account? Login"
                backgroundColor="transparent"
                textColor="primary"
                alignText="flex-start"
                marginVertical={20}
                onPress={() => navigation.navigate(routes.LOGIN)}
              />
            </Form>
          </ScrollView>
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
