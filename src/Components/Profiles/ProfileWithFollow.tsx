import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { useList } from '../../Context/ListContext'
import ColorGuide from '../../ColorGuide'

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

const ProfileWithFollow: React.FC<PostProfileProps> = ({profile, followStatus, followUser, onFollow, onUnfollow}) => {

  console.log('followuser: ', followUser)

  return (
    <View className='w-full flex flex-row items-center px-3 py-3 border-y-2 border-y-neutral-800'>
      <View className='h-10 w-10 rounded-full overflow-hidden' style={{backgroundColor: ColorGuide['bg-dark-6']}}>
        <Image className='flex-1' source={{uri: profile?.profile_picture}}/>
      </View>
      <View className='ml-3 flex-1'>
        <Text className='text-white font-bold text-base'>{profile?.username}</Text>
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
    </View>
  )
}

export default ProfileWithFollow
