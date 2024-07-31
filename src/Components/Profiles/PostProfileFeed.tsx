import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
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
  username: string
}

interface PostProfileProps {
  profile: ProfileProps | null
}

const PostProfileFeed: React.FC<PostProfileProps> = ({profile}) => {
  const navigation = useNavigation()

  const redirectToListDetailScreen = (user_id: any) => {
    navigation.navigate('UserProfileScreen', {user_id: user_id})
  }
  
  return (
    <TouchableOpacity onPress={() => {redirectToListDetailScreen(profile?.user_id)}} className='w-full flex flex-row items-center px-2 py-3.5'>
      <View className='h-10 w-10 rounded-full overflow-hidden' style={{backgroundColor: ColorGuide['bg-dark-6']}}>
        <Image className='flex-1' source={{uri: profile?.profile_picture}}/>
      </View>
      <View className='ml-3'>
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
    </TouchableOpacity>
  )
}

export default PostProfileFeed
