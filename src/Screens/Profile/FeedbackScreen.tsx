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

const FeedbackScreen = () => {
  const navigation = useNavigation()

  const {userProfile} = useAuth()

  const [message, setMessage] = useState<string>('')

  const handleMessage = (text: string) => {
    setMessage(text)
  }

  
  const submitForm = () => {
    const to = ['contact@grubber.io'] // string or array of email addresses
    email(to, {
        // Optional additional arguments
        cc: [userProfile?.email], // string or array of email addresses
        subject: 'Feedback / Suggestion',
        body: message,
        checkCanOpen: false // Call Linking.canOpenURL prior to Linking.openURL
    }).catch(console.error)
  }

  return (
    <View className={'flex-1'} style={{backgroundColor: ColorGuide['bg-dark']}}>
      <NoMenuPageHeader backing={true} leftLabel='Feedback & Suggestions'/>
      <View className='flex-1 flex flex-col justify-between p-3'>
        <View></View>
        <View>
          <Text className='text-white text-2xl font-semibold'>Feedback & Suggestions</Text>
          <Text className='text-white text-base mt-2'>Your feedback and suggestions are extremely important to us. It is critical to the success of Grubber long term. 
            Your suggestions and feedback is what our team uses to improve all aspects of Grubber. Feel free to submit your feedback below. Thank you for taking the time 
            to give us your feedback.</Text>
          <View className='flex flex-row w-full justify-between items-center mt-3'>
            <Text className='text-white text-lg font-bold'>Username:</Text>
            <Text className='text-white text-base mt-3'>{userProfile?.username}</Text>
          </View>
          <View className='flex flex-row w-full justify-between items-center mb-3'>
            <Text className='text-white text-lg font-bold'>Email:</Text>
            <Text className='text-white text-base mt-3'>{userProfile?.email}</Text>
          </View>
          <View>
            <Text className='text-white text-lg font-bold mb-2 mt-3'>Feedback: </Text>
            <EditInputTextComponent 
              value={message} 
              handleFunction={handleMessage} 
              placeholder='feedback...'
              multiline={true}
              label='Hash'
              secure={false}
            />
          </View>
          <MenuSubButtonComponent justify='end' label='Submit Feedback' loading={false} handleFunction={() => {submitForm()}}/>
        </View>
      </View>
    </View>
  )
}

export default FeedbackScreen
