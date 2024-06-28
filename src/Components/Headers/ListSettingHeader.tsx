import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useAuth } from '../../Context/UserContext'
import { Bell, ChevronsLeft, Edit, Info, PlusSquare, Settings } from 'react-native-feather'
import { useNavigation } from '@react-navigation/native'
import ColorGuide from '../../ColorGuide'

interface ListDetailHeaderProp {
  list_name: string,
  list_id: number,
  list: any
}

const ListSettingHeader: React.FC<ListDetailHeaderProp> = ({list_name, list_id, list}) => {
  const navigation = useNavigation()

  const limitString = (text: string, min = 22): string => {
    if (text.length > min) {
      return text.substring(0, min) + '...';
    }
    return text
  }

  return (
    <View className='h-16 w-full px-4 flex flex-row items-center justify-between border-b-2 border-b-neutral-800' style={{backgroundColor: ColorGuide['bg-dark']}}>
      <TouchableOpacity onPress={() => {navigation.goBack()}} className='flex flex-row items-center'>
        <ChevronsLeft height={24} width={24} color={'white'} className='mr-2'/>
        <Text className='text-white text-xl font-extrabold'>{limitString(list_name)}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {navigation.navigate('EditListScreen', {list: list})}} className='flex flex-row items-center'>
        <Edit height={24} width={24} color={'white'} className=''/>
      </TouchableOpacity>
    </View>
  )
}

export default ListSettingHeader
