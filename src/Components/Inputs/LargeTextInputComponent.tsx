import React from 'react'
import { Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

interface InputProps {
  value: string,
  onChange: (text: string) => void,
  capitalize: string,
  placeholder: string,
  multiline: boolean,
  icon?: string
}

const LargeTextInputComponent: React.FC<InputProps> = (props) => {

  const {value, onChange, placeholder, multiline, icon} = props

  return (
    <View  className='flex-1'>
      <TextInput 
        className='text-white text-lg pb-2 pl-2 text-base'
        placeholderTextColor={'#878787'}
        value={value}
        onChangeText={(text) => {onChange(text)}}
        autoCapitalize={'none'}
        placeholder={placeholder}
        multiline={multiline}
      />
    </View>
  )
}

export default LargeTextInputComponent
