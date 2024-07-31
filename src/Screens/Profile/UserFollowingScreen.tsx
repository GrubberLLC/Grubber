import React, { useEffect } from 'react'
import { View } from 'react-native'
import { useAuth } from '../../Context/UserContext'
import ProfileWithFollow from '../../Components/Profiles/ProfileWithFollow'
import ColorGuide from '../../ColorGuide'
import FollowresHeader from '../../Components/Headers/FollowresHeader'
import PostProfile from '../../Components/Profiles/PostProfile'
import FollowingHeader from '../../Components/Headers/FollowingHeader'

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../Types/NavigationTypes';

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'ListDetailScreen'>;

const UserFollowingScreen = () => {
  const navigation = useNavigation()
  const route = useRoute<ProfileScreenRouteProp>()
  const params = route.params

  const {userProfile, createFollowUser, removeFollowing, userSelectedFollowing} = useAuth()

  console.log('user following: ', userSelectedFollowing)

  return (
    <View className={'flex-1'} style={{backgroundColor: ColorGuide['bg-dark']}}>
      <FollowingHeader />
      {
        userSelectedFollowing.map((user) => {
          return(
            <View>
              {
                <View key={user.user_id}>
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

export default UserFollowingScreen
