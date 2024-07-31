import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { useList } from '../../Context/ListContext'
import ColorGuide from '../../ColorGuide'
import { useNavigation } from '@react-navigation/native'

import Verified from '../../Assets/Verified-icon.png'
import Verified100 from '../../Assets/Verified-100-icon.png'

interface ProfileProps {
  bio: string
  created_at: string,
  email: string,
  first_name: string,
  followers: number,
  following: number,
  full_name: string,
  last_name: string,
  location: string, 
  nickname: string,
  notifications: boolean,
  phone: string,
  profile_id: string,
  profile_picture: string,
  public: boolean,
  user_id: string,
  username: string,
  friends_id: number
}

interface PostProfileProps {
  profile: ProfileProps | null
  followStatus: string
  followUser: any
  onFollow: (user: any) => void
  onUnfollow: (user: any) => void
}

const ProfileWithFollowProfile: React.FC<PostProfileProps> = ({profile, followStatus, followUser, onFollow, onUnfollow}) => {
  const navigation = useNavigation()

  return (
    <TouchableOpacity onPress={() => {navigation.navigate('UserProfilesProfileScreen', {user_id: profile?.user_id})}} className='w-full flex flex-row items-center px-3 py-3 border-y-2 border-y-neutral-800'>
      <View className='h-10 w-10 rounded-full overflow-hidden' style={{backgroundColor: ColorGuide['bg-dark-6']}}>
        <Image className='flex-1' source={{uri: profile?.profile_picture}}/>
      </View>
      <View className='ml-3 flex-1'>
        <View className='flex flex-row'>
          <Text className='text-white font-bold text-base'>{profile?.username}</Text>
          <View className='ml-2'>
            {
              profile?.launch 
                ? <Image className='h-4 w-4' source={Verified100}/>
                : profile?.verified 
                    ? <Image className='h-4 w-4' source={Verified}/>
                    : null
            }
          </View>
        </View>
        <Text className='text-white text-xsm'>{profile?.full_name}</Text>
      </View>
      <View>
        {
          followStatus === 'active'
            ? <TouchableOpacity className="rounded-md overflow-hidden" onPress={() => {onUnfollow(followUser?.friends_id)}}>
                <Text className={`text-black p-2 font-bold`} style={{backgroundColor: ColorGuide['bg-dark-7'], color: 'white'}}>
                  Unfollow
                </Text>
              </TouchableOpacity>
            : followStatus === 'pending'
                ? <TouchableOpacity className="rounded-md overflow-hidden" onPress={() => {onUnfollow(followUser?.friends_id)}}>
                    <Text className={`text-black p-2 font-bold`} style={{backgroundColor: ColorGuide['bg-dark-7'], color: 'white'}}>
                      Pending
                    </Text>
                  </TouchableOpacity>
                : <TouchableOpacity className="rounded-md overflow-hidden" onPress={() => {onFollow(profile)}}>
                    <Text className={`text-white p-2 font-bold`} style={{backgroundColor: ColorGuide['primary']}}>
                      Follow
                    </Text>
                  </TouchableOpacity>
        }
      </View>
    </TouchableOpacity>
  )
}

export default ProfileWithFollowProfile
