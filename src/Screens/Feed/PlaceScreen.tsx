import React, { useEffect } from 'react'
import { ActivityIndicator, Image, ScrollView, Text, View } from 'react-native'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../Types/NavigationTypes';
import { usePost } from '../../Context/PostContext';
import { useExplore } from '../../Context/ExploreContext';
import PlaceTileDatabase from '../../Components/Tile/PlaceTileDatabase';
import NoMenuPageHeader from '../../Components/Headers/NoMenuPageHeader';
import PostTile from '../../Components/Tile/PostTile';
import PostTileWithProfile from '../../Components/Tile/PostTileWithProfile';
import ColorGuide from '../../ColorGuide';
import PlaceHeader from '../../Components/Headers/PlaceHeader';

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'AccessCodeScreen'>;

interface SinglePostProps {
  address_city: string,
  address_formatted: string,
  address_state: string, 
  address_street: string,
  address_zip_code: string,
  caption: string | null,
  closed: boolean,
  created_at: string,
  image: string,
  latitude: number,
  longitude: number,
  media: string,
  media_type: string,
  name: string, 
  phone: string,
  place_id: string,
  post_id: string,
  price: string,
  rating: number,
  review_count: number,
  user_id: string,
  yelp_id: string,
  yelp_url: string,
}

const PlaceScreen = () => {
  const route = useRoute<ProfileScreenRouteProp>();
  const params = route.params

  const {grabPlaceById, loadingPlace, placePosts, selectedPlace} = useExplore()

  useEffect(() => {
    grabPlaceById(params.place_id)
  }, [])

  return (
    <View className={'flex-1'} style={{backgroundColor: ColorGuide['bg-dark']}}>
      <PlaceHeader name={selectedPlace ? selectedPlace.name : ''} place_id={selectedPlace ? selectedPlace.place_id : ''}/>
      {
        loadingPlace
          ? <View className='flex-1 flex justify-center items-center'>
              <ActivityIndicator size={'large'} color={'white'}/>
            </View>
          : <View className='flex-1 flex flex-start'>
              <PlaceTileDatabase place={selectedPlace}/>
              {/* <Text className='text-white text-2xl font-semibold p-3'>Posts: </Text> */}
              <ScrollView className='flex-1 mt-8'>
                {
                  placePosts?.map((singlePost) => (
                    <View className='w-1/3 p-1' key={singlePost.post_id}>
                      <Image className='w-full h-32' source={{ uri: singlePost.media }} />
                    </View>
                  ))}
              </ScrollView>
            </View>
      }
    </View>
  )
}

export default PlaceScreen
