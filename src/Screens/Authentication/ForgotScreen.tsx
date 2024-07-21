import React, { useEffect, useState } from 'react'
import { Image, ImageBackground, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Background from '../../Assets/background2.jpg'
import LoginButtonComponent from '../../Components/Auth/LoginButtonComponent';
import AuthInputComponent from '../../Components/Auth/AuthInputComponent';
import { useAuth } from '../../Context/UserContext';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../Types/NavigationTypes';
import ColorGuide from '../../ColorGuide';

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'AccessCodeScreen'>;

const ForgotScreen = () => {
  const route = useRoute<ProfileScreenRouteProp>();

  const navigation = useNavigation()

  const { ResetUsersPassword } = useAuth()

  const [username, setUsername] = useState<string>('')
  const [keyboardMargin, setKeyboardMargin] = useState('mb-12');

  const updateAccessCode = (text: string) => {
    setUsername(text)
  }

  const SubmitLogin = () => {
    ResetUsersPassword(username, navigation)
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
                value={username}
                handleFunction={updateAccessCode}
                secure={false}
                placeholder={'username...'}
                multiline={false}
              />
              <LoginButtonComponent label={'Reset Password'} handleFunction={SubmitLogin}/>
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

export default ForgotScreen