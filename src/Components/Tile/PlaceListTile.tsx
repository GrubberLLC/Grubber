import React, { useState } from 'react'
import { Dimensions, Text, View, Image, TouchableOpacity} from 'react-native'
import { Star } from 'react-native-feather';
import { usePost } from '../../Context/PostContext';
import { useNavigation } from '@react-navigation/native';
import ColorGuide from '../../ColorGuide';

interface SinglePlaceProps {
  address_city: string,
  address_formatted: string,
  address_state: string, 
  address_street: string,
  address_zip_code: string,
  caption: string | null,
  closed: boolean,
  created_at: string,
  image: string,
  latitude: string,
  longitude: string,
  name: string, 
  phone: string,
  place_id: string,
  price: string,
  rating: number,
  review_count: number,
  yelp_id: string,
  yelp_url: string,
  place_name: string
}

interface PlaceTileProps {
  place: SinglePlaceProps | null
}

const screenWidth = Dimensions.get('screen').width
const screenHeight = screenWidth * .65

const PlaceListTile: React.FC<PlaceTileProps> = ({place}) => {
  const navigation = useNavigation()

  const redirectToPlaceDetailsScreen = () => {
    navigation.navigate('PlaceDetailsScreenList', {place_id: place.place_id})
  }

  return (
    <TouchableOpacity onPress={redirectToPlaceDetailsScreen} className='w-full pt-3'>
      <View style={{height: screenHeight, width: screenWidth, backgroundColor: ColorGuide.primary}}>
        <Image className='flex-1' source={{uri: place?.image}}/>
        <View style={{backgroundColor: 'rgba(0, 0, 0, .6)', height: screenHeight, width: screenWidth}} className='absolute z-5 flex flex-col justify-end p-2'>
          <View>
            <View className='flex flex-row items-end'>
              <Text className='text-white text-2xl font-bold'>{place?.place_name}</Text>
            </View>
            <View>
              <Text className='text-white text-base font-semibold'>{place?.address_formatted}</Text>
            </View>
            <View className='flex flex-row items-center justify-between'>
              <View className='flex flex-row items-center'>
                <Star height={20} width={20} color={'#e94f4e'} fill={'#e94f4e'} className='mr-1'/>
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
  )
}

export default PlaceListTile
