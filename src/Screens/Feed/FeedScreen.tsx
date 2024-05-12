import React, { useEffect } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import FeedHeader from '../../Components/Headers/FeedHeader'
import { useAuth } from '../../Context/UserContext'
import { usePost } from '../../Context/PostContext'
import { ScrollView } from 'react-native-gesture-handler'
// import PostTileComponent from '../../Components/Tiles/PostTileComponent'

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

const FeedScreen = () => {

  const {signOutUser, userProfile} = useAuth()

  const {getUsersPosts, loggedInUsersPosts} = usePost()

  useEffect(() => {
    console.log(loggedInUsersPosts)
  }, [])

  return (
    <View className={'flex-1 bg-neutral-900'}>
      <FeedHeader />
      <Text className={'text-white font-bold'}>Screen</Text>
      <TouchableOpacity onPress={() => {signOutUser()}}><Text className={'text-white font-bold'}>Logout</Text></TouchableOpacity>
      {
        loggedInUsersPosts && loggedInUsersPosts.length > 0
          ? <ScrollView className='flex-1'>
              {
                loggedInUsersPosts.map((singlePost: SinglePostProps) => {
                  return(
                    <View>
                      {/* <PostTileComponent post={singlePost}/> */}
                    </View>
                  )
                })
              }
            </ScrollView>
          : null 
      }
    </View>
  )
}

export default FeedScreen 