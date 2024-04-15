import React, { useEffect, useState } from 'react'
import { Image, ImageBackground, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Background from '../../Assets/restaurant.jpg'
import LoginButtonComponent from '../../Components/Inputs/LoginButtonComponent';
import AuthInputComponent from '../../Components/Inputs/AuthInputComponent';
import { useAuth } from '../../Context/UserContext';
import { useNavigation } from '@react-navigation/native';

const SignupScreen = () => {
  const navigation = useNavigation()
  
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

  const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [verify, setVerify] = useState<string>('')
  const [validUsername, setValidusername] = useState<boolean>(true)
  const [validEmai, setValidEmail] = useState<boolean>(true)
  const [validPassword, setValidPassword] = useState<boolean>(true)
  const [validVerify, setValidVerify] = useState<boolean>(true)
  const [keyboardMargin, setKeyboardMargin] = useState('mb-12');

  const updateUsername = (text: string) => {
    validateUsername(text)
    setUsername(text)
  }

  const updateEmail = (text: string) => {
    validateEmail(text)
    setEmail(text)
  }

  const updatePassword = (text: string) => {
    text.length > 0
      ? isValidPassword(text)
      : setValidPassword(true)
    text === verify 
      ? setValidVerify(true)
      : setValidVerify(false)
    setPassword(text)
  }

  const updateVerify = (text: string) => {
    password === text 
      ? setValidVerify(true)
      : setValidVerify(false)
    setVerify(text)
  }

  const checkAccount = () => {
    console.log('login into account')
    
    navigation.navigate('ProfileScreen')
  }

  const validateUsername = (username: string) => {
    console.log('validated')
  }

  const validateEmail = (username: string) => {
    console.log('validated')
  }

  function isValidPassword(password: string) {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    if (password.length > 8 && hasUpperCase && hasLowerCase && hasDigit) {
      setValidPassword(true)
    } else {
      setValidPassword(false)
    }
  }
  
  return (
    <ImageBackground source={Background} resizeMode="cover" className="w-screen h-screen absolute z-0">
      <View className="w-screen h-screen bg-black opacity-60 absolute z-1"></View>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 justify-end items-center pt-16">
            <View className={`w-11/12 items-center ${keyboardMargin}`}>
              <View className="w-full flex flex-col items-start">
                <Text className="text-white text-4xl font-semibold mb-b">Signup</Text>
              </View>
              <AuthInputComponent 
                label='User'
                value={username}
                handleFunction={updateUsername}
                secure={false}
                placeholder={'username'}
                multiline={false}
              />
              {
                validUsername
                  ? null 
                  : <Text className="text-white mt-3 font-bold">Username is not available.</Text>
              }
              <AuthInputComponent 
                label='Mail'
                value={email}
                handleFunction={updateEmail}
                secure={false}
                placeholder={'example@email.com'}
                multiline={false}
              />
              {
                validEmai
                  ? null 
                  : <Text className="text-white mt-3 font-bold">Email is already in use.</Text>
              }
              <AuthInputComponent 
                label='Lock'
                value={password}
                handleFunction={updatePassword}
                secure={true}
                placeholder={'*******'}
                multiline={false}
              />
              {
                validPassword
                  ? null 
                  : <Text className="text-white mt-3 font-bold">A_Z, a_z, 0_9, 8+ char.</Text>
              }
              <AuthInputComponent 
                label='Lock'
                value={verify}
                handleFunction={updateVerify}
                secure={true}
                placeholder={'*******'}
                multiline={false}
              />
              {
                validVerify
                  ? null 
                  : <Text className="text-white mt-3 font-bold">Password and Verify don't match.</Text>
              }
              <LoginButtonComponent label={'Signup'} handleFunction={checkAccount}/>
              <View className='w-full flex flex-row justify-center mt-5'>
                <Text className="text-white font-semibold">
                  Have an account:  
                </Text>
                <TouchableOpacity onPress={() => {navigation.navigate('LoginScreen')}}>
                  <Text className="text-white font-bold ml-1">
                    Login
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

export default SignupScreen