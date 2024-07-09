import React from 'react'
import { Dimensions, Text, View, Image, TouchableOpacity } from 'react-native'
import { Star } from 'react-native-feather';
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

const PlaceTileMap: React.FC<PlaceTileProps> = ({ place }) => {
  const navigation = useNavigation();

  const redirectToPlaceScreen = () => {
    navigation.navigate('PlaceDetailsScreenSearch', { place_id: place.id });
  }

  return (
    <TouchableOpacity onPress={redirectToPlaceScreen} className='w-64 rounded-md overflow-hidden' style={{ backgroundColor: ColorGuide.primary}}>
      <View style={{ height: 200, backgroundColor: ColorGuide.primary }}>
        <Image style={{ height: 200, width: '100%' }} source={{ uri: place.image_url }} />
        <View style={{ backgroundColor: 'rgba(0, 0, 0, .5)', height: '100%', width: '100%', position: 'absolute', padding: 8, justifyContent: 'flex-end' }}>
          <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>{place.name}</Text>
          <Text style={{ color: 'white', fontSize: 14, fontWeight: '600' }}>{place.location?.address1} {place.location?.city}, {place.location?.state} {place.location?.zip_code}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Star height={20} width={20} color={'#e94f4e'} fill={'#e94f4e'} />
              <Text style={{ color: 'white', fontSize: 14, fontWeight: '600', marginLeft: 4 }}>{place.rating} / 5 rating</Text>
            </View>
            <Text style={{ color: 'white', fontSize: 14, fontWeight: '600' }}>({place.review_count}) reviews</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default PlaceTileMap;
