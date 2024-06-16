import React, { useState } from 'react'
import { Text, View } from 'react-native'
import SelectGalleryImageFlex from '../../Components/Select/SelectGalleryImageFlex'
import LargeTextInputComponent from '../../Components/Inputs/LargeTextInputComponent'
import ColorGuide from '../../ColorGuide'
import NoMenuPageHeader from '../../Components/Headers/NoMenuPageHeader'
import { useAuth } from '../../Context/UserContext'
import { FileText } from 'react-native-feather'
import UserInputComponent from '../../Components/Inputs/UserInputComponent'
import EditInputTextComponent from '../../Components/Inputs/EditInputTextComponent'
import { ScrollView } from 'react-native-gesture-handler'
import EditSelectGalleryImageComponent from '../../Components/Select/EditSelectGalleryImageComponent'
import MenuSubButtonComponent from '../../Components/Buttons/MenuSubButtonComponent'

const EditProfileScreen = () => {

  const {userProfile} = useAuth()

  const [profileImage, setProfileImage] = useState({
    uri: userProfile?.profile_picture,
    fileType: 'image/jpeg' ,
    fileName: userProfile?.profile_picture
  })
  const [username, setUsername] = useState<string>(userProfile?.username)
  const [firstName, setFirstName] = useState<string>(userProfile?.first_name)
  const [lastName, setLastName] = useState<string>(userProfile?.last_name)
  const [phone, setPhone] = useState<string>(userProfile?.phone)
  const [bio, setBio] = useState<string>(userProfile?.bio)
  const [location, setLocation] = useState<string>(userProfile?.location)
  const [usPublic, setIsPublic] = useState<string>(userProfile?.public)

  return (
    <View className='flex-1' style={{backgroundColor: ColorGuide['bg-dark']}}>
      <NoMenuPageHeader leftLabel='Edit Profile' backing={true}/>
      <View className='w-full flex flex-row py-4 justify-center'>
        <EditSelectGalleryImageComponent picture={profileImage} selectingImage={() => {setProfileImage(null)}} size={92}/>
      </View>
      <ScrollView className='w-full flex flex-col px-2'>
        <View className='w-full mt-3'>
          <Text className='text-white text-lg font-bold mb-2'>Username: </Text>
          <EditInputTextComponent 
            value={username} 
            handleFunction={setUsername} 
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
              handleFunction={setFirstName} 
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
              handleFunction={setLastName} 
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
            handleFunction={setBio} 
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
            handleFunction={setPhone} 
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
            handleFunction={setLocation} 
            placeholder='Location...'
            multiline={false}
            label='Hash'
            secure={false}
          />
        </View>
      </ScrollView>
      <MenuSubButtonComponent justify='end' label='Update Profile' handleFunction={() => {}}/>
    </View>
  )
}

export default EditProfileScreen
                                                  