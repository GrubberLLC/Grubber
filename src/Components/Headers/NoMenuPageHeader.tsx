import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Text, View } from 'react-native'
import { ChevronsLeft } from 'react-native-feather'
import { TouchableOpacity } from 'react-native-gesture-handler'
import ColorGuide from '../../ColorGuide'

interface HeaderProps {
  backing: boolean,
  leftLabel: string,
}

const NoMenuPageHeader: React.FC<HeaderProps> = (props) => {
  const {backing, leftLabel} = props
  
  const navigation = useNavigation()

  return (
    <View className='h-16 w-full px-4 flex flex-row items-center justify-start border-b-2 border-b-neutral-800' style={{backgroundColor: ColorGuide['bg-dark']}}>
      {
        backing
          ? <TouchableOpacity onPress={() => {navigation.goBack()}}>
              <ChevronsLeft height={24} width={24} color={'white'} className='mr-2'/>
            </TouchableOpacity>
          : null
      }
      <Text className='text-white text-xl font-extrabold'>{leftLabel}</Text>
    </View>
  )
}

export default NoMenuPageHeader
