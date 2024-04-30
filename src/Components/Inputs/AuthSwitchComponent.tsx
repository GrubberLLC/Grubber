import React from 'react'
import { Switch, Text, View } from 'react-native'
import * as Icons from 'react-native-feather';

interface LoginInputProps {
  label: string;
  value: boolean;
  handleFunction: (view: boolean) => void;
  secure: boolean;
  placeholder: string;
  multiline: boolean;
}

const AuthSwitchComponent: React.FC<LoginInputProps> = (props) => {
  const {label, value, handleFunction, secure, placeholder, multiline} = props


  const IconComponent = Icons[label]

  return (
    <View 
      className="w-full h-12 flex flex-row px-4 mt-3 items-center justify-between rounded-xl"
      style={{ backgroundColor: 'rgba(150, 150, 150, 0.50)' }}
    >
      <View className="flex flex-row items-center justify-center">
        {IconComponent ? <IconComponent className="mr-2" height={24} width={24} color="white" /> : null}
        <Text className="text-lg text-white">{placeholder}</Text>
      </View>
      <View>
        <Switch
          className="scale-85"
          onValueChange={() => handleFunction(!value)}
          trackColor={{false: 'white', true: '#e94f4e'}}
          value={value}
        />
      </View>
    </View>
  )
}

export default AuthSwitchComponent