import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useAuth } from '../../Context/UserContext'
import { Bell, ChevronsLeft, Edit, MoreHorizontal, PlusSquare, Settings } from 'react-native-feather'
import { useNavigation } from '@react-navigation/native'
import ColorGuide from '../../ColorGuide'

interface HeaderProps {
  username: string
}

const UserProfileHeader: React.FC<HeaderProps> = ({username}) => {
  const navigation = useNavigation()

  return (
    <View className='h-16 w-full px-4 flex flex-row items-center justify-between border-b-2 border-b-neutral-800' style={{backgroundColor: ColorGuide['bg-dark']}}>
      <TouchableOpacity onPress={() => {navigation.goBack()}} className='flex flex-row items-center'>
        <ChevronsLeft height={24} width={24} color={'white'} className='mr-2'/>
        <Text className='text-white text-xl font-extrabold'>{username}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default UserProfileHeader
