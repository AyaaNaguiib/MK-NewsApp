import { View, Text, Image } from 'react-native';
import { CommonActions, NavigationProp, useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import StackNames from '../../navigation/stackNames';
import { MainStackParamList } from '../../navigation/mainStack';
import styles from './styles';
import { useLogin } from '../../utils/helpers/useLogin';
import FormInput from '../../components/formInput/FormInput';
import CustomBtn from '../../components/btn/CustomBtn';
import React, { useState, useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { saveUserData, getUserData } from '../../utils/helpers/storage';
import { useTranslation } from 'react-i18next';
import i18n, { changeAppLanguage } from '../../locals/i18n';

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

  const [currentLang, setCurrentLang] = useState(i18n.language);

  
  useEffect(() => {
    const checkUser = async () => {
      const user = await getUserData();
      console.log("Auto login check, stored user:", user);

      if (user) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: StackNames.MainTabs }],
          })
        );
      }
    };

    checkUser();
  }, [navigation]);

  const toggleLanguage = async () => {
    const newLang = currentLang === 'ar' ? 'en' : 'ar';
    await changeAppLanguage(newLang);  
    setCurrentLang(newLang);
  };

  const { mutate: login, isPending } = useLogin(
    async data => {
      try {
        console.log("API response:", data);
       
        const userWithRole = { ...data, role: 'user' };
        await saveUserData(userWithRole);

        const storedUser = await getUserData();
        console.log("Stored user in AsyncStorage:", storedUser);

        navigation.dispatch(
          CommonActions.reset({
            index:0,
            routes:[{name: StackNames.MainTabs}]
          })
        );
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
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 20 }}>
        <CustomBtn onPress={toggleLanguage}>
          <Image
            source={{
              uri:
                currentLang === 'ar'
                  ? 'https://flagcdn.com/w40/us.png'
                  : 'https://flagcdn.com/w40/eg.png',
            }}
            style={{ width: 25, height: 10 }}
            resizeMode="contain"
          />
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
            {currentLang === 'ar' ? 'English' : 'العربية'}
          </Text>
        </CustomBtn>
      </View>

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

            <CustomBtn
              title={t('login')}
              onPress={() => handleSubmit()}
              loading={isPending}
              disabled={!isValid || !dirty || isPending}
            />

            <CustomBtn
              title={t('Continue as Guest')}
              onPress={async () => {
                await saveUserData({ role: 'guest' });
                navigation.dispatch(
                  CommonActions.reset({
                    index:0,
                    routes:[{name: StackNames.MainTabs}],
                  })
                )
              }}
              style={{ marginTop: 10 }}
            />
          </>
        )}
      </Formik>
    </View>
  );
}


