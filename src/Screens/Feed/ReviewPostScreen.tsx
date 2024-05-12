import React, { useEffect } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
// import AddPostProfileComponent from '../../Components/Profiles/AddPostProfileComponent'
import { useAuth } from '../../Context/UserContext'
import SelectedImageComponent from '../../Components/Images/SelectedImageComponent'
import CaptionComponent from '../../Components/Info/CaptionComponent'
import { usePost } from '../../Context/PostContext'
// import PlacePostTileComponent from '../../Components/Tiles/PlacePostTileComponent'
import MenuSubButtonComponent from '../../Components/Buttons/MenuSubButtonComponent'
import NoMenuPageHeader from '../../Components/Headers/NoMenuPageHeader'

const ReviewPostScreen = () => {
  const navigation = useNavigation()

  const {userProfile} = useAuth()
  const {postCaption, postPicture, postPlace, createPost, createPostLoading} = usePost()

  useEffect(() => {
    console.log('review photo: ', postPlace)
  }, [])

  const CreateANewPost = () => {
    createPost(navigation)
  }

  return (
    <View className={'flex-1 bg-neutral-900'}>
      <NoMenuPageHeader backing={true} leftLabel='New Post'/>
    </View>
  )
}

export default ReviewPostScreen
