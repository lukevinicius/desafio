import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ThemeProvider } from 'styled-components'
import theme from './src/global/styles/theme';

import { MarkerProvider } from './src/hooks/markers'
import { Routes } from './src/routes';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <MarkerProvider>
        <Routes />
        <StatusBar style="auto" />
      </MarkerProvider>
    </ThemeProvider>
  );
}
