import {View,Text,TouchableOpacity,TextInput,ActivityIndicator,} from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import StackNames from '../../navigation/stackNames';
import { MainStackParamList } from '../../navigation/mainStack';
import styles from './styles';
import { useLogin } from '../../utils/helpers/useLogin';
import FormInput from '../../components/formInput/FormInput';
import LoginBtn from '../../components/btn/LoginButton';
import React from 'react';

const LoginSchema = Yup.object().shape({
 username: Yup.string().trim()
  .matches(/^\+20[1][0-9]{9}$/,'Please enter a valid  mobile number')
    .required('Please enter your mobile number'),

    password: Yup.string()
    .trim()
    .min(8, 'Password must be at least 8 characters')
    .required('Please enter your password'),
});

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  const {
    mutate: login,
    isPending,
    error,
  } = useLogin(
    data => {
      console.log('Login success:', data);
      navigation.navigate(StackNames.MainTabs);
    },
    err => {
      console.log('Login error:', err.message);
    },
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={values => {
          login({ mobile: values.username, password: values.password });
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isValid,
          dirty,
        }) => (
          <>
            <View style={styles.formCont}>
              <FormInput
                label="Mobile Number"
                placeholder="Enter your mobile number"
                value={values.username}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                error={errors.username}
                touched={touched.username}
              />
              <FormInput
                label="Password"
                placeholder="Enter your password"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                error={errors.password}
                touched={touched.password}
                isPassword
              />
            </View>

            {error && (
              <Text
                style={{ color: 'red', marginBottom: 10, textAlign: 'center' }}
              >
                {error.message}
              </Text>
            )}
            <LoginBtn
              title="Login"
              onPress={() => handleSubmit()}
              loading={isPending}
              disabled = {!isValid || !dirty || isPending}
            />
          </>
        )}
      </Formik>
    </View>
  );
}
