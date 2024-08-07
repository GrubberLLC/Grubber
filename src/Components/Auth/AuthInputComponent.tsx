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

const AuthInputComponent: React.FC<LoginInputProps> = (props) => {
  const {label, value, handleFunction, secure, placeholder, multiline} = props


  const IconComponent = Icons[label]

  return (
    <View 
      className="flex flex-row px-4 pt-1 pb-2 mt-3 items-center w-full rounded-xl"
      style={{ backgroundColor: 'rgba(150, 150, 150, 0.50)' }}
    >
      {IconComponent ? <IconComponent className="mr-2" height={24} width={24} color="white" /> : null}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={'white'}
        autoCapitalize='none'
        returnKeyLabel='Done'
        secureTextEntry={secure}
        value={value}
        onChangeText={(text) => {handleFunction(text)}}
        multiline={multiline ? true : false}
        className="flex-1 mr-2 border-b-2 border-b-white text-white text-lg mb-2 font-semibold"
        style={{ backgroundColor: 'rgba(108, 122, 137, 0)' }}
      />
    </View>
  )
}

export default AuthInputComponent