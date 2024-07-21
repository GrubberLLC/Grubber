import React, { useEffect, useState } from 'react'
import { Alert, Image, ImageBackground, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Background from '../../Assets/background2.jpg'
import LoginButtonComponent from '../../Components/Auth/LoginButtonComponent';
import AuthInputComponent from '../../Components/Auth/AuthInputComponent';
import { useAuth } from '../../Context/UserContext';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../Types/NavigationTypes';
import ColorGuide from '../../ColorGuide';
import { resetPassword } from 'aws-amplify/auth';

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'AccessCodeScreen'>;

const ResetPasswordScreen = () => {
  const navigation = useNavigation()

  const route = useRoute<ProfileScreenRouteProp>();
  const params = route.params

  const { passwordResetWithUsername } = useAuth()

  const [keyboardMargin, setKeyboardMargin] = useState('mb-12');

  const [resetCode, setResetCode] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [verify, setVerify] = useState<string>('')

  const [validPassword, setValidPassword] = useState<boolean>(false)
  const [matchingVerify, setMatchingVerify] = useState<boolean>(false)

  const handleAccessCodeChange = (text: string) => {
    setResetCode(text)
  }

  const handlePassword = (text: string) => {
    const isValidLength = text.length >= 8;
    const hasUpperCase = /[A-Z]/.test(text);
    const hasNumber = /[0-9]/.test(text);
    if (isValidLength && hasUpperCase && hasNumber) {
      setValidPassword(true)
    } else {
      setValidPassword(false)
    }
    if (text === verify) {
      setMatchingVerify(true)
    } else {
      setMatchingVerify(false)
    }
    setPassword(text)
  }

  const handleVerify = (text: string) => {
    if (text === password) {
      setMatchingVerify(true)
    } else {
      setMatchingVerify(false)
    }
    setVerify(text)
  }

  const handlePasswordReset = () => {
    if (matchingVerify && validPassword) {
      passwordResetWithUsername(params.username, resetCode, password, navigation)
    } else {
      if(!matchingVerify){
        Alert.alert(
          'Invalid Password',
          'Password & Verify don\'t match'
        )
      }
      if(!validPassword){
        Alert.alert(
          'Invalid Password',
          'Password must include Capital, Number, and 8+ Chars'
        )
      }
    }
  }

  return (
    <View className="w-screen h-screen absolute z-0" style={{backgroundColor: ColorGuide['bg-dark']
    }}>
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
                <Text className="text-white text-4xl font-semibold mb-6">Confirm Username:</Text>
              </View>
              <AuthInputComponent 
                label='User'
                value={resetCode}
                handleFunction={handleAccessCodeChange}
                secure={false}
                placeholder={'reset code...'}
                multiline={false}
              />
              <AuthInputComponent 
                label='Lock'
                value={password}
                handleFunction={handlePassword}
                secure={true}
                placeholder={'password...'}
                multiline={false}
              />
              <AuthInputComponent 
                label='Lock'
                value={verify}
                handleFunction={handleVerify}
                secure={true}
                placeholder={'verify password...'}
                multiline={false}
              />
              <LoginButtonComponent label={'Reset Password'} handleFunction={handlePasswordReset}/>
              <View className='w-full flex flex-row justify-center mt-5'>
                <TouchableOpacity onPress={() => {navigation.goBack()}}>
                  <Text className="text-white font-bold ml-1">
                    Go Back
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}

export default ResetPasswordScreen