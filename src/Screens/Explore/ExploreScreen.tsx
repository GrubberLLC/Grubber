import React, { useEffect } from 'react'
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useExplore } from '../../Context/ExploreContext'
import { RefreshCw } from 'react-native-feather'
import ExploreHeader from '../../Components/Headers/ExploreHeader'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import SearchBarComponent from '../../Components/Search/SearchBarComponent'
import { usePost } from '../../Context/PostContext'
import ColorGuide from '../../ColorGuide'
import { useAuth } from '../../Context/UserContext'
import AddMemberProfile from '../../Components/Profiles/AddMemberProfile'
import ProfileWithFollow from '../../Components/Profiles/ProfileWithFollow'

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

  const {loadingPosts, allPosts, grabTotalPosts} = useExplore()
  const {searchedUsers, searchedUserResults, updateUserSearchTerm, 
    userFollowing, userProfile, createFollowUser, removeFollowing} = useAuth()

  useEffect(() => {
    grabTotalPosts()
  }, [])

  const redirectToDetailScreen = (post: SinglePostProps) => {
    navigation.navigate('PostDetailsScreenExplore', {post: post})
  }

  const updateSearchTerm = (text: string) => {
    updateUserSearchTerm(text)
  }

  const onFollowUser = (user: any) => {
    createFollowUser(user)
  }

  const onUnfollowUser = (friend_id: any) => {
    removeFollowing(friend_id)
  }

  const getFollowStatus = (user_id: string) => {
    const followingUser = userFollowing.find((follow) => follow.user_id === user_id);
    return followingUser ? followingUser.status : ''
  };

  const getFollowUser = (user_id: string) => {
    const followingUser = userFollowing.find((follow) => follow.user_id === user_id);
    return followingUser
  };

  return (
    <View className='flex-1' style={{backgroundColor: ColorGuide['bg-dark']}}>
      <View className='h-16 m-2 mt-3'>
        <SearchBarComponent term={searchedUsers} updateTerm={updateSearchTerm} icon='Search' placeholder='search user...'/>
      </View>
      <ScrollView className='flex-1'>
        {
          searchedUsers != ''
            ? searchedUserResults.map((user) => {
                let isSelected = getFollowStatus(user.user_id)
                let followingUser = getFollowUser(user.user_id)
                return(
                  <View>
                    {
                      user.user_id === userProfile?.user_id
                        ? null 
                        : <View key={user.user_id}>
                            <ProfileWithFollow profile={user} followStatus={isSelected} followUser={followingUser} onFollow={onFollowUser} onUnfollow={onUnfollowUser}/>
                          </View>
                    }
                  </View>
                )
              })
            : loadingPosts ? (
                  <View className='flex-1 my-80 flex justify-center items-center'><ActivityIndicator className='m-auto' size="large" color="#fff" /></View>
                ) : (
                  <View className='flex flex-wrap flex-row'>
                    {allPosts != null &&
                      allPosts.map((post, index) => (
                        <TouchableOpacity onPress={() => {redirectToDetailScreen(post)}} key={index} className='w-1/3 p-1'>
                          <Image className='w-full h-32' source={{ uri: post.media }} />
                        </TouchableOpacity>
                      ))}
                  </View>
                )
        }
      </ScrollView>
    </View>
  )
}

export default ExploreScreen
