import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_DATA_KEY = 'userData';
const APP_LANGUAGE_KEY = 'APP_LANGUAGE';

export const saveUserData = async (data: any) => {
  try {
    await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(data));
  } catch (err) {
    console.log('Error saving user data:', err);
  }
};

export const getUserData = async () => {
  try {
    const value = await AsyncStorage.getItem(USER_DATA_KEY);
    return value ? JSON.parse(value) : null;
  } catch (err) {
    console.log('Error reading user data:', err);
    return null;
  }
};

export const saveAppLanguage = async (lang: 'en' | 'ar') => {
  try {
    await AsyncStorage.setItem(APP_LANGUAGE_KEY, lang);
  } catch (err) {
    console.log('Error saving app language:', err);
  }
};

export const getAppLanguage = async () => {
  try {
    return await AsyncStorage.getItem(APP_LANGUAGE_KEY);
  } catch (err) {
    console.log('Error reading app language:', err);
    return null;
  }
};


