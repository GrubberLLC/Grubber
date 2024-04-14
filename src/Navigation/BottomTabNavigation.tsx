// import React from 'react'
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {NavigationContainer} from '@react-navigation/native';
// import {Grid} from 'react-native-feather';
// import {View} from 'react-native';
// import FeedStackNavigation from './FeedStackNavigation';

// const Tab = createBottomTabNavigator()

// const BottomTabNavigation = () => {

//   return (
//     <NavigationContainer>
//       <Tab.Navigator screenOptions={{
//         headerShown: false,
//       }}>
//         <Tab.Screen
//           name="Feed"
//           key="Feed"
//           component={FeedStackNavigation}
//           options={{
//             tabBarShowLabel: false,
//             // eslint-disable-next-line react/no-unstable-nested-components
//             tabBarIcon: ({ focused, color, size }) => (
//               <View style={{ width: 22, height: 22, alignItems: 'center' }}>
//                 {
//                   focused 
//                     ? <View style={{ alignItems: 'center', justifyContent: 'center' }}>
//                         <View style={{width: '100%', height: 3, backgroundColor: '#e94f4e', position: 'absolute', top: 0}}></View>
//                         <Grid style={{marginTop: 12}} stroke={'white'} height={20} width={20} strokeWidth={3}/>
//                       </View>
//                     : <View style={{ alignItems: 'center', justifyContent: 'center' }}>
//                         <View style={{width: '100%', height: 3, backgroundColor: 'black', position: 'absolute', top: 0}}></View>
//                         <Grid style={{marginTop: 12}} stroke={'white'} height={20} width={20} strokeWidth={3}/>
//                       </View>
//                 }
//               </View>
//             ),
//           }}
//         />
//       </Tab.Navigator>
//     </NavigationContainer>
//   )
// }

// export default BottomTabNavigation
