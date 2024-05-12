import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { usePost } from '../../Context/PostContext'
import NoMenuPageHeader from '../../Components/Headers/NoMenuPageHeader'

const AddPlaceScreen = () => {
  const navigation = useNavigation()

  const {postPicture, postCaption, updatePicture, updateCaption} = usePost()

  const redirectToPostPlace = () => {
    navigation.navigate('AddPostPlaceScreen')
  }

  return (
    <View className={'flex-1 bg-neutral-900'}>
      <NoMenuPageHeader backing={true} leftLabel='New Post'/>
    </View>
  )
}

export default AddPlaceScreen

