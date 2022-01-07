import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ThemeProvider } from 'styled-components'
import theme from './src/global/styles/theme';

import { MarkerProvider } from './src/hooks/markers'
import { AddMarker } from './src/screens/AddMaker';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <MarkerProvider>
        <AddMarker />
        <StatusBar style="auto" />
      </MarkerProvider>
    </ThemeProvider>
  );
}
