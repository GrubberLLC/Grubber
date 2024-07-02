import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, Switch, Text, TouchableWithoutFeedback, View } from 'react-native'
import SelectGalleryImageFlex from '../../Components/Select/SelectGalleryImageFlex'
import LargeTextInputComponent from '../../Components/Inputs/LargeTextInputComponent'
import ColorGuide from '../../ColorGuide'
import NoMenuPageHeader from '../../Components/Headers/NoMenuPageHeader'
import { useAuth } from '../../Context/UserContext'
import { FileText } from 'react-native-feather'
import UserInputComponent from '../../Components/Inputs/UserInputComponent'
import EditInputTextComponent from '../../Components/Inputs/EditInputTextComponent'
import EditSelectGalleryImageComponent from '../../Components/Select/EditSelectGalleryImageComponent'
import MenuSubButtonComponent from '../../Components/Buttons/MenuSubButtonComponent'
import { useNavigation } from '@react-navigation/native'

const EditProfileScreen = () => {
  const navigation = useNavigation()

  const { userProfile, username, updateUsername, firstName, updateFirstName,
    lastName, updateLastName, phone, updatePhone, bio, updateBio,
    location, updateLocation, usPublic, updatePublic, profileImage,
    updateProfilePic, updateUserProfile } = useAuth()

  console.log('profile: ', userProfile)

  useLayoutEffect(() => {
    updateUsername(userProfile ? userProfile.username : '')
    updateFirstName(userProfile ? userProfile.first_name : '')
    updateLastName(userProfile ? userProfile.last_name : '')
    updatePhone(userProfile ? userProfile.phone : '')
    updateBio(userProfile ? userProfile.bio : '')
    updateLocation(userProfile ? userProfile.location : '')
    updatePublic(userProfile ? userProfile.public : true)
    updateProfilePic(userProfile ? userProfile.profile_picture : '')
  }, [])

  return (
    <KeyboardAvoidingView
      className='flex-1'
      style={{ backgroundColor: ColorGuide['bg-dark'] }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90} // Adjust this offset as needed
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <NoMenuPageHeader leftLabel='Edit Profile' backing={true} />
          <View className='w-full flex flex-row py-4 justify-center'>
            <EditSelectGalleryImageComponent picture={profileImage} selectingImage={updateProfilePic} size={92} />
          </View>
          <ScrollView className='w-full flex flex-col px-2'>
            <View className='w-full mt-3'>
              <Text className='text-white text-lg font-bold mb-2'>Username: </Text>
              <EditInputTextComponent
                value={username}
                handleFunction={updateUsername}
                placeholder='Username...'
                multiline={false}
                label='Hash'
                secure={false}
              />
            </View>
            <View className='w-full flex flex-row mt-3'>
              <View className='flex-1 mr-1'>
                <Text className='text-white text-lg font-bold mb-2'>First Name: </Text>
                <EditInputTextComponent
                  value={firstName}
                  handleFunction={updateFirstName}
                  placeholder='First Name...'
                  multiline={false}
                  label='Hash'
                  secure={false}
                />
              </View>
              <View className='flex-1 ml-1'>
                <Text className='text-white text-lg font-bold mb-2'>Last Name: </Text>
                <EditInputTextComponent
                  value={lastName}
                  handleFunction={updateLastName}
                  placeholder='Last Name...'
                  multiline={false}
                  label='Hash'
                  secure={false}
                />
              </View>
            </View>
            <View className='w-full mt-3'>
              <Text className='text-white text-lg font-bold mb-2'>Bio: </Text>
              <EditInputTextComponent
                value={bio}
                handleFunction={updateBio}
                placeholder='Bio...'
                multiline={true}
                label='Hash'
                secure={false}
              />
            </View>
            <View className='w-full mt-3'>
              <Text className='text-white text-lg font-bold mb-2'>Phone: </Text>
              <EditInputTextComponent
                value={phone}
                handleFunction={updatePhone}
                placeholder='Phone...'
                multiline={false}
                label='Hash'
                secure={false}
              />
            </View>
            <View className='w-full mt-3'>
              <Text className='text-white text-lg font-bold mb-2'>Location: </Text>
              <EditInputTextComponent
                value={location}
                handleFunction={updateLocation}
                placeholder='Location...'
                multiline={false}
                label='Hash'
                secure={false}
              />
            </View>
            <View className='w-full flex flex-row justify-between p2 pt-4'>
              <Text className='text-white font-semibold text-xl'>Public: </Text>
              <Switch className='scale-75' value={usPublic} onValueChange={() => { updatePublic(!usPublic) }} trackColor={{ false: 'white', true: '#e94f4e' }} />
            </View>
          </ScrollView>
          <MenuSubButtonComponent justify='end' label='Update Profile' handleFunction={() => updateUserProfile(navigation)} />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default EditProfileScreen
