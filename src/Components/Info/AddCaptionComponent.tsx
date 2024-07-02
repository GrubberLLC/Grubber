import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import ColorGuide from '../../ColorGuide'

interface InputProps {
  value: string,
  onChange: (text: string) => void,
  capitalize: string,
  placeholder: string,
  multiline: boolean,
  icon?: string,
  returnKeyType?: string 
}

const AddCaptionComponent: React.FC<InputProps> = (props) => {

  const { value, onChange, capitalize, placeholder, multiline, returnKeyType } = props

  return (
    <View style={{ padding: 10 }} className='flex-1'>
      <TextInput
        className='text-white text-lg pb-2 pl-2 text-base text-left'
        value={value}
        onChangeText={onChange}
        autoCapitalize={capitalize}
        placeholder={placeholder}
        placeholderTextColor={'gray'}
        multiline={multiline}
        returnKeyType={returnKeyType}
        blurOnSubmit={true}
      />
    </View>
  )
}

export default AddCaptionComponent
