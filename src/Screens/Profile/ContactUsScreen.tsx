import React, { useEffect, useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import NoMenuPageHeader from '../../Components/Headers/NoMenuPageHeader'
import { Activity, AlertCircle, Bell, Bookmark, ChevronsRight, Edit2, Grid, Heart, HelpCircle, Lock, LogOut, MessageSquare, User, X } from 'react-native-feather'
import { useAuth } from '../../Context/UserContext'
import ColorGuide from '../../ColorGuide'
import UserInputComponent from '../../Components/Inputs/UserInputComponent'
import MenuSubButtonComponent from '../../Components/Buttons/MenuSubButtonComponent'
import { useNavigation } from '@react-navigation/native'
import EditInputTextComponent from '../../Components/Inputs/EditInputTextComponent'
import email from 'react-native-email';

const ContactUsScreen = () => {
  const navigation = useNavigation()

  const {userProfile} = useAuth()

  const [subject, setSubject] = useState<string>('')
  const [message, setMessage] = useState<string>('')

  const handleSubjext = (text: string) => {
    setSubject(text)
  }

  const handleMessage = (text: string) => {
    setMessage(text)
  }

  
  const submitForm = () => {
    const to = ['contact@grubber.io'] // string or array of email addresses
    email(to, {
        // Optional additional arguments
        cc: [userProfile?.email], // string or array of email addresses
        subject: subject,
        body: message,
        checkCanOpen: false // Call Linking.canOpenURL prior to Linking.openURL
    }).catch(console.error)
  }

  return (
    <View className={'flex-1'} style={{backgroundColor: ColorGuide['bg-dark']}}>
      <NoMenuPageHeader backing={true} leftLabel='Contact Grubber'/>
      <View className='flex-1 flex flex-col justify-between p-3'>
        <View></View>
        <View>
          <Text className='text-white text-2xl font-semibold'>Contact Grubber</Text>
          <Text className='text-white text-base mt-2'>Need to contact us, simply fill out the form below with your details. Due to high volume, please give 24-48 hours for a response from a team member.</Text>
          <View className='flex flex-row w-full justify-between items-center mt-3'>
            <Text className='text-white text-lg font-bold'>Username:</Text>
            <Text className='text-white text-base mt-3'>{userProfile?.username}</Text>
          </View>
          <View className='flex flex-row w-full justify-between items-center mb-3'>
            <Text className='text-white text-lg font-bold'>Email:</Text>
            <Text className='text-white text-base mt-3'>{userProfile?.email}</Text>
          </View>
          <View className='w-full mt-3'>
            <Text className='text-white text-lg font-bold mb-2'>Subject: </Text>
            <EditInputTextComponent 
              value={subject} 
              handleFunction={handleSubjext} 
              placeholder='Subject...'
              multiline={false}
              label='Hash'
              secure={false}
            />
          </View>
          <View>
            <Text className='text-white text-lg font-bold mb-2 mt-3'>Message: </Text>
            <EditInputTextComponent 
              value={message} 
              handleFunction={handleMessage} 
              placeholder='message...'
              multiline={true}
              label='Hash'
              secure={false}
            />
          </View>
          <MenuSubButtonComponent justify='end' label='Contact Grubber' loading={false} handleFunction={() => {submitForm()}}/>
        </View>
      </View>
    </View>
  )
}

export default ContactUsScreen
