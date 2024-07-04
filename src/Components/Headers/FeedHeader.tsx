import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useAuth } from '../../Context/UserContext'
import { Bell, PlusSquare } from 'react-native-feather'
import { useNavigation } from '@react-navigation/native'
import ColorGuide from '../../ColorGuide'
import { useList } from '../../Context/ListContext'

const FeedHeader = () => {
  const navigation = useNavigation()

  const { userProfile, pendingFollowRequests, userGroupRequest } = useAuth()

  return (
    <View className='h-16 w-full px-4 flex flex-row items-center justify-between border-b-2 border-b-neutral-800' style={{backgroundColor: ColorGuide['bg-dark']}}>
      <Text className='text-white text-xl font-extrabold'>{userProfile?.username}</Text>
      <View className='flex flex-row items-center'>
        <TouchableOpacity onPress={() => {navigation.navigate('NewPostScreen')}}>
          <PlusSquare height={24} width={24} color={'white'}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {navigation.navigate('NotificationScreen')}}>
          <Bell className='ml-4' height={24} width={24} color={'white'}/>
          {
            pendingFollowRequests.length > 0 || userGroupRequest.length > 0
              ? <View className='z-20 h-2.5 w-2.5 rounded-full absolute right-0 top-0' style={{backgroundColor: ColorGuide.primary}}></View>
              : null
          }
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default FeedHeader
