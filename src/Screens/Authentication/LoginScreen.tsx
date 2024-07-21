import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Image, ImageBackground, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Background from '../../Assets/background.jpg'
import Logo from '../../Assets/full-logo-red.png'
import LoginButtonComponent from '../../Components/Auth/LoginButtonComponent';
import AuthInputComponent from '../../Components/Auth/AuthInputComponent';
import { useAuth } from '../../Context/UserContext';
import { useNavigation } from '@react-navigation/native';
import { signOut } from 'aws-amplify/auth';
import ColorGuide from '../../ColorGuide';

const LoginScreen = () => {
  const navigation = useNavigation()
  const { signInUser , loginLoading, validLogin } = useAuth()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [keyboardMargin, setKeyboardMargin] = useState('mb-12');

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardMargin('mb-4');
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardMargin('mb-8');
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const updateUsername = (text: string) => {
    setUsername(text)
  }

  const updatePassword = (text: string) => {
    setPassword(text)
  }

  const SubmitLogin = () => {
    signInUser(username, password)
  }

  const SignoutUser = () => {
    signOut()
      .then((response) => {
      })
      .catch((error) => {
        console.error(error)
      })
  }
  
  return (
    <View className="w-screen h-screen absolute z-0" style={{backgroundColor: ColorGuide['bg-dark']}}>
      <View className="w-screen h-screen bg-black opacity-60 absolute z-1"></View>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 justify-between items-center pt-28">
            <View className="items-center">
              <View className='h-12 w-56 mb-3 flex flex-row justify-center'>
                <Image className='w-full h-full' source={Logo}/>
              </View>
              <Text className="text-2xl text-white font-semibold">Discover | Share | Enjoy</Text>
            </View>
            <View className={`w-11/12 items-center ${keyboardMargin}`}>
              <View className="w-full flex flex-col items-start">
                <Text className="text-white text-4xl font-semibold mb-4">Login</Text>
              </View>
              {
                validLogin 
                  ? null
                  : <View className='mb-2'><Text className='text-white font-bold text-base'>Username / Password don't match any record!</Text></View>
              }
              <AuthInputComponent 
                label='User'
                value={username}
                handleFunction={updateUsername}
                secure={false}
                placeholder={'username'}
                multiline={false}
              />
              <AuthInputComponent 
                label='Lock'
                value={password}
                handleFunction={updatePassword}
                secure={true}
                placeholder={'*******'}
                multiline={false}
              />
              <View className='flex flex-row w-full justify-end mt-2'>
                <TouchableOpacity onPress={() => {navigation.navigate('ForgotScreen')}}>
                  <Text className="text-white text-lg font-bold ml-1">
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </View>
              <LoginButtonComponent label={loginLoading ? 'Loading...' : 'Login' } handleFunction={SubmitLogin}/>
              <View className='w-full flex flex-row justify-center mt-5'>
                <Text className="text-white font-semibold">
                  Create an account:  
                </Text>
                <TouchableOpacity onPress={() => {navigation.navigate('SignupScreen')}}>
                  <Text className="text-white font-bold ml-1">
                    Signup
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen