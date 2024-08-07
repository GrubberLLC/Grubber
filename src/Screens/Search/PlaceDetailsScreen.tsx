import React, { useEffect } from 'react'
import { ActivityIndicator, ScrollView, Text, View } from 'react-native'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../Types/NavigationTypes';
import { usePost } from '../../Context/PostContext';
import { useExplore } from '../../Context/ExploreContext';
import PlaceTileDatabase from '../../Components/Tile/PlaceTileDatabase';
import NoMenuPageHeader from '../../Components/Headers/NoMenuPageHeader';
import PostTile from '../../Components/Tile/PostTile';
import PostTileWithProfile from '../../Components/Tile/PostTileWithProfile';
import { useSearch } from '../../Context/SearchContext';
import PlaceTileYelp from '../../Components/Tile/PlaceTileYelp';
import PostTileWithProfileSearch from '../../Components/Tile/PostTileWithProfileSearch';
import ColorGuide from '../../ColorGuide';
import PlaceHeader from '../../Components/Headers/PlaceHeader';
import PlaceYelpTileSearch from '../../Components/Tile/PlaceYelpTileSearch';
import PlaceYelpTileSearchNoBookmar from '../../Components/Tile/PlaceYelpTileSearchNoBookmar';

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

const PlaceDetailsScreen = () => {
  const route = useRoute<ProfileScreenRouteProp>();
  const params = route.params

  const {searchYelpFull, loadingPlaces, yelpResultsFull, yelpResultsFullPosts} = useSearch()

  useEffect(() => {
    searchYelpFull(params.place_id)
  }, [])

  return (
    <View className='flex-1 w-full' style={{backgroundColor: ColorGuide['bg-dark']}}>
      <PlaceHeader name={yelpResultsFull.name} place_id={yelpResultsFull.url}/>
      {
        loadingPlaces
          ? <View className='flex-1 flex justify-center items-center'>
              <ActivityIndicator size={'large'} color={'white'}/>
            </View>
          : <View className='flex-1 flex flex-start'>
              <PlaceYelpTileSearchNoBookmar place={yelpResultsFull}/>
              <ScrollView className='flex-1'>
                {
                  yelpResultsFullPosts && yelpResultsFullPosts.length > 0
                    ? (
                        yelpResultsFullPosts?.map((singlePost) => (
                          <View key={singlePost.post_id}>
                            <PostTileWithProfileSearch post={singlePost} />
                          </View>
                        ))
                      )
                    : <View className='flex-1 flex flex-col justify-center mt-16 items-center'>
                        <Text className='text-white font-semibold text-xl'>No Post Found...</Text>
                      </View>
                }
              </ScrollView>
            </View>
      }
    </View>
  )
}

export default PlaceDetailsScreen
