import React from 'react'
import { View } from 'react-native'
import { useAuth } from '../../Context/UserContext'
import ProfileWithFollow from '../../Components/Profiles/ProfileWithFollow'
import ColorGuide from '../../ColorGuide'
import FollowresHeader from '../../Components/Headers/FollowresHeader'
import PostProfile from '../../Components/Profiles/PostProfile'
import FollowingHeader from '../../Components/Headers/FollowingHeader'

const FollowingScreen = () => {

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
      <FollowingHeader />
      {
        userFollowing.map((user) => {
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
      }
    </View>
  )
}

export default FollowingScreen
