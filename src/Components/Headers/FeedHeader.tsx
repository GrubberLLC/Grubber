import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { useAuth } from '../../Context/UserContext'
import { Bell, Bookmark, PlusSquare } from 'react-native-feather'
import { useNavigation } from '@react-navigation/native'
import ColorGuide from '../../ColorGuide'
import { useList } from '../../Context/ListContext'
import Verified from '../../Assets/Verified-icon.png'
import Verified100 from '../../Assets/Verified-100-icon.png'

const FeedHeader = () => {
  const navigation = useNavigation()

  const { userProfile, pendingFollowRequests, userGroupRequest } = useAuth()

  return (
    <View className='h-16 w-full px-4 flex flex-row items-center justify-between border-b-2 border-b-neutral-800' style={{backgroundColor: ColorGuide['bg-dark']}}>
      <View className='flex flex-row items-center'>
        <Text className='text-white text-xl font-extrabold'>{userProfile?.username}</Text>
        <View className='ml-2'>
          {
            userProfile?.launch 
              ? <Image className='h-4 w-4' source={Verified100}/>
              : userProfile?.verified 
                  ? <Image className='h-4 w-4' source={Verified}/>
                  : null
          }
        </View>
      </View>
      <View className='flex flex-row items-center'>
        <TouchableOpacity onPress={() => {navigation.navigate('FavoritesScreenFeed')}}>
          <Bookmark height={24} width={24} color={'white'} fill={'white'}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {navigation.navigate('NewPostScreen')}}>
          <PlusSquare className='ml-4' height={24} width={24} color={'white'}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {navigation.navigate('NotificationScreen')}}>
          <Bell className='ml-4' height={24} width={24} color={'white'} fill={'white'}/>
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
