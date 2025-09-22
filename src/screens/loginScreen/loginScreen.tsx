import { View, Text, TouchableOpacity } from 'react-native';
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
import Toast from 'react-native-toast-message';
import { saveUserData, getUserData } from '../../utils/helpers/storage'; 
import { useTranslation } from 'react-i18next';
import i18n from '../../locals/i18n';


const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .trim()
    .matches(/^\+20[1][0-9]{9}$/, 'Please enter a valid mobile number')
    .required('Please enter your mobile number'),
  password: Yup.string()
    .trim()
    .min(8, 'Password must be at least 8 characters')
    .required('Please enter your password'),
});

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  const { t } = useTranslation();

  const { mutate: login, isPending } = useLogin(
    async data => {
      try {
        await saveUserData({
          mobile: data.mobile,
          password: data.password,
        });
        const storedUser = await getUserData();
        console.log("Stored user in AsyncStorage:", storedUser);

        navigation.navigate(StackNames.MainTabs);
      } catch (err) {
        console.log('Storage error:', err);
      }
    },
    err => {
      Toast.show({
        type: 'error',
        text1: 'loginFailed',
        text2: err.message,
        position: 'bottom',
        visibilityTime: 4000,
      });
    },
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('login')}</Text>

      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={values => {
          login({ mobile: values.username, password: values.password });
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, dirty }) => (
          <>
            <View style={styles.formCont}>
              <FormInput
                label={t('Mobile Number')}
                placeholder={t('Enter your mobile number')}
                value={values.username}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                error={errors.username}
                touched={touched.username}
              />
              <FormInput
                label={t('Password')}
                placeholder={t('Enter your password')}
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                error={errors.password}
                touched={touched.password}
                isPassword
              />
            </View>

            <LoginBtn
              title={t('login')}
              onPress={() => handleSubmit()}
              loading={isPending}
              disabled={!isValid || !dirty || isPending}
            />


            <View style={{ flexDirection: 'row', marginTop: 15, justifyContent: 'center' }}>
              <TouchableOpacity
                onPress={() => i18n.changeLanguage('ar')}
                style={{
                  backgroundColor: 'gold',
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  marginHorizontal: 5,
                }}
              >
                <Text style={{ fontSize: 12 }}>عربي</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => i18n.changeLanguage('en')}
                style={{
                  backgroundColor: 'gold',
                  paddingVertical: 4,
                  paddingHorizontal: 10,
                  marginHorizontal: 5,
                }}
              >
                <Text style={{ fontSize: 12 }}>English</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
}

