import React from 'react'
import { Image, View } from 'react-native'

interface UserProfile {
  user_id: string;
  username: string;
  email: string;
  phone: string,
  location: string;
  first_name: string;
  last_name: string;
  full_name: string;
  profile_picture: string | null;
  bio: string | null;
  public: number;
}

const PostProfileComponent = (profile: UserProfile) => {
  return (
    <View className='w-full'>
      <View className='h-24 w-24 bg-stone-200'>
        
      </View>
      
    </View>
  )
}

export default PostProfileComponent
