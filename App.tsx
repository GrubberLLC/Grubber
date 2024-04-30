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

Amplify.configure(amplifyconfig);

function App(): React.JSX.Element {

  const { signOutUser, userAccount } = useAuth()

  const navigateAuth = () => {
    return(
      <View className={`flex-1`}>
        <StatusBar barStyle="light-content"/>
        <AuthenticationNavigation />
      </View>
    )
  }

  const navigateContent = () => {
    return(
      <View>
        <StatusBar barStyle="light-content" translucent={false} backgroundColor={'black'} />
        <SafeAreaView>
          {/* <BottomTabNavigation /> */}
          <Text className={`text-white`}>Content</Text>
          <TouchableOpacity onPress={() => {signOutUser()}}>
            <Text className={`text-white mt-8`}>logout</Text>
          </TouchableOpacity>
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

