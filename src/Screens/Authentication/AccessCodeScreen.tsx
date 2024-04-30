import React, { useEffect, useState } from 'react'
import { Image, ImageBackground, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Background from '../../Assets/background2.jpg'
import LoginButtonComponent from '../../Components/Inputs/LoginButtonComponent';
import AuthInputComponent from '../../Components/Inputs/AuthInputComponent';
import { useAuth } from '../../Context/UserContext';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../Types/NavigationTypes';

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'AccessCodeScreen'>;

const AccessCodeScreen = () => {
  const route = useRoute<ProfileScreenRouteProp>();
  const params = route.params

  const navigation = useNavigation()

  const { confirmEmailSignup, validAccessCode, resendConfirmationCode } = useAuth()

  const [accessCode, setAccessCode] = useState<string>('')
  const [keyboardMargin, setKeyboardMargin] = useState('mb-12');

  const updateAccessCode = (text: string) => {
    setAccessCode(text)
  }

  const SubmitLogin = () => {
    confirmEmailSignup(params.username, accessCode, navigation)
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
          <View className="flex-1 justify-between items-center pt-24">
            <View className="items-center">
              <Text className="text-4xl text-white font-bold">Grubber</Text>
              <Text className="text-2xl text-white font-semibold">Discover | Savor | Enjoy</Text>
            </View>
            <View className={`w-11/12 items-center ${keyboardMargin}`}>
              <View className="w-full flex flex-col items-start">
                <Text className="text-white text-4xl font-semibold mb-b">Confirm Email Account:</Text>
              </View>
              {
                validAccessCode
                  ? <Text>Invalid Access Code!</Text>
                  : null
              }
              <AuthInputComponent 
                label='Hash'
                value={accessCode}
                handleFunction={updateAccessCode}
                secure={false}
                placeholder={'access code...'}
                multiline={false}
              />
              <LoginButtonComponent label={'Verify Email'} handleFunction={SubmitLogin}/>
              <View className='w-full flex flex-row justify-center mt-5'>
                <TouchableOpacity onPress={() => {resendConfirmationCode(params.username)}}>
                  <Text className="text-white font-bold ml-1">
                    Resend Code
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  )
}

export default AccessCodeScreen