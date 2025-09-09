/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { Text, View } from 'react-native';
import HomeScreen from './src/screens/homescreen/HomeScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import mainStack from './src/navigation/mainStack';
import MainStack from './src/navigation/mainStack';
function App(): React.JSX.Element{
  return(
      <NavigationContainer>
      <MainStack  />
      </NavigationContainer>
    
  );
};
export default App;
