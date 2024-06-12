import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { useList } from '../../Context/ListContext'
import { useAuth } from '../../Context/UserContext'
import ColorGuide from '../../ColorGuide'
import { useNavigation } from '@react-navigation/native'

interface MemberProps {
  bio: string,
  created_at: string,
  email: string,
  first_name: string,
  followers: number,
  following: number,
  full_name: string,
  last_name: string,
  list_id: number,
  location: string,
  member_id: number,
  nuckname: string,
  notifications: boolean,
  phone: string,
  profile_id: string,
  profile_picture: string,
  public: boolean,
  sent_request: string,
  status: string,
  type: string,
  user_id: string,
  username: string
}

interface PostProfileProps {
  profile: MemberProps | null
}

const ListProfile: React.FC<PostProfileProps> = ({ profile }) => {
  const { handleUpdateSelectedUsers, removeMemberFromList } = useList();
  const { userProfile } = useAuth();

  const navigation = useNavigation()

  // Determine if the logged-in user is the owner
  const isOwner = profile?.type === 'owner';

  return (
    <TouchableOpacity onPress={() => {navigation.navigate('UserProfileScreen', {user_id: profile?.user_id})}} className='w-full flex flex-row items-center p-1 py-3 border-y-2 border-y-neutral-800'>
      <View className='h-10 w-10 rounded-full overflow-hidden' style={{backgroundColor: ColorGuide['bg-dark-6']}}>
        <Image className='flex-1' source={{ uri: profile?.profile_picture }} />
      </View>
      <View className='ml-3 flex-1'>
        <Text className='text-white font-bold text-base'>{profile?.username}</Text>
        <Text className='text-white text-xsm'>{profile?.full_name} ({profile?.type})</Text>
      </View>
      {
        !isOwner && profile?.type !== 'owner' && (
          <TouchableOpacity
            className="rounded-md overflow-hidden"
            onPress={() => removeMemberFromList(profile?.member_id, profile?.list_id)}
          >
            <Text className='text-white p-2 font-bold' style={{backgroundColor: ColorGuide['primary']}}>
              Remove
            </Text>
          </TouchableOpacity>
        )
      }
    </TouchableOpacity>
  );
};

export default ListProfile
