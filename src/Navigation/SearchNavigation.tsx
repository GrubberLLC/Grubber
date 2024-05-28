import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SearchScreen from '../Screens/Search/SearchScreen';
import PlaceDetailsScreen from '../Screens/Search/PlaceDetailsScreen';
import PostDetailsScreen from '../Screens/Feed/PostDetailsScreen';

const StackNav = createStackNavigator();

const SearchNavigation = () => {
  return (
    <StackNav.Navigator
      initialRouteName="FeedScreen"
      screenOptions={{headerShown: false}}>
      <StackNav.Screen name="SearchScreen" component={SearchScreen} />
      <StackNav.Screen name="PlaceDetailsScreenSearch" component={PlaceDetailsScreen} />
      <StackNav.Screen name="PostDetailsScreenSearch" component={PostDetailsScreen} />
    </StackNav.Navigator>
  );
};

export default SearchNavigation;
