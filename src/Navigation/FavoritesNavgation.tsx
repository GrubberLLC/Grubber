import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SearchScreen from '../Screens/Search/SearchScreen';
import PlaceDetailsScreen from '../Screens/Search/PlaceDetailsScreen';
import PostDetailsScreen from '../Screens/Feed/PostDetailsScreen';
import SearchMapScreen from '../Screens/Search/SearchMapScreen';
import ListDetailsScreen from '../Screens/Lists/ListDetailsScreen';
import FavoritesScreen from '../Screens/Favorites/FavoritesScreen';

const StackNav = createStackNavigator();

const FavoritesNavigation = () => {
  return (
    <StackNav.Navigator
      initialRouteName="FavoritesScreen"
      screenOptions={{headerShown: false}}>
      <StackNav.Screen name="FavoritesScreen" component={FavoritesScreen} />
      <StackNav.Screen name="PlaceDetailsScreenSearch" component={PlaceDetailsScreen} />
      <StackNav.Screen name="PostDetailsScreenSearch" component={PostDetailsScreen} />
      <StackNav.Screen name="ListDetailsScreen" component={ListDetailsScreen} />
    </StackNav.Navigator>
  );
};

export default FavoritesNavigation;
