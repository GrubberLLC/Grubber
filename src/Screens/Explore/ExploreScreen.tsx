import React, { useEffect } from 'react'
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useExplore } from '../../Context/ExploreContext'
import { RefreshCw } from 'react-native-feather'
import ExploreHeader from '../../Components/Headers/ExploreHeader'
import { useNavigation } from '@react-navigation/native'

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
  latitude: string,
  longitude: string,
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

const ExploreScreen = () => {
  const navigation = useNavigation()

  const {loadingPosts, allPosts, grabAllPosts} = useExplore()

  useEffect(() => {
    grabAllPosts()
  }, [])

  const redirectToDetailScreen = (post: SinglePostProps) => {
    navigation.navigate('PostDetailsScreen', {post: post})
  }

  return (
    <View className='flex-1 bg-neutral-900'>
      <ExploreHeader/>
      <ScrollView className='flex-1'>
        {loadingPosts ? (
          <View className='flex-1 my-80 flex justify-center items-center'><ActivityIndicator className='m-auto' size="large" color="#fff" /></View>
        ) : (
          <View className='flex flex-wrap flex-row'>
            {allPosts &&
              allPosts.map((post: SinglePostProps, index: number) => (
                <TouchableOpacity onPress={() => {redirectToDetailScreen(post)}} key={index} className='w-1/3 p-1'>
                  <Image className='w-full h-32' source={{ uri: post.media }} />
                </TouchableOpacity>
              ))}
          </View>
        )}
      </ScrollView>
    </View>
  )
}

export default ExploreScreen
