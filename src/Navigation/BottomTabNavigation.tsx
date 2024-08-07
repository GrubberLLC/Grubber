import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {Activity, AlignCenter, Bookmark, Globe, Grid, Heart, Home, Layers, List, Search, User} from 'react-native-feather';
import { View } from 'react-native';
import FeedNavigation from './FeedNavigation';
import ExploreNavigation from './ExploreNavigation';
import SearchNavigation from './SearchNavigation';
import ListNavigation from './ListNavigation';
import ProfileNavigation from './ProfileNavigation';
import ColorGuide from '../ColorGuide';
import FavoritesNavigation from './FavoritesNavgation';

const Tab = createBottomTabNavigator()

const BottomTabNavigation = () => {

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: ColorGuide['bg-dark'], // Set your desired background color here
          borderTopColor: 'transparent', // You can also remove the border top line
        },
        tabBarActiveTintColor: 'white', // Set active icon color
        tabBarInactiveTintColor: 'gray', // Se
      }}>
        <Tab.Screen
          name="Feed"
          key="Feed"
          component={FeedNavigation}
          options={{
            tabBarShowLabel: false,
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: ({ focused, color, size }) => (
              <View style={{ width: 22, height: 22, alignItems: 'center' }}>
                {
                  focused 
                    ? <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{width: '100%', height: 3, backgroundColor: '#e94f4e', position: 'absolute', top: 0}}></View>
                        <Grid style={{marginTop: 12}} stroke={'white'} height={20} width={20} strokeWidth={3}/>
                      </View>
                    : <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{width: '100%', height: 3, backgroundColor: 'black', position: 'absolute', top: 0}}></View>
                        <Grid style={{marginTop: 12}} stroke={'white'} height={20} width={20} strokeWidth={3}/>
                      </View>
                }
              </View>
            ),
          }}/>
        <Tab.Screen
          name="Lists"
          key="Lists"
          component={ListNavigation}
          options={{
            tabBarShowLabel: false,
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: ({ focused, color, size }) => (
              <View style={{ width: 22, height: 22, alignItems: 'center' }}>
                {
                  focused 
                    ? <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{width: '100%', height: 3, backgroundColor: '#e94f4e', position: 'absolute', top: 0}}></View>
                        <List style={{marginTop: 12}} stroke={'white'} height={20} width={20} strokeWidth={3}/>
                      </View>
                    : <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{width: '100%', height: 3, backgroundColor: 'black', position: 'absolute', top: 0}}></View>
                        <List style={{marginTop: 12}} stroke={'white'} height={20} width={20} strokeWidth={3}/>
                      </View>
                }
              </View>
            ),
          }}/>
        <Tab.Screen
          name="Search"
          key="Search"
          component={SearchNavigation}
          options={{
            tabBarShowLabel: false,
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: ({ focused, color, size }) => (
              <View style={{ width: 22, height: 22, alignItems: 'center' }}>
                {
                  focused 
                    ? <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{width: '100%', height: 3, backgroundColor: '#e94f4e', position: 'absolute', top: 0}}></View>
                        <Home style={{marginTop: 12}} stroke={'white'} height={20} width={20} strokeWidth={3}/>
                      </View>
                    : <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{width: '100%', height: 3, backgroundColor: 'black', position: 'absolute', top: 0}}></View>
                        <Home style={{marginTop: 12}} stroke={'white'} height={20} width={20} strokeWidth={3}/>
                      </View>
                }
              </View>
            ),
          }}/>
        <Tab.Screen
          name="Explore"
          key="Explore"
          component={ExploreNavigation}
          options={{
            tabBarShowLabel: false,
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: ({ focused, color, size }) => (
              <View style={{ width: 22, height: 22, alignItems: 'center' }}>
                {
                  focused 
                    ? <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{width: '100%', height: 3, backgroundColor: '#e94f4e', position: 'absolute', top: 0}}></View>
                        <Search style={{marginTop: 12}} stroke={'white'} height={20} width={20} strokeWidth={3}/>
                      </View>
                    : <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{width: '100%', height: 3, backgroundColor: 'black', position: 'absolute', top: 0}}></View>
                        <Search style={{marginTop: 12}} stroke={'white'} height={20} width={20} strokeWidth={3}/>
                      </View>
                }
              </View>
            ),
          }}/>
        {/* <Tab.Screen
          name="Favorites"
          key="Favorites"
          component={FavoritesNavigation}
          options={{
            tabBarShowLabel: false,
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: ({ focused, color, size }) => (
              <View style={{ width: 22, height: 22, alignItems: 'center' }}>
                {
                  focused 
                    ? <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{width: '100%', height: 3, backgroundColor: '#e94f4e', position: 'absolute', top: 0}}></View>
                        <Bookmark style={{marginTop: 12}} stroke={'white'} height={20} width={20} strokeWidth={3}/>
                      </View>
                    : <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{width: '100%', height: 3, backgroundColor: 'black', position: 'absolute', top: 0}}></View>
                        <Bookmark style={{marginTop: 12}} stroke={'white'} height={20} width={20} strokeWidth={3}/>
                      </View>
                }
              </View>
            ),
          }}/> */}
        <Tab.Screen
          name="Profile"
          key="Profile"
          component={ProfileNavigation}
          options={{
            tabBarShowLabel: false,
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: ({ focused, color, size }) => (
              <View style={{ width: 22, height: 22, alignItems: 'center' }}>
                {
                  focused 
                    ? <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{width: '100%', height: 3, backgroundColor: '#e94f4e', position: 'absolute', top: 0}}></View>
                        <User style={{marginTop: 12}} stroke={'white'} height={20} width={20} strokeWidth={3}/>
                      </View>
                    : <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{width: '100%', height: 3, backgroundColor: 'black', position: 'absolute', top: 0}}></View>
                        <User style={{marginTop: 12}} stroke={'white'} height={20} width={20} strokeWidth={3}/>
                      </View>
                }
              </View>
            ),
          }}/>
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default BottomTabNavigation
