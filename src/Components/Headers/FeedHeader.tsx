import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useAuth } from '../../Context/UserContext'
import { Bell, PlusSquare } from 'react-native-feather'
import { useNavigation } from '@react-navigation/native'

const FeedHeader = () => {
  const navigation = useNavigation()

  const { userProfile } = useAuth()

  return (
    <View className='h-16 w-full bg-neutral-900 px-4 flex flex-row items-center justify-between border-b-2 border-b-neutral-600'>
      <Text className='text-white text-xl font-extrabold'>{userProfile?.username}</Text>
      <View className='flex flex-row items-center'>
        <TouchableOpacity onPress={() => {navigation.navigate('NewPostScreen')}}>
          <PlusSquare height={24} width={24} color={'white'}/>
        </TouchableOpacity>
        <Bell className='ml-3' height={24} width={24} color={'white'}/>
      </View>
    </View>
  )
}

export default FeedHeader
