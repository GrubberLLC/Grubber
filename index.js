import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { AuthProvider } from './src/Context/UserContext'; // Adjust path as needed

const RootApp = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

AppRegistry.registerComponent(appName, () => RootApp);