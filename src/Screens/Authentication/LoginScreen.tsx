import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Image, ImageBackground, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Background from '../../Assets/background2.jpg'
import LoginButtonComponent from '../../Components/Auth/LoginButtonComponent';
import AuthInputComponent from '../../Components/Auth/AuthInputComponent';
import { useAuth } from '../../Context/UserContext';
import { useNavigation } from '@react-navigation/native';
import { signOut } from 'aws-amplify/auth';
import ColorGuide from '../../ColorGuide';

const LoginScreen = () => {
  const navigation = useNavigation()
  const { grabCurrentUser, signInUser , loginLoading} = useAuth()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [keyboardMargin, setKeyboardMargin] = useState('mb-12');

  useEffect(() => {
    grabCurrentUser()
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
    console.log('login into account')
    signInUser(username, password)
  }

  const SignoutUser = () => {
    signOut()
      .then((response) => {
        console.log('logged out')
      })
      .catch((error) => {
        console.log(error)
      })
  }
  
  return (
    <ImageBackground source={Background} resizeMode="cover" className="w-screen h-screen absolute z-0" style={{backgroundColor: ColorGuide['bg-dark']}}>
      <View className="w-screen h-screen bg-black opacity-60 absolute z-1"></View>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 justify-between items-center pt-24">
            <View className="items-center">
              <Text className="text-4xl text-white font-bold">Grubber</Text>
              <Text className="text-2xl text-white font-semibold">Discover | Savor | Enjoy</Text>
            </View>
            <View className={`w-11/12 items-center ${keyboardMargin}`}>
              <View className="w-full flex flex-col items-start">
                <Text className="text-white text-4xl font-semibold mb-6">Login</Text>
              </View>
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
              <View className='flex flex-row w-full justify-end mt-4'>
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
    </ImageBackground>
  );
};

export default LoginScreen