import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native';

interface LoginButtonProps {
  label: string;
  handleFunction: () => void; 
}

const LoginButtonComponent: React.FC<LoginButtonProps> = (props) => {
  const {label, handleFunction} = props

  return (
    <TouchableOpacity 
      onPress={() => {handleFunction()}}
      className="w-full h-12 bg-red-500 rounded-xl mt-6 flex justify-center items-center"
    >
      <Text className="font-bold text-xl text-white">
        {label}
      </Text>
    </TouchableOpacity>
  )
}

export default LoginButtonComponent
