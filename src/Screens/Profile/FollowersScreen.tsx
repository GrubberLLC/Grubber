import React from 'react'
import { View } from 'react-native'
import { useAuth } from '../../Context/UserContext'
import ProfileWithFollow from '../../Components/Profiles/ProfileWithFollow'
import ColorGuide from '../../ColorGuide'
import FollowresHeader from '../../Components/Headers/FollowresHeader'
import PostProfile from '../../Components/Profiles/PostProfile'

const FollowersScreen = () => {

  const {userFollowers, userFollowing, userProfile, createFollowUser, removeFollowing} = useAuth()

  const getFollowStatus = (user_id: string) => {
    const followingUser = userFollowing.find((follow) => follow.user_id === user_id);
    return followingUser ? followingUser.status : ''
  };

  const getFollowUser = (user_id: string) => {
    const followingUser = userFollowing.find((follow) => follow.user_id === user_id);
    return followingUser
  };

  const onFollowUser = (user: any) => {
    createFollowUser(user)
  }

  const onUnfollowUser = (friend_id: any) => {
    console.log(friend_id)
    removeFollowing(friend_id)
  }

  return (
    <View className={'flex-1'} style={{backgroundColor: ColorGuide['bg-dark']}}>
      <FollowresHeader />
      {
        userFollowers.map((user) => {
          let isSelected = getFollowStatus(user.user_id)
          let followingUser = getFollowUser(user.user_id)
          return(
            <View>
              {
                user.user_id === userProfile?.user_id
                  ? null 
                  : <View key={user.user_id}>
                      <PostProfile profile={user}/>
                    </View>
              }
            </View>
          )
        })
      }
    </View>
  )
}

export default FollowersScreen
