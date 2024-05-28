import React from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import FeedHeader from '../../Components/Headers/FeedHeader'
import ProfileHeader from '../../Components/Headers/ProfileHeader'
import { useAuth } from '../../Context/UserContext'
import { usePost } from '../../Context/PostContext'
import { Edit, Grid, List } from 'react-native-feather'

const ProfileScreen = () => {

  const {userProfile, currentProfileView, handleProfileViewChange} = useAuth()
  const {loggedInUsersPosts} = usePost()

  return (
    <View className={'flex-1 bg-neutral-900'}>
      <ProfileHeader />
      <View className='p-3 pt-4 flex flex-row items-center'>
        <Image className='h-16 w-16 rounded-full' source={{uri: userProfile ? userProfile.profile_picture : null}}/>
        <View className='flex-1 ml-4'>
          <Text className='text-white font-semibold text-lg'>{userProfile?.username}</Text>
          <Text className='text-white font-semibold text-sm'>{userProfile?.full_name}</Text>
        </View>
      </View>
      <View className='p-3 pt-2 flex flex-row items-center'>
        <Text className='text-white font-semibold'>{userProfile?.bio}</Text>
      </View>
      <View className='p-3 pt-2 flex flex-row items-center justify-between px-10'>
        <View className='flex flex-col items-center'>
          <Text className='text-white text-xl font-semibold'>{loggedInUsersPosts?.length}</Text>
          <Text className='text-white text-sm font-semibold mt-2'>Posts</Text>
        </View>
        <View className='flex flex-col items-center'>
          <Text className='text-white text-xl font-semibold'>{userProfile?.followers}</Text>
          <Text className='text-white text-sm font-semibold mt-2'>Followers</Text>
        </View>
        <View className='flex flex-col items-center'>
          <Text className='text-white text-xl font-semibold'>{userProfile?.following}</Text>
          <Text className='text-white text-sm font-semibold mt-2'>Following</Text>
        </View>
        <View className='flex flex-col items-center'>
          <Text className='text-white text-xl font-semibold'>0</Text>
          <Text className='text-white text-sm font-semibold mt-2'>Lists</Text>
        </View>
      </View>
      <View className='w-full flex flex-row items-center mt-6'>
        <TouchableOpacity onPress={() => {handleProfileViewChange('posts')}} className={`flex flex-row items-center flex-1 justify-center pb-3 ${currentProfileView === 'posts' ? 'border-b-2 border-b-red-500' : 'border-b-2 border-b-neutral-900' }`}>
          <Grid height={24} width={24} color={'white'}/>
          <Text className='text-white text-xl font-semibold ml-2'>Posts</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {handleProfileViewChange('lists')}} className={`flex flex-row items-center flex-1 justify-center pb-3 ${currentProfileView === 'lists' ? 'border-b-2 border-b-red-500' : 'border-b-2 border-b-neutral-900' }`}>
          <List height={24} width={24} color={'white'}/>
          <Text className='text-white text-xl font-semibold ml-2'>Lists</Text>
        </TouchableOpacity>
      </View>
      <ScrollView className='flex-1'>
        {
          currentProfileView === 'posts'
            ? <View className='flex flex-wrap flex-row'>
                {
                  loggedInUsersPosts?.map((post) => {
                    return(
                      <View className='w-1/3 p-1'>
                        <Image className='w-full h-32' source={{uri: post.media}}/>
                      </View>
                    )
                  })
                }
              </View>
            : <Text>Lists</Text>
        }
      </ScrollView>
    </View>
  )
}

export default ProfileScreen
