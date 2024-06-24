import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import { useAuth } from '../../Context/UserContext'
import ColorGuide from '../../ColorGuide'
import NoMenuPageHeader from '../../Components/Headers/NoMenuPageHeader'

const LikedPostsScreen = () => {
  const  navigation = useNavigation()
  const {userLikedPosts} = useAuth()

  const redirectToPostScreen = () => {
    navigation.navigate('')
  }

  return (
    <View className={'flex-1'} style={{ backgroundColor: ColorGuide['bg-dark'] }}>
      <NoMenuPageHeader backing={true} leftLabel='Liked Posts'/>
      {
        userLikedPosts && userLikedPosts.length > 0
          ? <ScrollView className='flex-1'>
              <View className='flex flex-wrap flex-row'>
                {
                  userLikedPosts.map((post) => {
                    return(
                      <View key={post.post_id} className='w-1/3 h-32 p-1'>
                        <Image className='flex-1' source={{uri: post.media}}/>
                      </View>
                    )
                  })
                } 
              </View>
            </ScrollView>
          : <View className='flex-1 flex justify-center items-center'>
              <Text className='text-white text-xl'>No Liked Post Found!</Text> 
            </View>
      }
    </View>
  )
}

export default LikedPostsScreen
