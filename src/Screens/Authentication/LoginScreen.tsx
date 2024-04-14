import React, { useState } from 'react'
import { Image, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, View } from 'react-native'
import Background from '../../Assets/restaurant.jpg'

const LoginScreen = () => {

  const [textString, setTextString] = useState('')

  const updateText = (text: string) => {

  }
  
  return (
    <ImageBackground source={Background} resizeMode="cover" className="w-screen h-screen absolute z-0">
      <View className="w-screen h-screen bg-black opacity-50 absolute z-1"></View>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              <View className="flex-1 justify-between items-center pt-32">
                <View className="items-center">
                  <Text className="text-4xl text-white font-bold">Grubber</Text>
                  <Text className="text-2xl text-white">Discover | Savor | Enjoy</Text>
                </View>
                <View className='w-full items-center'>
                  <TextInput
                    value={textString}
                    onChangeText={updateText}
                    placeholder="Text"
                    className="h-8 w-4/5 bg-white py-4 mb-12"
                  />
                  <TextInput
                    value={textString}
                    onChangeText={updateText}
                    placeholder="Text"
                    className="h-8 w-4/5 bg-white py-4 mb-20"
                  />
                </View>
              </View>
            </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default LoginScreen