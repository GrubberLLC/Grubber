import React, { useEffect } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import FeedHeader from '../../Components/Headers/FeedHeader'
import ProfileHeader from '../../Components/Headers/ProfileHeader'
import { useAuth } from '../../Context/UserContext'
import { usePost } from '../../Context/PostContext'
import { Edit, Grid, List } from 'react-native-feather'
import ColorGuide from '../../ColorGuide'
import { useList } from '../../Context/ListContext'

import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../Types/NavigationTypes';
import UserProfileHeader from '../../Components/Headers/UserProfileHeader'

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'ListDetailScreen'>;

const UserProfileScreen = () => {
  const route = useRoute<ProfileScreenRouteProp>()
  const params = route.params

  const {getSelectedUserProfile, selectedUserProfile, 
    selectedUserProfileView, toggleSelectedUserProfileView, 
    userFollowing, grabSelectedUserFollowers, 
    grabSelectedUserFollowing, userSelectedFollowers, 
    userSelectedFollowing, removeFollowing, createFollowUser} = useAuth()
  const {getSelectedUserPosts, selectedUserPosts} = usePost()
  const {getSelectedUserLists, selectedUserLists} = useList()

  useEffect(() => {
    getSelectedUserProfile(params.user_id)
    getSelectedUserPosts(params.user_id)
    getSelectedUserLists(params.user_id)
    grabSelectedUserFollowers(params.user_id)
    grabSelectedUserFollowing(params.user_id)
  }, [])

  const getFollowStatus = (user_id: string) => {
    return userFollowing.some((follow) => follow.user_id === user_id);
  };

  const getFollowerObject = (user_id: string) => {
    return userFollowing.filter((follow) => follow.user_id === user_id)
  }

  const handleFollowUnfollow = () => {
    if (getFollowStatus(params.user_id)) {
      const followerObject = getFollowerObject(params.user_id);
      if (followerObject) {
        removeFollowing(followerObject[0]['friends_id']);
      }
    } else {
      createFollowUser(selectedUserProfile);
    }
  };

  return (
    <View className={'flex-1'} style={{backgroundColor: ColorGuide['bg-dark']}}>
      <UserProfileHeader username={selectedUserProfile?.username}/>
      <View className='p-3 pt-4 flex flex-row items-center'>
        <Image className='h-16 w-16 rounded-full' source={{uri: selectedUserProfile ? selectedUserProfile.profile_picture : null}}/>
        <View className='flex-1 ml-4'>
          <Text className='text-white font-semibold text-lg'>{selectedUserProfile?.username}</Text>
          <Text className='text-white font-semibold text-sm'>{selectedUserProfile?.full_name}</Text>
        </View>
        <View className='ml-4'>
          {
            getFollowStatus(params.user_id) ?
              <TouchableOpacity onPress={handleFollowUnfollow} style={{backgroundColor: ColorGuide['bg-dark-6']}} className='p-2 rounded'>
                <Text className='text-white font-semibold'>Unfollow</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={handleFollowUnfollow} style={{backgroundColor: ColorGuide.primary}} className='bg-green-500 p-2 rounded'>
                <Text className='text-white font-semibold'>Follow</Text>
              </TouchableOpacity>
          }
        </View>
      </View>
      <View className='p-3 pt-2 flex flex-row items-center'>
        <Text className='text-white font-semibold'>{selectedUserProfile?.bio}</Text>
      </View>
      <View className='p-3 pt-2 flex flex-row items-center justify-between px-10'>
        <View className='flex flex-col items-center'>
          <Text className='text-white text-xl font-semibold'>{selectedUserPosts?.length}</Text>
          <Text className='text-white text-sm font-semibold mt-2'>Posts</Text>
        </View>
        <View className='flex flex-col items-center'>
          <Text className='text-white text-xl font-semibold'>{selectedUserLists?.length}</Text>
          <Text className='text-white text-sm font-semibold mt-2'>Lists</Text>
        </View>
        <View className='flex flex-col items-center'>
          <Text className='text-white text-xl font-semibold'>{userSelectedFollowers?.length}</Text>
          <Text className='text-white text-sm font-semibold mt-2'>Followers</Text>
        </View>
        <View className='flex flex-col items-center'>
          <Text className='text-white text-xl font-semibold'>{userSelectedFollowing?.length}</Text>
          <Text className='text-white text-sm font-semibold mt-2'>Following</Text>
        </View>
      </View>
      <View className='w-full flex flex-row items-center mt-6'>
        <TouchableOpacity onPress={() => {toggleSelectedUserProfileView('posts')}} className={`flex flex-row items-center flex-1 justify-center pb-3 ${selectedUserProfileView === 'posts' ? 'border-b-2 border-b-red-500' : 'border-b-2 border-b-neutral-900' }`}>
          <Grid height={24} width={24} color={'white'}/>
          <Text className='text-white text-xl font-semibold ml-2'>Posts</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {toggleSelectedUserProfileView('lists')}} className={`flex flex-row items-center flex-1 justify-center pb-3 ${selectedUserProfileView === 'lists' ? 'border-b-2 border-b-red-500' : 'border-b-2 border-b-neutral-900' }`}>
          <List height={24} width={24} color={'white'}/>
          <Text className='text-white text-xl font-semibold ml-2'>Lists</Text>
        </TouchableOpacity>
      </View>
      <ScrollView className='flex-1'>
        {
          selectedUserProfileView === 'posts'
            ? <View className='flex flex-wrap flex-row'>
                {
                  selectedUserPosts?.map((post) => {
                    return(
                      <View className='w-1/3 p-1'>
                        <Image className='w-full h-32' source={{uri: post.media}}/>
                      </View>
                    )
                  })
                }
              </View>
            : <View className='flex flex-wrap flex-rcol'>
                {
                  selectedUserLists?.map((list) => {
                    return(
                      <View className='w-full p-1 flex flex-row'>
                        <Image className='h-24 w-24' source={{uri: list.picture}}/>
                        <View className='flex-1 ml-2 pt-3'>
                          <Text className='text-white text-xl font-semibold'>{list.name}</Text>
                          <Text className='text-white text-base'>{list.last_activity}</Text>
                        </View>
                      </View>
                    )
                  })
                }
              </View>
        }
      </ScrollView>
    </View>
  )
}

export default UserProfileScreen

