import React, { useEffect, useState } from 'react'
import { Image, ImageBackground, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Background from '../../Assets/background2.jpg'
import LoginButtonComponent from '../../Components/Auth/LoginButtonComponent';
import AuthInputComponent from '../../Components/Auth/AuthInputComponent';
import AuthSwitchComponent from '../../Components/Auth/AuthSwitchComponent';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../Types/NavigationTypes'; 
import { useAuth } from '../../Context/UserContext';
import { Phone } from 'react-native-feather';

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'ProfileScreen'>;

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation()
  const route = useRoute<ProfileScreenRouteProp>();
  const params = route.params

  const {handleSignupObject} = useAuth()
  
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardMargin('mb-4');
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardMargin('mb-8');
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const username = params.username
  const email = params.email
  const password = params.password
  const [firstName, setFirstName] = useState<string >('')
  const [lastName, setLastName] = useState<string >('')
  const [bio, setBio] = useState<string >('')
  const [location, setLocation] = useState<string >('')
  const [phone, setPhone] = useState<string >('')
  const [isPublic, setIsPublic] = useState<boolean >(true)
  const [keyboardMargin, setKeyboardMargin] = useState('mb-12');

  const updateFirstName = (text: string) => {
    setFirstName(text)
  }

  const updateLastName = (text: string) => {
    setLastName(text)
  }

  const updateBio = (text: string) => {
    setBio(text)
  }

  const updatePhone = (text: string) => {
    setPhone(text)
  }

  const updateLocation = (text: string) => {
    setLocation(text)
  }

  const updateIsPublic = (view: boolean) => {
    setIsPublic(view)
  }

  const completeSignupProcess = () => {
    // const signupData = {
    //   username,
    //   password,
    //   options: {
    //     userAttributes: {
    //       email: email, 
    //       given_name: firstName,
    //       family_name: lastName,
    //       nickname: firstName,
    //       name: `${firstName} ${lastName}`,
    //       locale: location,
    //       preferred_username: username
    //     }
    //   }
    // }

    navigation.navigate('CreateProfileScreen', {
      username: username,
      email: email,
      password: password,
      given_name: firstName,
      family_name: lastName,
      phone: phone,
      nickname: firstName,
      name: `${firstName} ${lastName}`,
      locale: location,
      preferred_username: username,
      isPublic: isPublic,
      bio: bio
    })
    
    // handleSignupObject(signupData)
  }
  
  return (
    <ImageBackground source={Background} resizeMode="cover" className="w-screen h-screen absolute z-0">
      <View className="w-screen h-screen bg-black opacity-60 absolute z-1"></View>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 justify-end items-center pt-16">
            <View className={`w-11/12 items-center ${keyboardMargin}`}>
              <View className="w-full flex flex-col items-start">
                <Text className="text-white text-4xl font-semibold mb-b">Profile</Text>
              </View>
              <AuthInputComponent 
                label='User'
                value={firstName}
                handleFunction={updateFirstName}
                secure={false}
                placeholder={'First name'}
                multiline={false}
              />
              <AuthInputComponent 
                label='User'
                value={lastName}
                handleFunction={updateLastName}
                secure={false}
                placeholder={'Last name'}
                multiline={false}
              />
              <AuthInputComponent 
                label='Phone'
                value={phone}
                handleFunction={updatePhone}
                secure={false}
                placeholder={'Phone'}
                multiline={true}
              />
              <AuthInputComponent 
                label='MessageSquare'
                value={bio}
                handleFunction={updateBio}
                secure={false}
                placeholder={'Bio...'}
                multiline={true}
              />
              <AuthInputComponent 
                label='MapPin'
                value={location}
                handleFunction={updateLocation}
                secure={false}
                placeholder={'Irvine, CA'}
                multiline={false}
              />
              <AuthSwitchComponent 
                label='Eye'
                value={isPublic}
                handleFunction={updateIsPublic}
                secure={false}
                placeholder={'Public'}
                multiline={false}
              />
              <LoginButtonComponent label={'Signup'} handleFunction={completeSignupProcess}/>
              <TouchableOpacity onPress={() => {navigation.goBack()}}>
                <Text className="text-white font-bold ml-1 mt-4">
                  Go Back
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default ProfileScreen