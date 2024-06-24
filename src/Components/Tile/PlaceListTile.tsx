import React from 'react';
import { Dimensions, Text, View, Image, TouchableOpacity } from 'react-native';
import { Bookmark, Star } from 'react-native-feather';
import { useNavigation } from '@react-navigation/native';
import ColorGuide from '../../ColorGuide';
import { useAuth } from '../../Context/UserContext';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = screenWidth * 0.65;

const PlaceListTile = ({ place }) => {
  const navigation = useNavigation();
  const { addPlaceToFavorites, userFavorites, removeFavorites } = useAuth();

  const userFavoritedPlace = userFavorites.filter((favorite) => {
    const favoritePlaceId = parseInt(favorite.place_id);
    const placeId = parseInt(place?.place_id);
    return favoritePlaceId === placeId;
  });

  
  const toggleFavorite = (place_id) => {
    if (userFavoritedPlace.length > 0) {
      const favorite = userFavoritedPlace[0];
      removeFavorites(favorite.favorites_id);
    } else {
      addPlaceToFavorites(place_id);
    }
  };


  const redirectToPlaceDetailsScreen = () => {
    navigation.navigate('PlaceDetailsScreenList', { place_id: place.place_id });
  };

  return (
    <TouchableOpacity onPress={redirectToPlaceDetailsScreen} className='w-full pt-3'>
      <View style={{ height: screenHeight, width: screenWidth, backgroundColor: ColorGuide.primary }}>
        <Image className='flex-1' source={{ uri: place?.image }} />
        <View style={{ backgroundColor: 'rgba(0, 0, 0, .6)', height: screenHeight, width: screenWidth }} className='absolute z-5 flex flex-col justify-between p-2'>
          <TouchableOpacity onPress={() => toggleFavorite(place?.place_id)} className='w-full flex flex-row justify-end'>
            <Bookmark height={26} width={26} color={'white'} fill={userFavoritedPlace.length > 0 ? 'white' : 'none'} />
          </TouchableOpacity>
          <View>
            <View className='flex flex-row items-end'>
              <Text className='text-white text-2xl font-bold'>{place?.place_name}</Text>
            </View>
            <View>
              <Text className='text-white text-base font-semibold'>{place?.address_formatted}</Text>
            </View>
            <View className='flex flex-row items-center justify-between'>
              <View className='flex flex-row items-center'>
                <Star height={20} width={20} color={'#e94f4e'} fill={'#e94f4e'} className='mr-1' />
                <Text className='text-white text-base font-semibold'>{place?.rating} / 5 rating</Text>
              </View>
              <View className='flex flex-row items-center'>
                <Text className='text-white text-base font-semibold'>({place?.review_count}) reviews</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PlaceListTile;
