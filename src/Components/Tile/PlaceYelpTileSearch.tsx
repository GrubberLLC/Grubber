import React, { useState } from 'react'
import { Dimensions, Text, View, Image, TouchableOpacity} from 'react-native'
import { Bookmark, Star } from 'react-native-feather';
import { usePost } from '../../Context/PostContext';
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
const screenHeight = screenWidth * .55

const PlaceYelpTileSearch: React.FC<PlaceTileProps> = ({place}) => {

  const {updatePostPlace, postPlace} = usePost()
  
  const [firstCategory, setFirstCategory] = useState(place.categories ? place.categories[0].alias : '')

  const selectingPlace = () => {
    const postPlaceData = {
      image: place.image_url,
      name: place.name,
      phone: place.phone,
      price: place.price,
      rating: place.rating,
      review_count: place.review_count,
      closed: place.is_closed,
      yelp_url: place.url,
      yelp_id: place.id,
      longitude: place.coordinates?.longitude,
      latitude: place.coordinates?.latitude,
      address_street: place.location?.address1,
      address_city: place.location?.city,
      address_state: place.location?.state,
      address_zip_code: place.location?.zip_code,
      address_formatted: `${place.location?.address1} ${place.location?.city}, ${place.location?.state} ${place.location?.zip_code}`
    }
    updatePostPlace(postPlaceData)
  }

  const addToFavorites = () => {
    console.log( JSON.stringify(place))
  }


  return (
    <TouchableOpacity onPress={() => {}} className='bg-red-500 w-full my-3'>
      <View style={{height: screenHeight, width: screenWidth}} className='bg-red-300'>
        <Image className='flffex-1' source={{uri: place.image_url}}/>
        <View style={{backgroundColor: 'rgba(0, 0, 0, .5)', height: screenHeight, width: screenWidth}} className='absolute z-5 flex flex-col justify-between p-2'>
          <TouchableOpacity  onPress={() => {addToFavorites()}} className='w-full flex flex-row justify-end'>
            <Bookmark height={26} width={26} color={'white'}/>
          </TouchableOpacity>
          <View>
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

export default PlaceYelpTileSearch
