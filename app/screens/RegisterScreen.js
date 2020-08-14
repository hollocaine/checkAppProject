import React, { useState, useEffect } from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import * as Yup from 'yup';

import Screen from '../components/Screen';
import { Form, FormField, SubmitButton } from '../components/forms';
import usersApi from '../api/users';
import useAuth from '../auth/useAuth';
import authApi from '../api/auth';
import useApi from '../hooks/useApi';
import ActivityIndicator from '../components/ActivityIndicator';

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label('Name'),
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(4).label('Password'),
});

function RegisterScreen() {
  const registerApi = useApi(usersApi.register);
  const loginApi = useApi(authApi.login);
  const auth = useAuth();
  const [error, setError] = useState();
  useEffect(() => {
    return () => {
      console.log('cleaned up');
    };
  }, []);
  const handleSubmit = async (userInfo) => {
    //Using the userInfo object allows for adding in more registration fields
    const result = await registerApi.request(userInfo);
    if (!result.ok) {
      if (result.data) setError(result.data.error);
      else {
        setError('An unexpected error occurred.');
        console.log(result); //TODO::Should use a log service on live
      }
      return;
    }
    //User receives token from server
    const { data: authToken } = await loginApi.request(
      userInfo.email,
      userInfo.password
    );
    auth.logIn(authToken);
  };
  return (
    <>
      <ActivityIndicator visible={registerApi.loading || loginApi.loading} />
      <ImageBackground
        source={require('../assets/registration.png')}
        style={styles.image}
        blurRadius={2}
      >
        <Screen style={styles.container}>
          <Form
            initialValues={{ name: '', email: '', password: '' }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <FormField
              autoCorrect={false}
              icon="account"
              name="name"
              placeholder="Name"
            />
            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="email"
              keyboardType="email-address"
              name="email"
              placeholder="Email"
              textContentType="emailAddress"
            />
            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="lock"
              name="password"
              placeholder="Password"
              secureTextEntry
              textContentType="password"
            />
            <SubmitButton title="Register" />
          </Form>
        </Screen>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    backgroundColor: '#e9f8f9',
  },
});

export default RegisterScreen;
