import React, { useEffect } from 'react'
import { Image, Text, View } from 'react-native'

interface UserProfile {
  user_id: string;
  username: string;
  email: string;
  phone: string,
  location: string;
  first_name: string;
  last_name: string;
  full_name: string;
  profile_picture: string;
  bio: string | null;
  public: number;
}

interface AddPostProfileProps {
  profile: UserProfile | null
}

const AddPostProfileComponent: React.FC<AddPostProfileProps> = ({profile}) => {

  useEffect(() => {
    console.log('profile: ', profile)
  }, [])

  return (
    <View className='px-2 py-3 flex flex-row items-center border-b-2 border-b-neutral-600'>
      <Image className='h-12 w-12 rounded-full bg-blue-500' source={{uri: profile?.profile_picture}}/>
      <View className='ml-4 flex flex-col items-start'>
        <Text className='text-white text-base font-bold'>{profile?.username}</Text>
        <Text className='text-white text-xsm'>{profile?.full_name}</Text>
      </View>
    </View>
  )
}

export default AddPostProfileComponent
