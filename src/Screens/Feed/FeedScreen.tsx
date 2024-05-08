import React, { useEffect } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import FeedHeader from '../../Components/Headers/FeedHeader'
import { useAuth } from '../../Context/UserContext'
import { usePost } from '../../Context/PostContext'

const FeedScreen = () => {

  const {signOutUser, userProfile} = useAuth()

  const {getUsersPosts} = usePost()

  useEffect(() => {
    userProfile && userProfile.user_id != ''
      ? getUsersPosts(userProfile.user_id)
      : null
  }, [userProfile])

  return (
    <View className={'flex-1 bg-neutral-900'}>
      <FeedHeader />
      <Text className={'text-white font-bold'}>Screen</Text>
      <TouchableOpacity onPress={() => {signOutUser()}}><Text className={'text-white font-bold'}>Logout</Text></TouchableOpacity>
    </View>
  )
}

export default FeedScreen