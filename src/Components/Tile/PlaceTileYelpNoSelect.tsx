import React, { useState } from 'react'
import { Dimensions, Text, View, Image, TouchableOpacity} from 'react-native'
import { Star } from 'react-native-feather';
import { usePost } from '../../Context/PostContext';
import { useNavigation } from '@react-navigation/native';
import ColorGuide from '../../ColorGuide';

interface Ambience {
  casual?: boolean;
  classy?: boolean | null;
  divey?: boolean;
  hipster?: boolean | null;
  intimate?: boolean | null;
  romantic?: boolean | null;
  touristy?: boolean;
  trendy?: boolean;
  upscale?: boolean;
};

interface BusinessParking {
  garage?: boolean;
  lot?: boolean;
  street?: boolean;
  valet?: boolean;
  validated?: boolean;
};

interface GoodForMeal {
  breakfast?: boolean | null;
  brunch?: boolean | null;
  dessert?: boolean | null;
  dinner?: boolean;
  latenight?: boolean | null;
  lunch?: boolean | null;
};

interface Attributes {
  about_this_biz_history?: string | null;
  about_this_biz_specialties?: string | null;
  alcohol?: string;
  ambience?: Ambience;
  bike_parking?: boolean;
  business_accepts_credit_cards?: boolean;
  business_parking?: BusinessParking;
  business_url?: string | null;
  good_for_kids?: boolean;
  good_for_meal?: GoodForMeal;
  happy_hour?: boolean;
  has_tv?: boolean;
  noise_level?: string;
  outdoor_seating?: boolean;
  restaurants_good_for_groups?: boolean;
  restaurants_reservations?: boolean;
  restaurants_table_service?: boolean;
  restaurants_take_out?: boolean;
  wi_fi?: string;
};

interface Category {
  alias: string;
  title: string;
};

interface Coordinates {
  latitude: number;
  longitude: number;
};

interface Location {
  address1: string;
  address2?: string;
  address3?: string | null;
  city: string;
  country: string;
  display_address: string[];
  state: string;
  zip_code: string;
};

interface Business {
  alias: string;
  attributes?: Attributes;
  categories?: Category[];
  coordinates?: Coordinates;
  display_phone?: string;
  distance?: number;
  id: string;
  image_url?: string;
  is_closed?: boolean;
  location?: Location;
  name: string;
  phone?: string;
  price?: string;
  rating?: number;
  review_count?: number;
  transactions?: string[];
  url?: string;
};

interface PlaceTileProps {
  place: Business
}

const screenWidth = Dimensions.get('screen').width
const screenHeight = screenWidth * .85

const PlaceTileYelpNoSelect: React.FC<PlaceTileProps> = ({place}) => {
  const navigation = useNavigation()

  const redirectToPlaceScreen = () => {
    navigation.navigate('PlaceDetailsScreenSearch', {place_id: place.id})
  }

  return (
    <TouchableOpacity onPress={redirectToPlaceScreen} className='bg-sky-500 w-full my-3' style={{backgroundColor: ColorGuide.primary}}>
      <View style={{height: screenHeight, width: screenWidth, backgroundColor: ColorGuide.primary}} className='bg-red-300'>
        <Image className='flex-1' source={{uri: place.image_url}}/>
        <View style={{backgroundColor: 'rgba(0, 0, 0, .5)', height: screenHeight, width: screenWidth}} className='absolute z-5 flex flex-col justify-between  p-2'>
          <View className='flex-1 flex flex-column justify-end'>
            <View className='flex flex-row items-end'>
              <Text className='text-white text-2xl font-bold'>{place.name}</Text>
            </View>
            <View>
              <Text className='text-white text-base font-semibold'>{place.location?.address1} {place.location?.city}, {place.location?.state} {place.location?.zip_code}</Text>
            </View>
            <View className='flex flex-row items-center justify-between'>
              <View className='flex flex-row items-center'>
                <Star height={20} width={20} color={'#e94f4e'} fill={'#e94f4e'} className='mr-1'/>
                <Text className='text-white text-base font-semibold'>{place.rating} / 5 rating</Text>
              </View>
              <View className='flex flex-row items-center'>
                <Text className='text-white text-base font-semibold'>({place.review_count}) reviews</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default PlaceTileYelpNoSelect
