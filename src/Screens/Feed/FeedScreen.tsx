import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import FeedHeader from '../../Components/Headers/FeedHeader'
import { useAuth } from '../../Context/UserContext'

const FeedScreen = () => {

  const {signOutUser} = useAuth()

  return (
    <View className={'flex-1 bg-neutral-900'}>
      <FeedHeader />
      <Text className={'text-white font-bold'}>Screen</Text>
      <TouchableOpacity onPress={() => {signOutUser()}}><Text className={'text-white font-bold'}>Logout</Text></TouchableOpacity>
    </View>
  )
}

export default FeedScreen