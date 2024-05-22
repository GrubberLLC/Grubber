import React from 'react'
import { Image, Text, View } from 'react-native'

interface SingleComment {
  bio: string,
  comment: string,
  comment_id: number,
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
  post_id: number,
  profile_id: string,
  profile_picture: string,
  public: boolean,
  user_id: string,
  username: string
}

interface PostCommentProps {
  comment: SingleComment
}

const PostComment: React.FC<PostCommentProps> = ({comment}) => {
  return (
    <View className='p-2 py-3'>
      <View className='flex flex-row items-center'>
        <Image className='h-10 w-10 rounded-full' source={{uri: comment.profile_picture}}/>
        <View className='ml-4'>
          <Text className='text-white text-xsm font-bold'>{comment.username}</Text>
          <Text className='text-white text-xsm font-semibold'>{comment.full_name.toLowerCase()}</Text>
        </View>
      </View>
      <View className='mt-3 ml-14'>
        <Text className='text-white'>{comment.comment}</Text>
      </View>
    </View>
  )
}

export default PostComment
