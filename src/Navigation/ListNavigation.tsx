import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SearchScreen from '../Screens/Search/SearchScreen';
import ListsScreen from '../Screens/Lists/ListsScreen';
import NewListScreen from '../Screens/Lists/NewListScreen';
import ListDetailsScreen from '../Screens/Lists/ListDetailsScreen';
import SearchPlaceListScreen from '../Screens/Lists/SearchPlaceListScreen';
import PlaceDetailsScreen from '../Screens/Search/PlaceDetailsScreen';
import PlaceScreen from '../Screens/Feed/PlaceScreen';
import ListSettingsScreen from '../Screens/Lists/ListSettingsScreen';
import UserProfileScreen from '../Screens/Profile/UserProfileScreen';
import EditListScreen from '../Screens/Lists/EditListScreen';

const StackNav = createStackNavigator();

const ListNavigation = () => {
  return (
    <StackNav.Navigator
      initialRouteName="FeedScreen"
      screenOptions={{headerShown: false}}>
      <StackNav.Screen name="ListsScreen" component={ListsScreen} />
      <StackNav.Screen name="NewListScreen" component={NewListScreen} />
      <StackNav.Screen name="ListDetailsScreen" component={ListDetailsScreen} />
      <StackNav.Screen name="SearchPlaceListScreen" component={SearchPlaceListScreen} />
      <StackNav.Screen name="PlaceDetailsScreenList" component={PlaceScreen} />
      <StackNav.Screen name="ListSettingsScreen" component={ListSettingsScreen} />
      <StackNav.Screen name="UserProfileScreen" component={UserProfileScreen} />
      <StackNav.Screen name="EditListScreen" component={EditListScreen} />
    </StackNav.Navigator>
  );
};

export default ListNavigation;
