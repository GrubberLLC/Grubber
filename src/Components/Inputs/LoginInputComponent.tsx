import React from 'react'
import { Text, View } from 'react-native'
import * as Icons from 'react-native-feather';
import { TextInput } from 'react-native-gesture-handler';

interface LoginInputProps {
  label: string;
  value: string;
  handleFunction: (text: string) => void;
  secure: boolean;
  placeholder: string;
  multiline: boolean;
}

const LoginInputComponent: React.FC<LoginInputProps> = (props) => {
  const {label, value, handleFunction, secure, placeholder, multiline} = props


  const IconComponent = Icons[label]

  return (
    <View 
      className="flex flex-row  px-4 mt-6 items-center rounded-xl"
      style={{ backgroundColor: 'rgba(211, 211, 211, 0.40)' }}
    >
      {IconComponent ? <IconComponent className="mr-4" height={24} width={24} color="white" /> : null}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={'white'}
        autoCapitalize='none'
        returnKeyLabel='Done'
        secureTextEntry={secure}
        value={value}
        onChangeText={(text) => {handleFunction(text)}}
        multiline={multiline ? true : false}
        className="bg-white h-6 flex-1 my-4 mr-2 border-b-2 border-b-white text-white text-2xl pb-1"
        style={{ backgroundColor: 'rgba(108, 122, 137, 0)' }}
      />
    </View>
  )
}

export default LoginInputComponent