import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { usePost } from '../../Context/PostContext'
import NoMenuPageHeader from '../../Components/Headers/NoMenuPageHeader'
import SelectGalleryImage from '../../Components/Select/SelectGalleryImage'
import AddCaptionComponent from '../../Components/Info/AddCaptionComponent'
import MenuSubButtonComponent from '../../Components/Buttons/MenuSubButtonComponent'
import ColorGuide from '../../ColorGuide'

const NewPostScreen = () => {
  const navigation = useNavigation()

  const {postPicture, postCaption, updatePicture, updateCaption} = usePost()

  const redirectToPostPlace = () => {
    navigation.navigate('NewPostPlaceScreen')
  }

  return (
    <View className={'flex-1'} style={{backgroundColor: ColorGuide['bg-dark']}}>
      <NoMenuPageHeader backing={true} leftLabel='New Post'/>
      <SelectGalleryImage picture={postPicture} selectingImage={updatePicture}/>
      <AddCaptionComponent value={postCaption} onChange={updateCaption} 
        capitalize='none' placeholder='add caption...' multiline={true}/>
      <MenuSubButtonComponent justify='end' label='Add Place' handleFunction={redirectToPostPlace}/>
    </View>
  )
}

export default NewPostScreen
