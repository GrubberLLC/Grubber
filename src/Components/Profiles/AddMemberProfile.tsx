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
  username: string
}

interface PostProfileProps {
  profile: ProfileProps | null
}

const AddMemberProfile: React.FC<PostProfileProps> = ({profile, handleFunction}) => {

  const {handleUpdateSelectedUsers, selectgedUsers} = useList()

  const isSelected = selectgedUsers.some((user) => user.user_id === profile?.user_id);

  return (
    <View className='w-full flex flex-row items-center p-1 py-3 border-y-2 border-y-neutral-800'>
      <View className='h-10 w-10 rounded-full overflow-hidden' style={{backgroundColor: ColorGuide['bg-dark-6']}}>
        <Image className='flex-1' source={{uri: profile?.profile_picture}}/>
      </View>
      <View className='ml-3 flex-1'>
        <Text className='text-white font-bold text-base'>{profile?.username}</Text>
        <Text className='text-white text-xsm'>{profile?.full_name}</Text>
      </View>
      <TouchableOpacity
        className="rounded-md overflow-hidden"
        onPress={() => handleUpdateSelectedUsers(profile)}
      >
        <Text className={`text-white p-2 font-bold ${isSelected ? ColorGuide['bg-dark-7'] : ColorGuide.primary}`}>
          {isSelected ? 'Remove' : 'Select'}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default AddMemberProfile
