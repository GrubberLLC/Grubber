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

const UserInputComponent: React.FC<LoginInputProps> = (props) => {
  const {label, value, handleFunction, secure, placeholder, multiline} = props


  const IconComponent = Icons[label]

  return (
    <View 
      className="flex flex-row pb-2 mt-1 items-center w-full"
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
        className="flex-1 border-b-2 border-b-white text-white text-lg mb-2 pb-1 font-semibold"
      />
    </View>
  )
}

export default UserInputComponent
