import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { useList } from '../../Context/ListContext'
import { Check, X } from 'react-native-feather'
import { useAuth } from '../../Context/UserContext'
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
  request: any
}

const RequestProfile: React.FC<PostProfileProps> = ({request}) => {

  console.log()

  const {acceptListRequest, rejectListRequest} = useAuth()

  return (
    <View className='w-full flex flex-row items-center p-1 py-3 border-y-2 border-y-neutral-800'>
      <View className='h-10 w-10 rounded-full overflow-hidden' style={{backgroundColor: ColorGuide['bg-dark-6']}}>
        <Image className='flex-1' source={{uri: request?.profile_picture}}/>
      </View>
      <View className='ml-3 flex-1'>
        <Text className='text-white font-bold text-base'>{request?.username}</Text>
        <Text className='text-white text-xsm'>{request?.full_name}</Text>
      </View>
      <TouchableOpacity
        className="p-1 rounded-full mr-2"
        style={{backgroundColor: ColorGuide['bg-dark-7']}}
        onPress={() => acceptListRequest(request.member_id, request.user_id)}
      >
        <Check height={24} width={24} color={'white'} className=''/>
      </TouchableOpacity>
      <TouchableOpacity
        className="p-1.5 rounded-full"
        style={{backgroundColor: ColorGuide['primary']}}
        onPress={() => rejectListRequest(request.member_id, request.user_id)}
      >
        <X height={24} width={24} color={'white'} className=''/>
      </TouchableOpacity>
    </View>
  )
}

export default RequestProfile
