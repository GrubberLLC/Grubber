import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useAuth } from '../../Context/UserContext'
import { Bell, ChevronsLeft, Edit, Info, MoreHorizontal, PlusSquare, Settings } from 'react-native-feather'
import { useNavigation } from '@react-navigation/native'
import ColorGuide from '../../ColorGuide'

interface PlaceHeaderProps {
  name: string,
  place_id: string
}

const PlaceHeader: React.FC<PlaceHeaderProps> = ({name, place_id}) => {
  const navigation = useNavigation()

  const { userProfile } = useAuth()

  const redirectToSetting = () => {
    navigation.navigate('SettingsScreen')
  }

  return (
    <View className='h-16 w-full px-4 flex flex-row items-center justify-between border-b-2 border-b-neutral-800' style={{backgroundColor: ColorGuide['bg-dark']}}>
      <TouchableOpacity onPress={() => {navigation.goBack()}} className='flex flex-row items-center'>
        <ChevronsLeft height={24} width={24} color={'white'} className='mr-2'/>
        <Text className='text-white text-xl font-extrabold'>{name}</Text>
      </TouchableOpacity>
      <View className='flex flex-row items-center'>
        <TouchableOpacity onPress={() => {redirectToSetting()}}>
          <Info className='ml-3' height={24} width={24} color={'white'}/>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default PlaceHeader
