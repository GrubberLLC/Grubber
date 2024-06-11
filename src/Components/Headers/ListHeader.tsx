import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useAuth } from '../../Context/UserContext'
import { Bell, PlusSquare } from 'react-native-feather'
import { useNavigation } from '@react-navigation/native'
import ColorGuide from '../../ColorGuide'

const ListHeader = () => {
  const navigation = useNavigation()

  const redirectToNewList = () => {
    navigation.navigate('NewListScreen')
  }

  return (
    <View className='h-16 w-full px-4 flex flex-row items-center justify-between border-b-2 border-b-neutral-800' style={{backgroundColor: ColorGuide['bg-dark']}}>
      <Text className='text-white text-xl font-extrabold'>Lists</Text>
      <View className='flex flex-row items-center'>
        <TouchableOpacity onPress={redirectToNewList}>
          <PlusSquare height={24} width={24} color={'white'}/>
        </TouchableOpacity>
       </View>
    </View>
  )
}

export default ListHeader
