import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_DATA_KEY = 'userData';


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



