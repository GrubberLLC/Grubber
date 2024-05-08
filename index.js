import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { AuthProvider } from './src/Context/UserContext'; // Adjust path as needed
import { PostProvider } from './src/Context/PostContext';

const RootApp = () => (
  <AuthProvider>
    <PostProvider>
      <App />
    </PostProvider>
  </AuthProvider>
);

AppRegistry.registerComponent(appName, () => RootApp);