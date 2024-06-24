import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useAuth } from '../../Context/UserContext'
import { Bell, ChevronsLeft, Info, PlusSquare, Settings, Zap } from 'react-native-feather'
import { useNavigation } from '@react-navigation/native'
import ColorGuide from '../../ColorGuide'
import { useList } from '../../Context/ListContext'

interface ListDetailHeaderProp {
  list_name: string,
  list_id: number,
  list: any
}

const ListDetailsHeader: React.FC<ListDetailHeaderProp> = ({list_name, list_id, list}) => {
  const navigation = useNavigation()

  const {placesInSelectList} = useList()

  const redirectToNewList = () => {
    navigation.navigate('ListSettingsScreen', {list: list})
  }

  const redirectToAddPlace = () => {
    navigation.navigate('SearchPlaceListScreen', {list_id: list_id, list: list})
  }

  const getRandomIndex = (length: number) => {
    return Math.floor(Math.random() * length);
  }

  const redirectToRandomPlace = () => {
    if (placesInSelectList.length > 0) {
      const randomIndex = getRandomIndex(placesInSelectList.length);
      const randomPlace = placesInSelectList[randomIndex];
      navigation.navigate('PlaceDetailsScreenList', { place_id: randomPlace.place_id });
    } else {
      console.error('No places in the selected list.');
    }
  }

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
      <View className='flex flex-row items-center'>
        <TouchableOpacity className='mr-3' onPress={redirectToRandomPlace}>
          <Zap height={24} width={24} color={'white'}/>
        </TouchableOpacity>
        <TouchableOpacity className='mr-3' onPress={redirectToAddPlace}>
          <PlusSquare height={24} width={24} color={'white'}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={redirectToNewList}>
          <Settings height={24} width={24} color={'white'}/>
        </TouchableOpacity>
       </View>
    </View>
  )
}

export default ListDetailsHeader
