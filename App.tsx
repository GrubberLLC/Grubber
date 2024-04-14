import React from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { AuthProvider, useAuth } from './src/Context/UserContext';
import AuthenticationNavigation from './src/Navigation/AuthenticationNavigation';

function App(): React.JSX.Element {

  const { currentUser } = useAuth();

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
        </SafeAreaView>
      </View>
    )
  }

  return (
    <View className={`bg-neutral-900 h-screen w-screen`}>
      <AuthProvider>
        {
          currentUser === null 
            ? navigateAuth()
            : navigateContent()
        }
      </AuthProvider>
    </View>
  );
}

export default App;

