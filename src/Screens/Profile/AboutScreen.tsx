import React, { useContext, useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ColorGuide from '../../ColorGuide';
import NoMenuPageHeader from '../../Components/Headers/NoMenuPageHeader';
import MenuSubButtonComponent from '../../Components/Buttons/MenuSubButtonComponent';

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

const AboutScreen = () => {
  const navigation = useNavigation()

  const openWebsite = () => {
    Linking.canOpenURL('https://grubber.io').then(() => {
      Linking.openURL('https://grubber.io');
    });
  }

  return (
    <View className={'flex-1'} style={{backgroundColor: ColorGuide['bg-dark']}}>
      <NoMenuPageHeader backing={true} leftLabel='Feedback & Suggestions'/>
      <View className='flex-1 flex flex-col justify-between'>
        <View className='flex-1 px-2'>
          <View className='w-full flex flex-col justify-center items-center pt-12 pb-8'>
            <Image className='px-12' style={{width: deviceWidth * .86, height: deviceWidth * .86 * 0.21}} source={require('../../Assets/full-logo-red-.png')}/>
          </View>
          <Text className='text-white text-2xl font-bold'>Grubber LLC</Text>
          <Text className='text-white text-lg font-semibold'>Uniting the world one bite at a time.</Text>
          <Text className='text-white text-base'>Version: 1.0.1</Text>
          <Text className='text-white text-base'>Established: March 1, 2023</Text>
          <Text className='text-white my-4'>Grubber was designed, debeloped, and release with one goal in mind. Bring people closer together through one common factor among
            all cultures and countries... food. We created Grubber so that people around the world and discover, share, and save the most amamzing
            differnt and unique food wiht people across the world.
          </Text>
          <Text className='text-white'>With all mainstream socual media, it is easy to get lost in the clutter that is being posted without a dedicated place to share food 
            experiences and meals that deserve to be shared. We also want to make it easier than ever to be able to track your favorite food places through hand created and 
            curated lists that categorize and organize your favorite food places. You will be able to easy look for and find your favorite places by clicking your lists. We also
            want to focus on highlighting dishes at different food places as it is the main reason for going to a specific place.
          </Text>
        </View>
        <View>
          <MenuSubButtonComponent label='Visit www.grubber.io' justify='center' handleFunction={() => {openWebsite()}}/>
        </View>
      </View>
    </View>
  )
}

export default AboutScreen