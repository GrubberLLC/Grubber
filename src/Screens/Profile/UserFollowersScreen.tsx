import React, { useEffect } from 'react'
import { View } from 'react-native'
import { useAuth } from '../../Context/UserContext'
import ProfileWithFollow from '../../Components/Profiles/ProfileWithFollow'
import ColorGuide from '../../ColorGuide'
import FollowresHeader from '../../Components/Headers/FollowresHeader'
import PostProfile from '../../Components/Profiles/PostProfile'

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../Types/NavigationTypes';

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'ListDetailScreen'>;


const UserFollowersScreen = () => {
  const navigation = useNavigation()
  const route = useRoute<ProfileScreenRouteProp>()
  const params = route.params

  const {userProfile, createFollowUser, removeFollowing, userSelectedFollowers} = useAuth()

  console.log('user followers: ', userSelectedFollowers)

  return (
    <View className={'flex-1'} style={{backgroundColor: ColorGuide['bg-dark']}}>
      <FollowresHeader />
      {
        userSelectedFollowers.map((user) => {
          console.log('single user: ', user)
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

export default UserFollowersScreen
