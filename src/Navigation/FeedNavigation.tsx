import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import FeedScreen from '../Screens/Feed/FeedScreen';
import ReviewPostScreen from '../Screens/Feed/ReviewPostScreen';
import NewPostScreen from '../Screens/Feed/NewPostScreen';
import NewPostPlaceScreen from '../Screens/Feed/NewPostPlaceScreen';
import PostDetailsScreen from '../Screens/Feed/PostDetailsScreen';
import PlaceScreen from '../Screens/Feed/PlaceScreen';

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
      <StackNav.Screen name="PostDetailsScreen" component={PostDetailsScreen} />
      <StackNav.Screen name="PlaceScreen" component={PlaceScreen} />
    </StackNav.Navigator>
  );
};

export default FeedNavigation;
