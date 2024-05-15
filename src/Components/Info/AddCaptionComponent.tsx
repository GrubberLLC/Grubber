import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

interface InputProps {
  value: string,
  onChange: (text: string) => void,
  capitalize: string,
  placeholder: string,
  multiline: boolean,
  icon?: string
}

const AddCaptionComponent: React.FC<InputProps> = (props) => {

  const {value, onChange, placeholder, multiline, icon} = props

  return (
    <ScrollView  className='w-full p-2 flex-1'>
      <TextInput 
        className='text-white text-lg pb-2 pl-2 text-base text-left'
        placeholderTextColor={'white'}
        value={value}
        onChangeText={(text) => {onChange(text)}}
        autoCapitalize={'none'}
        placeholder={placeholder}
        multiline={multiline}
      />
    </ScrollView>
  )
}

export default AddCaptionComponent
