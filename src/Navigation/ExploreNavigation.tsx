import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import FeedScreen from '../Screens/Feed/FeedScreen';
import ExploreScreen from '../Screens/Explore/ExploreScreen';
import PostDetailsScreen from '../Screens/Feed/PostDetailsScreen';
import PlaceScreen from '../Screens/Feed/PlaceScreen';
import UserProfileScreen from '../Screens/Profile/UserProfileScreen';

const StackNav = createStackNavigator();

const ExploreNavigation = () => {
  return (
    <StackNav.Navigator
      initialRouteName="FeedScreen"
      screenOptions={{headerShown: false}}>
      <StackNav.Screen name="ExploreScreen" component={ExploreScreen} />
      <StackNav.Screen name="PostDetailsScreenExplore" component={PostDetailsScreen} />
      <StackNav.Screen name="PlaceScreen" component={PlaceScreen} />
      <StackNav.Screen name="UserProfileScreen" component={UserProfileScreen} />

    </StackNav.Navigator>
  );
};

export default ExploreNavigation;
