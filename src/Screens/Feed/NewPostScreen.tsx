import React, { useEffect, useState } from 'react'
import { ScrollView, Text, View, KeyboardAvoidingView, Platform, TextInput, Keyboard } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { usePost } from '../../Context/PostContext'
import NoMenuPageHeader from '../../Components/Headers/NoMenuPageHeader'
import SelectGalleryImage from '../../Components/Select/SelectGalleryImage'
import AddCaptionComponent from '../../Components/Info/AddCaptionComponent'
import MenuSubButtonComponent from '../../Components/Buttons/MenuSubButtonComponent'
import ColorGuide from '../../ColorGuide'

const NewPostScreen = () => {
  const navigation = useNavigation()
  const { postPicture, postCaption, updatePicture, updateCaption } = usePost()
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const redirectToPostPlace = () => {
    navigation.navigate('NewPostPlaceScreen')
  }

  return (
    <KeyboardAvoidingView
      className='flex-1 flex-col items-between justify-between'
      style={{ backgroundColor: ColorGuide['bg-dark'] }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90} // Adjust this offset as needed
    >
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <NoMenuPageHeader backing={true} leftLabel='New Post' />
        {!isKeyboardVisible && (
          <SelectGalleryImage picture={postPicture} selectingImage={updatePicture} />
        )}
        <AddCaptionComponent
          value={postCaption}
          onChange={updateCaption}
          capitalize='none'
          placeholder='add caption...'
          multiline={true}
          returnKeyType="done"
        />
        <MenuSubButtonComponent justify='end' label='Add Place' handleFunction={redirectToPostPlace} />
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default NewPostScreen
