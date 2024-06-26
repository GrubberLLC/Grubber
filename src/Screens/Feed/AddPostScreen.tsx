import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { usePost } from '../../Context/PostContext'
import NoMenuPageHeader from '../../Components/Headers/NoMenuPageHeader'
import ColorGuide from '../../ColorGuide'

const AddPostScreen = () => {
  const navigation = useNavigation()

  const {postPicture, postCaption, updatePicture, updateCaption} = usePost()

  const redirectToPostPlace = () => {
    navigation.navigate('AddPostPlaceScreen')
  }

  return (
    <View className={'flex-1'} style={{backgroundColor: ColorGuide['bg-dark']}}>
      <NoMenuPageHeader backing={true} leftLabel='New Post'/>
    </View>
  )
}

export default AddPostScreen
