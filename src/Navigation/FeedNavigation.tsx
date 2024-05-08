import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import FeedScreen from '../Screens/Feed/FeedScreen';
import AddPostScreen from '../Screens/Feed/AddPostScreen';
import AddPostPlaceScreen from '../Screens/Feed/AddPostPlaceScreen';
import ReviewPostScreen from '../Screens/Feed/ReviewPostScreen';

const StackNav = createStackNavigator();

const FeedNavigation = () => {
  return (
    <StackNav.Navigator
      initialRouteName="FeedScreen"
      screenOptions={{headerShown: false}}>
      <StackNav.Screen name="FeedScreen" component={FeedScreen} />
      <StackNav.Screen name="AddPostScreen" component={AddPostScreen} />
      <StackNav.Screen name="AddPostPlaceScreen" component={AddPostPlaceScreen} />
      <StackNav.Screen name="ReviewPostScreen" component={ReviewPostScreen} />
    </StackNav.Navigator>
  );
};

export default FeedNavigation;
