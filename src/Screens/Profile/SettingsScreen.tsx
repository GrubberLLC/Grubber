import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import NoMenuPageHeader from '../../Components/Headers/NoMenuPageHeader'
import { Activity, AlertCircle, Bell, Bookmark, ChevronsRight, Edit2, Grid, Heart, HelpCircle, Lock, LogOut, MessageSquare, User, X } from 'react-native-feather'
import { useAuth } from '../../Context/UserContext'

const SettingsScreen = () => {

  const {signOutUser} = useAuth()

  return (
    <View className={'flex-1 bg-neutral-900'}>
      <NoMenuPageHeader backing={true} leftLabel='Settings'/>
      <ScrollView>
        <View className='p-3'>
          <View className='pb-4 border-b-2 border-b-neutral-700'>
            <Text className='text-white text-xl font-bold'>Profile & Account</Text>
          </View>
          <View className='flex flex-row items-center justify-between py-3 border-b-2 border-b-neutral-700'>
            <View  className='flex flex-row items-center'>
              <User height={18} width={18} color={'white'}/>
              <Text className='text-white text-lg ml-2'>Edit Profile</Text>
            </View>
            <ChevronsRight height={24} width={24} color={'white'}/>
          </View>
          <View className='flex flex-row items-center justify-between py-3 border-b-2 border-b-neutral-700'>
            <View  className='flex flex-row items-center'>
              <Lock height={18} width={18} color={'white'}/>
              <Text className='text-white text-lg ml-2'>Reset Password</Text>
            </View>
            <ChevronsRight height={24} width={24} color={'white'}/>
          </View>
          <View className='flex flex-row items-center justify-between py-3 border-b-2 border-b-neutral-700'>
            <View  className='flex flex-row items-center'>
              <Bell height={18} width={18} color={'white'}/>
              <Text className='text-white text-lg ml-2'>Notifications</Text>
            </View>
            <ChevronsRight height={24} width={24} color={'white'}/>
          </View>

          <View className='pb-4 border-b-2 border-b-neutral-700 mt-8'>
            <Text className='text-white text-xl font-bold'>Activity</Text>
          </View>
          <View className='flex flex-row items-center justify-between py-3 border-b-2 border-b-neutral-700'>
            <View  className='flex flex-row items-center'>
              <Bookmark height={18} width={18} color={'white'}/>
              <Text className='text-white text-lg ml-2'>Favorites</Text>
            </View>
            <ChevronsRight height={24} width={24} color={'white'}/>
          </View>
          <View className='flex flex-row items-center justify-between py-3 border-b-2 border-b-neutral-700'>
            <View  className='flex flex-row items-center'>
              <Activity height={18} width={18} color={'white'}/>
              <Text className='text-white text-lg ml-2'>Activity</Text>
            </View>
            <ChevronsRight height={24} width={24} color={'white'}/>
          </View>
          <View className='flex flex-row items-center justify-between py-3 border-b-2 border-b-neutral-700'>
            <View  className='flex flex-row items-center'>
              <Heart height={18} width={18} color={'white'}/>
              <Text className='text-white text-lg ml-2'>Likes</Text>
            </View>
            <ChevronsRight height={24} width={24} color={'white'}/>
          </View>
          <View className='flex flex-row items-center justify-between py-3 border-b-2 border-b-neutral-700'>
            <View  className='flex flex-row items-center'>
              <MessageSquare height={18} width={18} color={'white'}/>
              <Text className='text-white text-lg ml-2'>Comments</Text>
            </View>
            <ChevronsRight height={24} width={24} color={'white'}/>
          </View>

          <View className='pb-4 border-b-2 border-b-neutral-700 mt-8'>
            <Text className='text-white text-xl font-bold'>Help & Support</Text>
          </View>
          <View className='flex flex-row items-center justify-between py-3 border-b-2 border-b-neutral-700'>
            <View  className='flex flex-row items-center'>
              <Edit2 height={18} width={18} color={'white'}/>
              <Text className='text-white text-lg ml-2'>Contact Us</Text>
            </View>
            <ChevronsRight height={24} width={24} color={'white'}/>
          </View>
          <View className='flex flex-row items-center justify-between py-3 border-b-2 border-b-neutral-700'>
            <View  className='flex flex-row items-center'>
              <HelpCircle height={18} width={18} color={'white'}/>
              <Text className='text-white text-lg ml-2'>FAQ</Text>
            </View>
            <ChevronsRight height={24} width={24} color={'white'}/>
          </View>
          <View className='flex flex-row items-center justify-between py-3 border-b-2 border-b-neutral-700'>
            <View  className='flex flex-row items-center'>
              <AlertCircle height={18} width={18} color={'white'}/>
              <Text className='text-white text-lg ml-2'>About Us</Text>
            </View>
            <ChevronsRight height={24} width={24} color={'white'}/>
          </View>

          <View className='pb-4 border-b-2 border-b-neutral-700 mt-8'>
            <Text className='text-white text-xl font-bold'>Login</Text>
          </View>
          <TouchableOpacity onPress={signOutUser} className='flex flex-row items-center justify-between py-3 border-b-2 border-b-neutral-700'>
            <View  className='flex flex-row items-center'>
              <LogOut height={18} width={18} color={'#0ea5e9'}/>
              <Text className='text-sky-500 text-lg ml-2'>Logout</Text>
            </View>
          </TouchableOpacity>
          <View className='flex flex-row items-center justify-between py-3 border-b-2 border-b-neutral-700'>
            <View  className='flex flex-row items-center'>
              <X height={18} width={18} color={'red'}/>
              <Text className='text-red-500 text-lg ml-2'>Delete Account</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default SettingsScreen
