import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ProgressProvider } from './src/hooks/useProgress';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <ProgressProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </ProgressProvider>
    </SafeAreaProvider>
  );
}
