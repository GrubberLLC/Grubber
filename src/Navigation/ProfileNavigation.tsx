import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileScreen from '../Screens/Profile/ProfileScreen';
import SettingsScreen from '../Screens/Profile/SettingsScreen';

const StackNav = createStackNavigator();

const ProfileNavigation = () => {
  return (
    <StackNav.Navigator
      initialRouteName="FeedScreen"
      screenOptions={{headerShown: false}}>
      <StackNav.Screen name="ProfileScreen" component={ProfileScreen} />
      <StackNav.Screen name="SettingsScreen" component={SettingsScreen} />
    </StackNav.Navigator>
  );
};

export default ProfileNavigation;
