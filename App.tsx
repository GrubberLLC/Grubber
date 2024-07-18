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
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';

Amplify.configure(amplifyconfig);

function App(): React.JSX.Element {
  const { userAccount, loading, grabCurrentUser, userProfile } = useAuth();
  const [permissions, setPermissions] = useState({});

  useLayoutEffect(() => {
    grabCurrentUser();
    const type = 'notification';
    PushNotificationIOS.addEventListener(type, onRemoteNotification);
    return () => {
      PushNotificationIOS.removeEventListener(type);
    };
  }, []);

  useEffect(() => {
    if (userAccount?.userId) {
      requestFCMToken();
    }
  }, [userAccount]);

  const navigateAuth = () => {
    return (
      <View className={`flex-1 w-full h-full`}>
        <StatusBar barStyle="light-content"/>
        <AuthenticationNavigation />
      </View>
    );
  };

  const onRemoteNotification = (notification: any) => {
    const actionIdentifier = notification.getActionIdentifier();

    if (actionIdentifier === 'open') {
      // Perform action based on open action
    }

    if (actionIdentifier === 'text') {
      const userText = notification.getUserText();
    }
    const result = PushNotificationIOS.FetchResult.NoData;
    notification.finish(result);
  };

  const setNotificationCategories = () => {
    PushNotificationIOS.setNotificationCategories([
      {
        id: 'userAction',
        actions: [
          {id: 'open', title: 'Open', options: {foreground: true}},
          {
            id: 'ignore',
            title: 'Disruptive',
            options: {foreground: true, destructive: true},
          },
          {
            id: 'text',
            title: 'Text Input',
            options: {foreground: true},
            textInput: {buttonTitle: 'Send'},
          },
        ],
      },
    ]);
  };

  const requestFCMToken = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log('FCM Token:', fcmToken);
        // Here, you should send the token to your server to associate it with the user
        await storeFCMToken(fcmToken);
      } else {
        console.log('Failed to get FCM token');
      }
    }
  };

  const storeFCMToken = async (token: string) => {
    let url = `https://grubberapi.com/api/v1/profiles/fcm-token/${userProfile.user_id}`
    const data = {
      token: token
    }
    console.log('new token saved')
    axios.put(url, data)
      .then(response => {
        PushNotificationIOS.presentLocalNotification({
          alertTitle: 'FCM Token',
          alertBody: 'fcm token was stored',
        });
      })
      .catch(error => {
        console.error('Error storing fcm token in database:', error);
        throw error;
      });
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

  if (loading) {
    return (
      <View className='h-screen w-screen flex justify-center items-center' style={{backgroundColor: ColorGuide['bg-dark']}}>
        <ActivityIndicator size="large" color="#e94f4e" />
      </View>
    );
  }

  return (
    <View className='h-screen w-screen' style={{backgroundColor: ColorGuide['bg-dark']}}>
      {userAccount?.userId ? navigateContent() : navigateAuth()}
    </View>
  );
}

export default App;
