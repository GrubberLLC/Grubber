import React from 'react'
import { Alert, ScrollView, Text, Touchable, TouchableOpacity, View } from 'react-native'
import NoMenuPageHeader from '../../Components/Headers/NoMenuPageHeader'
import { Activity, AlertCircle, Bell, Bookmark, ChevronsRight, Edit2, Grid, Heart, HelpCircle, List, Lock, LogOut, MessageSquare, Shuffle, User, X } from 'react-native-feather'
import { useAuth } from '../../Context/UserContext'
import ColorGuide from '../../ColorGuide'
import { useNavigation } from '@react-navigation/native'

const SettingsScreen = () => {

  const navigation = useNavigation()

  const {signOutUser, deleteAccount} = useAuth()

  const confirmDelete = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: deleteAccount },
      ],
      { cancelable: false }
    );
  };

  return (
    <View className={'flex-1'} style={{backgroundColor: ColorGuide['bg-dark']}}>
      <NoMenuPageHeader backing={true} leftLabel='Settings'/>
      <ScrollView>
        <View className='p-3'>
          <View className='pb-4 border-b-2 border-b-neutral-700'>
            <Text className='text-white text-xl font-bold'>Profile & Account</Text>
          </View>
          <TouchableOpacity onPress={() => {navigation.navigate('EditProfileScreen')}} className='flex flex-row items-center justify-between py-3 border-b-2 border-b-neutral-700'>
            <View  className='flex flex-row items-center'>
              <User height={18} width={18} color={'white'}/>
              <Text className='text-white text-lg ml-2'>Edit Profile</Text>
            </View>
            <ChevronsRight height={24} width={24} color={'white'}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {navigation.navigate('ResetPasswordScreen')}} className='flex flex-row items-center justify-between py-3 border-b-2 border-b-neutral-700'>
            <View  className='flex flex-row items-center'>
              <Lock height={18} width={18} color={'white'}/>
              <Text className='text-white text-lg ml-2'>Reset Password</Text>
            </View>
            <ChevronsRight height={24} width={24} color={'white'}/>
          </TouchableOpacity>
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
          <TouchableOpacity onPress={() => {navigation.navigate('FavoritesScreen')}} className='flex flex-row items-center justify-between py-3 border-b-2 border-b-neutral-700'>
            <View  className='flex flex-row items-center'>
              <Bookmark height={18} width={18} color={'white'}/>
              <Text className='text-white text-lg ml-2'>Favorites</Text>
            </View>
            <ChevronsRight height={24} width={24} color={'white'}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {navigation.navigate('LikedPostsScreen')}} className='flex flex-row items-center justify-between py-3 border-b-2 border-b-neutral-700'>
            <View  className='flex flex-row items-center'>
              <Heart height={18} width={18} color={'white'}/>
              <Text className='text-white text-lg ml-2'>Likes</Text>
            </View>
            <ChevronsRight height={24} width={24} color={'white'}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {navigation.navigate('CommentedScreen')}} className='flex flex-row items-center justify-between py-3 border-b-2 border-b-neutral-700'>
            <View  className='flex flex-row items-center'>
              <MessageSquare height={18} width={18} color={'white'}/>
              <Text className='text-white text-lg ml-2'>Comments</Text>
            </View>
            <ChevronsRight height={24} width={24} color={'white'}/>
          </TouchableOpacity>
          <View className='pb-4 border-b-2 border-b-neutral-700 mt-8'>
            <Text className='text-white text-xl font-bold'>Help & Support</Text>
          </View>
          <TouchableOpacity onPress={() => {navigation.navigate('ContactUsScreen')}} className='flex flex-row items-center justify-between py-3 border-b-2 border-b-neutral-700'>
            <View  className='flex flex-row items-center'>
              <Edit2 height={18} width={18} color={'white'}/>
              <Text className='text-white text-lg ml-2'>Contact Us</Text>
            </View>
            <ChevronsRight height={24} width={24} color={'white'}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {navigation.navigate('FaqScreen')}} className='flex flex-row items-center justify-between py-3 border-b-2 border-b-neutral-700'>
            <View  className='flex flex-row items-center'>
              <List height={18} width={18} color={'white'}/>
              <Text className='text-white text-lg ml-2'>FAQ</Text>
            </View>
            <ChevronsRight height={24} width={24} color={'white'}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {navigation.navigate('FeedbackScreen')}} className='flex flex-row items-center justify-between py-3 border-b-2 border-b-neutral-700'>
            <View  className='flex flex-row items-center'>
              <Shuffle height={18} width={18} color={'white'}/>
              <Text className='text-white text-lg ml-2'>Feedback / Suggestions</Text>
            </View>
            <ChevronsRight height={24} width={24} color={'white'}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {navigation.navigate('AboutScreen')}} className='flex flex-row items-center justify-between py-3 border-b-2 border-b-neutral-700'>
            <View  className='flex flex-row items-center'>
              <AlertCircle height={18} width={18} color={'white'}/>
              <Text className='text-white text-lg ml-2'>About Us</Text>
            </View>
            <ChevronsRight height={24} width={24} color={'white'}/>
          </TouchableOpacity>

          <View className='pb-4 border-b-2 border-b-neutral-700 mt-8'>
            <Text className='text-white text-xl font-bold'>Login</Text>
          </View>
          <TouchableOpacity onPress={signOutUser} className='flex flex-row items-center justify-between py-3 border-b-2 border-b-neutral-700'>
            <View  className='flex flex-row items-center'>
              <LogOut height={18} width={18} color={'#0ea5e9'}/>
              <Text style={{color: '#0ea5e9'}} className='text-sky-500 text-lg ml-2'>Logout</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {confirmDelete()}} className='flex flex-row items-center justify-between py-3 border-b-2 border-b-neutral-700'>
            <View  className='flex flex-row items-center'>
              <X height={18} width={18} color={'red'}/>
              <Text style={{color: ColorGuide.primary}} className='text-red-500 text-lg ml-2'>Delete Account</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

export default SettingsScreen
