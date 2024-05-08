import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import AddPostHeader from '../../Components/Headers/AddPostHeader'
import SelectImageComponent from '../../Components/Select/SelectImageComponent'
import AddCaptionComponent from '../../Components/Inputs/AddCaptionComponent'
import NextButtonComponnent from '../../Components/Buttons/NextButtonComponnent'
import { useNavigation } from '@react-navigation/native'
import { usePost } from '../../Context/PostContext'
import LargeTextInputComponent from '../../Components/Inputs/LargeTextInputComponent'
import PageHeaderComponent from '../../Components/Headers/PageHeaderComponent'

const AddPostScreen = () => {
  const navigation = useNavigation()

  const {postPicture, postCaption, updatePicture, updateCaption} = usePost()

  const redirectToPostPlace = () => {
    navigation.navigate('AddPostPlaceScreen')
  }

  return (
    <View className={'flex-1 bg-neutral-900'}>
      <PageHeaderComponent backing={true} leftLabel='New Post'/>
      <View className='flex-1 flex flex-col justify-between'>
        <View className='flex-1'>
          <SelectImageComponent picture={postPicture} selectingImage={updatePicture}/>
          <ScrollView className='mt-3 pb-3 border-b-2 border-b-neutral-700'>
            <LargeTextInputComponent
              value={postCaption}
              onChange={updateCaption}
              capitalize='none'
              placeholder='enter caption here...'
              multiline={true}
            />
          </ScrollView>
        </View>
        <View>
          <NextButtonComponnent justify='end' buttonFunction={redirectToPostPlace}/>
        </View>
      </View>
    </View>
  )
}

export default AddPostScreen
