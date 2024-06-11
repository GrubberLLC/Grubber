import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useAuth } from '../../Context/UserContext'
import { Bell, PlusSquare } from 'react-native-feather'
import { useNavigation } from '@react-navigation/native'
import ColorGuide from '../../ColorGuide'

const ExploreHeader = () => {
  const navigation = useNavigation()

  const { userProfile } = useAuth()

  return (
    <View className='h-16 w-full px-4 flex flex-row items-center justify-between border-b-2 border-b-neutral-800' style={{backgroundColor: ColorGuide['bg-dark']}}>
      <Text className='text-white text-xl font-extrabold'>Explore</Text>
      {/* <View className='flex flex-row items-center'>
        <TouchableOpacity onPress={() => {navigation.navigate('NewPostScreen')}}>
          <PlusSquare height={24} width={24} color={'white'}/>
        </TouchableOpacity>
        <Bell className='ml-3' height={24} width={24} color={'white'}/>
      </View> */}
    </View>
  )
}

export default ExploreHeader
