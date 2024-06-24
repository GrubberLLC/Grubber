import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useAuth } from '../../Context/UserContext'
import { Bell, Bookmark, ChevronsLeft, Edit, Info, MoreHorizontal, PlusSquare, Settings } from 'react-native-feather'
import { useNavigation } from '@react-navigation/native'
import ColorGuide from '../../ColorGuide'

interface PlaceHeaderProps {
  name: string,
  place_id: string
}

const PlaceHeader: React.FC<PlaceHeaderProps> = ({name, place_id}) => {
  const navigation = useNavigation()

  const { userProfile } = useAuth()

  const redirectToSetting = () => {
    navigation.navigate('SettingsScreen')
  }

  const { addPlaceToFavorites, userFavorites, removeFavorites } = useAuth();

  const userFavoritedPlace = userFavorites.filter((favorite) => {
    const favoritePlaceId = parseInt(favorite.place_id);
    const placeId = parseInt(place_id);
    return favoritePlaceId === placeId;
  });

  
  const toggleFavorite = () => {
    if (userFavoritedPlace.length > 0) {
      const favorite = userFavoritedPlace[0];
      removeFavorites(favorite.favorites_id);
    } else {
      addPlaceToFavorites(place_id);
    }
  };

  return (
    <View className='h-16 w-full px-4 flex flex-row items-center justify-between border-b-2 border-b-neutral-800' style={{backgroundColor: ColorGuide['bg-dark']}}>
      <TouchableOpacity onPress={() => {navigation.goBack()}} className='flex flex-row items-center'>
        <ChevronsLeft height={24} width={24} color={'white'} className='mr-2'/>
        <Text className='text-white text-xl font-extrabold'>{name}</Text>
      </TouchableOpacity>
      <View className='flex flex-row items-center'>
        <TouchableOpacity onPress={() => toggleFavorite()} className=''>
          <Bookmark height={26} width={26} color={'white'} fill={userFavoritedPlace.length > 0 ? 'white' : 'none'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {redirectToSetting()}}>
          <Info className='ml-3' height={24} width={24} color={'white'}/>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default PlaceHeader
