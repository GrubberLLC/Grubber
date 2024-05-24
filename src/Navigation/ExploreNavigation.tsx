import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import FeedScreen from '../Screens/Feed/FeedScreen';
import ExploreScreen from '../Screens/Explore/ExploreScreen';
import PostDetailsScreen from '../Screens/Feed/PostDetailsScreen';

const StackNav = createStackNavigator();

const ExploreNavigation = () => {
  return (
    <StackNav.Navigator
      initialRouteName="FeedScreen"
      screenOptions={{headerShown: false}}>
      <StackNav.Screen name="ExploreScreen" component={ExploreScreen} />
      <StackNav.Screen name="PostDetailsScreen" component={PostDetailsScreen} />
    </StackNav.Navigator>
  );
};

export default ExploreNavigation;
