import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useAuth } from '../../Context/UserContext'
import { Bell, PlusSquare, X } from 'react-native-feather'
import { useNavigation } from '@react-navigation/native'
import ColorGuide from '../../ColorGuide'

const NotificationHeader = () => {
  const navigation = useNavigation()

  const { userProfile } = useAuth()

  return (
    <View className='h-16 w-full px-4 flex flex-row items-center justify-between border-b-2 border-b-neutral-800' style={{backgroundColor: ColorGuide['bg-dark']}}>
      <Text className='text-white text-xl font-extrabold'>Notications</Text>
      <View className='flex flex-row items-center'>
        <TouchableOpacity onPress={() => {navigation.navigate('FeedScreen')}}>
          {/* <X className='ml-3' height={24} width={24} color={'white'}/> */}
          <Text className='text-primary text-xl font-bold'>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default NotificationHeader
