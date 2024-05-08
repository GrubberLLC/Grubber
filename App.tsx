import React, { useEffect } from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { AuthProvider, useAuth } from './src/Context/UserContext';
import AuthenticationNavigation from './src/Navigation/AuthenticationNavigation';
import { Amplify } from 'aws-amplify';
import amplifyconfig from './src/amplifyconfiguration.json';
import BottomTabNavigation from './src/Navigation/BottomTabNavigation';

Amplify.configure(amplifyconfig);

function App(): React.JSX.Element {

  const { signOutUser, userAccount } = useAuth()

  const navigateAuth = () => {
    return(
      <View className={`flex-1 w-full h-full`}>
        <StatusBar barStyle="light-content"/>
        <AuthenticationNavigation />
      </View>
    )
  }

  const navigateContent = () => {
    return(
      <View className={'flex-1'}>
        <SafeAreaView className={'flex-1'}>
          <BottomTabNavigation />
        </SafeAreaView>
      </View>
    )
  }

  return (
    <View className={`bg-neutral-900 h-screen w-screen`}>
      {
        userAccount?.userId
          ? navigateContent()
          : navigateAuth()
      }
    </View>
  );
}

export default App;

