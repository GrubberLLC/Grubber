import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { AuthProvider } from './src/Context/UserContext'; // Adjust path as needed
import { PostProvider } from './src/Context/PostContext';
import { ExploreProvider } from './src/Context/ExploreContext';

const RootApp = () => (
  <AuthProvider>
    <PostProvider>
      <ExploreProvider>
        <App />
      </ExploreProvider>
    </PostProvider>
  </AuthProvider>
);

AppRegistry.registerComponent(appName, () => RootApp);