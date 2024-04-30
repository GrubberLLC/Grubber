import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../Screens/Authentication/LoginScreen';
import SignupScreen from '../Screens/Authentication/SignupScreen';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import CreateProfileScreen from '../Screens/Authentication/CreateProfileScreen';
import AccessCodeScreen from '../Screens/Authentication/AccessCodeScreen';
import ForgotScreen from '../Screens/Authentication/ForgotScreen';
import ProfileScreen from '../Screens/Authentication/ProfileScreen';
import { RootStackParamList } from '../Types/NavigationTypes';

const StackNav = createStackNavigator<RootStackParamList>();

const AuthenticationNavigation = () => {
  return (
    <NavigationContainer>
      <StackNav.Navigator
        initialRouteName="LoginScreen"
        screenOptions={{
          headerShown: false,
        }}>
        <StackNav.Screen name="LoginScreen" component={LoginScreen} />
        <StackNav.Screen name="SignupScreen" component={SignupScreen} />
        <StackNav.Screen name="ProfileScreen" component={ProfileScreen} />
        <StackNav.Screen name="CreateProfileScreen" component={CreateProfileScreen} />
        <StackNav.Screen name="AccessCodeScreen" component={AccessCodeScreen} />
        <StackNav.Screen name="ForgotScreen" component={ForgotScreen} />
      </StackNav.Navigator>
    </NavigationContainer>
  );
};

export default AuthenticationNavigation;
