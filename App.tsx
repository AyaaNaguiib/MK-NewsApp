import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './src/navigation/mainStack';
import Toast from 'react-native-toast-message';
import './src/locals/i18n';  

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <MainStack />
        <Toast />
      </NavigationContainer>
    </QueryClientProvider>
  );
}

