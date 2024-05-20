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
import ReviewPostTile from '../../Components/Tile/ReviewPostTile'

const ReviewPostScreen = () => {
  const navigation = useNavigation()

  const {userProfile} = useAuth()
  const {createPost, createPostLoading} = usePost()


  const CreateANewPost = () => {
    createPost(navigation)
  }

  return (
    <View className={'flex-1 bg-neutral-900 flex flex-col justify-between'}>
      <View className='flex-1'>
        <NoMenuPageHeader backing={true} leftLabel='Confirm Post'/>
        <View className='flex-1'>
          <ReviewPostTile />
        </View>
      </View>
      <MenuSubButtonComponent justify='end' label='Create Post' loading={createPostLoading} handleFunction={() => {CreateANewPost()}}/>
    </View>
  )
}

export default ReviewPostScreen
