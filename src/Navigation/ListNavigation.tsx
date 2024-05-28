import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SearchScreen from '../Screens/Search/SearchScreen';
import ListsScreen from '../Screens/Lists/ListsScreen';

const StackNav = createStackNavigator();

const ListNavigation = () => {
  return (
    <StackNav.Navigator
      initialRouteName="FeedScreen"
      screenOptions={{headerShown: false}}>
      <StackNav.Screen name="ListsScreen" component={ListsScreen} />
    </StackNav.Navigator>
  );
};

export default ListNavigation;
