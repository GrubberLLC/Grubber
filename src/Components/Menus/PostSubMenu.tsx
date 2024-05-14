import React from 'react'
import { View } from 'react-native'
import { Bookmark, Heart, MessageSquare } from 'react-native-feather'

const PostSubMenu = () => {
  return (
    <View className='flex flex-row w-full px-2 pt-4'>
      <Heart className='mr-3' height={26} width={26} color={'white'}/>
      <MessageSquare className='mr-3' height={26} width={26} color={'white'}/>
      <Bookmark height={26} width={26} color={'white'}/>
    </View>
  )
}

export default PostSubMenu
