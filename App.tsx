import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import { useAuth } from './src/Context/UserContext';
import AuthenticationNavigation from './src/Navigation/AuthenticationNavigation';
import { Amplify } from 'aws-amplify';
import amplifyconfig from './src/amplifyconfiguration.json';
import BottomTabNavigation from './src/Navigation/BottomTabNavigation';
import ColorGuide from './src/ColorGuide';
import messaging from '@react-native-firebase/messaging';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';

Amplify.configure(amplifyconfig);

function App(): React.JSX.Element {
  const { userAccount, loading, grabInitialCurrentUser, appLoading } = useAuth();
  const [permissions, setPermissions] = useState({});

  useLayoutEffect(() => {
    grabInitialCurrentUser();
  }, []);

  useEffect(() => {
    // Request permission for iOS
    PushNotificationIOS.requestPermissions().then((data) => {
      setPermissions(data);
    });

    // Create notification channel for Android
    PushNotification.createChannel(
      {
        channelId: "default-channel-id",
        channelName: "Default Channel",
        channelDescription: "A default channel",
        playSound: false,
        soundName: "default",
        importance: 4,
        vibrate: true,
      },
      (created: any) => console.log(`createChannel returned '${created}'`)
    );

    // Handle foreground notifications
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      PushNotification.localNotification({
        channelId: "default-channel-id",
        title: remoteMessage.notification?.title,
        message: remoteMessage.notification?.body,
        userInfo: remoteMessage.data,
      });
    });

    // Handle background and quit notifications
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('Notification caused app to open from background state:', remoteMessage.notification);
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log('Notification caused app to open from quit state:', remoteMessage.notification);
        }
      });

    return () => {
      unsubscribe();
    };
  }, []);

  const navigateAuth = () => {
    return (
      <View className={`flex-1 w-full h-full`}>
        <StatusBar barStyle="light-content" />
        <AuthenticationNavigation />
      </View>
    );
  };

  const navigateContent = () => {
    return (
      <View className={'flex-1'}>
        <SafeAreaView className={'flex-1'}>
          <BottomTabNavigation />
        </SafeAreaView>
      </View>
    );
  };

  if (appLoading) {
    return (
      <View className='h-screen w-screen flex justify-center items-center' style={{ backgroundColor: ColorGuide['bg-dark'] }}>
        <ActivityIndicator size="large" color="#e94f4e" />
      </View>
    );
  }

  return (
    <View className='h-screen w-screen' style={{ backgroundColor: ColorGuide['bg-dark'] }}>
      {userAccount?.userId ? navigateContent() : navigateAuth()}
    </View>
  );
}

export default App;
