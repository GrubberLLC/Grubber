import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import FeedScreen from '../Screens/Feed/FeedScreen';
import ReviewPostScreen from '../Screens/Feed/ReviewPostScreen';
import NewPostScreen from '../Screens/Feed/NewPostScreen';
import NewPostPlaceScreen from '../Screens/Feed/NewPostPlaceScreen';
import PostDetailsScreen from '../Screens/Feed/PostDetailsScreen';
import PlaceScreen from '../Screens/Feed/PlaceScreen';
import NotificationScreen from '../Screens/Feed/NotificationScreen';
import ListDetailsScreen from '../Screens/Lists/ListDetailsScreen';
import FavoritesScreen from '../Screens/Favorites/FavoritesScreen';
import PlaceDetailsScreen from '../Screens/Search/PlaceDetailsScreen';
import UserProfileScreen from '../Screens/Feed/UserProfileScreen';
import UserFollowingScreen from '../Screens/Feed/UserFollowingScreen';
import UserFollowersScreen from '../Screens/Feed/UserFollowersScreen';

const StackNav = createStackNavigator();

const FeedNavigation = () => {
  return (
    <StackNav.Navigator
      initialRouteName="FeedScreen"
      screenOptions={{headerShown: false}}>
      <StackNav.Screen name="FeedScreen" component={FeedScreen} />
      <StackNav.Screen name="NewPostScreen" component={NewPostScreen} />
      <StackNav.Screen name="NewPostPlaceScreen" component={NewPostPlaceScreen} />
      <StackNav.Screen name="ReviewPostScreen" component={ReviewPostScreen} />
      <StackNav.Screen name="PlaceScreen" component={PlaceScreen} />
      <StackNav.Screen name="NotificationScreen" component={NotificationScreen} />
      <StackNav.Screen name="PostDetailsScreen" component={PostDetailsScreen} />
      <StackNav.Screen name="UserProfileScreen" component={UserProfileScreen} />
      <StackNav.Screen name="ListDetailsScreen" component={ListDetailsScreen} />
      <StackNav.Screen name="FavoritesScreenFeed" component={FavoritesScreen} />
      <StackNav.Screen name="PlaceDetailsScreenSearch" component={PlaceDetailsScreen} />
      <StackNav.Screen name="PostDetailsScreenSearch" component={PostDetailsScreen} />
      <StackNav.Screen name="UserFollowersScreen" component={UserFollowersScreen} />
      <StackNav.Screen name="UserFollowingScreen" component={UserFollowingScreen} />
    </StackNav.Navigator>
  );
};

export default FeedNavigation;
