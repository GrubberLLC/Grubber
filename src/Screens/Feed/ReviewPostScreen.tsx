import React, { useEffect } from 'react'
import { ScrollView, Text, View } from 'react-native'
import SelectImageComponent from '../../Components/Select/SelectImageComponent'
import { useNavigation } from '@react-navigation/native'
import PageHeaderComponent from '../../Components/Headers/PageHeaderComponent'
import AddPostProfileComponent from '../../Components/Profiles/AddPostProfileComponent'
import { useAuth } from '../../Context/UserContext'
import SelectedImageComponent from '../../Components/Select/SelectedImageComponent'
import CaptionComponent from '../../Components/Info/CaptionComponent'
import { usePost } from '../../Context/PostContext'
import PlacePostTileComponent from '../../Components/Tiles/PlacePostTileComponent'
import NextButtonComponnent from '../../Components/Buttons/NextButtonComponnent'
import CreateButtonComponent from '../../Components/Buttons/CreateButtonComponent'
import LoadingNextButtonComponent from '../../Components/Buttons/LoadingNextButtonComponent'

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
      <PageHeaderComponent backing={true} leftLabel='New Post'/>
      <ScrollView className='flex-1 flex flex-col'>
        <AddPostProfileComponent profile={userProfile}/>
        <SelectedImageComponent image={postPicture?.uri ? postPicture.uri : null}/>
        <PlacePostTileComponent place={postPlace}/>
        <CaptionComponent caption={postCaption}/>
      </ScrollView>
      {
        createPostLoading
          ? <View>
              <LoadingNextButtonComponent justify='end'/>
            </View>
          : <View>
              <CreateButtonComponent justify='end' buttonFunction={CreateANewPost}/>
            </View>
      }
    </View>
  )
}

export default ReviewPostScreen
