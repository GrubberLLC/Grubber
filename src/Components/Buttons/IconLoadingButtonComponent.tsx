import React from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import * as Icons from 'react-native-feather';


interface LoadingButtonProps {
  icon?: string,
  loading: boolean,
  onChange: () => void
}

const IconLoadingButtonComponent: React.FC<LoadingButtonProps> = ({
  icon, message, loading, onChange
}) => {

  const IconComponent = Icons[icon]

  return (
    <View className='h-14 w-14 bg-red-500 flex flex-row justify-center items-center ml-2 rounded-md'>
      {
        loading 
          ? (<View>
              <ActivityIndicator size={'small'} color={'white'}/>
            </View>)
          : (<TouchableOpacity onPress={onChange}>
              {IconComponent ? <IconComponent height={30} width={30} color="white" /> : message}
            </TouchableOpacity>)
      }
    </View>
  )
}

export default IconLoadingButtonComponent
