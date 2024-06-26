import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { AuthProvider } from './src/Context/UserContext'; // Adjust path as needed
import { PostProvider } from './src/Context/PostContext';
import { ExploreProvider } from './src/Context/ExploreContext';
import { SearchProvider } from './src/Context/SearchContext';
import { ListProvider } from './src/Context/ListContext';

const RootApp = () => (
  <AuthProvider>
    <PostProvider>
      <ExploreProvider>
        <SearchProvider>
          <ListProvider>
            <App />
          </ListProvider>
        </SearchProvider>
      </ExploreProvider>
    </PostProvider>
  </AuthProvider>
);

AppRegistry.registerComponent(appName, () => RootApp);