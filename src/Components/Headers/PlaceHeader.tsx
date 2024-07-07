import React from 'react';
import { Image, Text, TouchableOpacity, View, Linking } from 'react-native';
import { useAuth } from '../../Context/UserContext';
import { Bell, Bookmark, ChevronsLeft, Edit, Info, MoreHorizontal, PlusSquare, Settings } from 'react-native-feather';
import { useNavigation } from '@react-navigation/native';
import ColorGuide from '../../ColorGuide';
import YelpSVG from '../../Assets/yelp-svg.svg'; // Import the SVG

interface PlaceHeaderProps {
  name: string,
  place_id: string,
  yelp_url: string
}

const PlaceHeader: React.FC<PlaceHeaderProps> = ({ name, place_id, yelp_url }) => {
  const navigation = useNavigation();
  const { userProfile, addPlaceToFavorites, userFavorites, removeFavorites } = useAuth();

  const redirectToSetting = () => {
    navigation.navigate('SettingsScreen');
  };

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

  const openYelp = () => {
    Linking.openURL(yelp_url).catch((err) => console.error('An error occurred', err));
  };

  return (
    <View className='h-16 w-full px-4 flex flex-row items-center justify-between border-b-2 border-b-neutral-800' style={{ backgroundColor: ColorGuide['bg-dark'] }}>
      <TouchableOpacity onPress={() => { navigation.goBack() }} className='flex flex-row items-center'>
        <ChevronsLeft height={24} width={24} color={'white'} className='mr-2' />
        <Text className='text-white text-xl font-extrabold'>{name}</Text>
      </TouchableOpacity>
      <View className='flex flex-row items-center'>
        <TouchableOpacity onPress={() => toggleFavorite()} className=''>
          <Bookmark height={26} width={26} color={'white'} fill={userFavoritedPlace.length > 0 ? 'white' : 'none'} />
        </TouchableOpacity>
        <TouchableOpacity className='ml-4' onPress={openYelp}>
          <YelpSVG width={24} height={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PlaceHeader;
