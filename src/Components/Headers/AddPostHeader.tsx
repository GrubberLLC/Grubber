import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Text, View } from 'react-native'
import { ChevronsLeft } from 'react-native-feather'
import { TouchableOpacity } from 'react-native-gesture-handler'

const AddPostHeader = () => {
  const navigation = useNavigation()
  return (
    <View className='h-16 w-full bg-neutral-900 px-4 flex flex-row items-center justify-start border-b-2 border-b-neutral-600'>
      <TouchableOpacity onPress={() => {navigation.goBack()}}>
        <ChevronsLeft height={24} width={24} color={'white'} className='mr-2'/>
      </TouchableOpacity>
      <Text className='text-white text-xl font-extrabold'>New Post</Text>
    </View>
  )
}

export default AddPostHeader
