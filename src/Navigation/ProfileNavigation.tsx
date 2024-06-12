import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileScreen from '../Screens/Profile/ProfileScreen';
import SettingsScreen from '../Screens/Profile/SettingsScreen';
import PostDetailsScreen from '../Screens/Feed/PostDetailsScreen';
import ListDetailsScreen from '../Screens/Lists/ListDetailsScreen';

const StackNav = createStackNavigator();

const ProfileNavigation = () => {
  return (
    <StackNav.Navigator
      initialRouteName="FeedScreen"
      screenOptions={{headerShown: false}}>
      <StackNav.Screen name="ProfileScreen" component={ProfileScreen} />
      <StackNav.Screen name="SettingsScreen" component={SettingsScreen} />
      <StackNav.Screen name="PostDetailsScreen" component={PostDetailsScreen} />
      <StackNav.Screen name="ListDetailsScreenProfile" component={ListDetailsScreen} />
    </StackNav.Navigator>
  );
};

export default ProfileNavigation;
