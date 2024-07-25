import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { RefreshControl, Text, TouchableOpacity, View } from 'react-native'
import FeedHeader from '../../Components/Headers/FeedHeader'
import { useAuth } from '../../Context/UserContext'
import { usePost } from '../../Context/PostContext'
import { ScrollView } from 'react-native-gesture-handler'
import PostTile from '../../Components/Tile/PostTile'
import ColorGuide from '../../ColorGuide'
import PostTileWithProfile from '../../Components/Tile/PostTileWithProfile'

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
  const {getUserListRequests, grabUserFollowers, 
    grabUserFollowing, getFollowingPosts, 
    getAllFolloingRequests, followingPosts, getFavorites, getLikedPosts, getCommentedPosts, getUserActivity} = useAuth()

  useLayoutEffect(() => {
    if(userProfile && userProfile.user_id){
      getFollowingPosts(userProfile.user_id)
      getAllFolloingRequests(userProfile.user_id)
      getUsersPosts(userProfile.user_id)
      getUserListRequests(userProfile.user_id)
      grabUserFollowers(userProfile.user_id)
      grabUserFollowing(userProfile.user_id)
      getFavorites(userProfile.user_id)
      getLikedPosts()
      getCommentedPosts()
      getUserActivity()
    }
  }, [userProfile])

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    console.log('refreshing');
    Promise.all([
      getFollowingPosts(userProfile.user_id),
      getFavorites(userProfile.user_id),
      getLikedPosts()
    ])
    .then(() => {
      setRefreshing(false);
    })
    .catch((error) => {
      console.error('Error refreshing:', error);
      setRefreshing(false);
    });
  }, [userProfile?.user_id]);

  const [refreshing, setRefreshing] = useState(false);

  return (
    <View className={'flex-1'} style={{backgroundColor: ColorGuide['bg-dark']}}>
      <FeedHeader />
      {
        followingPosts && followingPosts.length > 0
          ? <ScrollView 
              className='flex-1'
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={[ColorGuide['primary']]}
                  tintColor={ColorGuide['primary']}
                />
              }
              >
              {
                followingPosts.map((singlePost: SinglePostProps) => {
                  return(
                    <View key={singlePost.yelp_id}>
                      <PostTileWithProfile post={singlePost} profile={userProfile}/>
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