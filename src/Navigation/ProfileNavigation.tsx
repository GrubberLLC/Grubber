import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileScreen from '../Screens/Profile/ProfileScreen';
import SettingsScreen from '../Screens/Profile/SettingsScreen';
import PostDetailsScreen from '../Screens/Feed/PostDetailsScreen';
import ListDetailsScreen from '../Screens/Lists/ListDetailsScreen';
import FollowersScreen from '../Screens/Profile/FollowersScreen';
import FollowingScreen from '../Screens/Profile/FollowingScreen';
import ResetPasswordScreen from '../Screens/Profile/ResetPasswordScreen';
import EditProfileScreen from '../Screens/Profile/EditProfileScreen';
import ContactUsScreen from '../Screens/Profile/ContactUsScreen';
import FaqScreen from '../Screens/Profile/FaqScreen';
import FeedbackScreen from '../Screens/Profile/FeedbackScreen';
import AboutScreen from '../Screens/Profile/AboutScreen';
import FavoritesScreen from '../Screens/Profile/FavoritesScreen';
import LikedPostsScreen from '../Screens/Profile/LikedPostsScreen';
import CommentedScreen from '../Screens/Profile/CommentedScreen';
import EditPostScreen from '../Screens/Feed/EditPostScreen';

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
      <StackNav.Screen name="FollowersScreen" component={FollowersScreen} />
      <StackNav.Screen name="FollowingScreen" component={FollowingScreen} />
      <StackNav.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
      <StackNav.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <StackNav.Screen name="ContactUsScreen" component={ContactUsScreen} />
      <StackNav.Screen name="FaqScreen" component={FaqScreen} />
      <StackNav.Screen name="FeedbackScreen" component={FeedbackScreen} />
      <StackNav.Screen name="AboutScreen" component={AboutScreen} />
      <StackNav.Screen name="FavoritesScreen" component={FavoritesScreen} />
      <StackNav.Screen name="LikedPostsScreen" component={LikedPostsScreen} />
      <StackNav.Screen name="CommentedScreen" component={CommentedScreen} />
      <StackNav.Screen name="EditPostScreen" component={EditPostScreen} />
    </StackNav.Navigator>
  );
};

export default ProfileNavigation;
