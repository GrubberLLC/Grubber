import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Dimensions, Image, KeyboardAvoidingView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../Types/NavigationTypes'; 
import LoginButtonComponent from '../../Components/Auth/LoginButtonComponent';
import { Plus } from 'react-native-feather';
import ImagePicker from 'react-native-image-crop-picker'; 
import { useAuth } from '../../Context/UserContext';
import { uploadData } from 'aws-amplify/storage';
import ColorGuide from '../../ColorGuide';

const imageWidth = Dimensions.get('window').width - 32;

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'CreateProfileScreen'>;

const CreateProfileScreen: React.FC = () => {
  const route = useRoute<ProfileScreenRouteProp>();
  const params = route.params;

  const navigation = useNavigation();

  const { handleSignupObject } = useAuth();

  const [picture, setPicture] = useState<any>(null);
  const [loading, setLoading] = useState<any>(false);

  useEffect(() => {
    JSON.stringify(picture);
  }, [picture]);

  const selectImage = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      const selectedImage = {
        uri: image.path,
        type: image.mime,
        fileName: image.filename || 'profile_picture.jpg',
      };
      setPicture(selectedImage);
    }).catch(error => {
      console.log('Error selecting image: ', error);
    });
  };

  const getBlob = () => {
    return fetch(picture.uri)
      .then(response => response.blob())
      .catch(error => {
        console.error("Error fetching blob:", error);
        throw error;
      });
  };

  const uploadImage = async () => {
    setLoading(true);
    const blob = await getBlob();
    const fileName = picture.fileName;
    const fileType = picture.type;
    const folderName = "profileImages";

    const fileKey = `${folderName}/${fileName}`;

    const result = await uploadData({
      key: fileKey,
      data: blob,
      options: {
        accessLevel: 'guest',
      }
    }).result;
    
    let uploadedImage = `https://grubber-mobile-storage-8be2b031175523-staging.s3.us-west-1.amazonaws.com/public/${result.key}`;
    createAccountAndProfile(uploadedImage);
  };

  const createAccountAndProfile = (picture: string) => {
    const signupDate = {
      username: params.username,
      password: params.password,
      email: params.email,
      phone: params.phone,
      given_name: params.given_name,
      family_name: params.family_name,
      nickname: params.given_name,
      name: `${params.given_name} ${params.family_name}`,
      locale: params.locale,
      preferred_username: params.username,
      bio: params.bio,
      profile_picture: picture,
      public: params.isPublic,
      notifications: true,
    };

    handleSignupObject(signupDate, navigation);
    setLoading(false);
  };

  return (
    <View className="w-screen h-screen absolute z-0" style={{ backgroundColor: ColorGuide['bg-dark'] }}>
      <View className="w-screen h-screen bg-black opacity-60 absolute z-1"></View>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 justify-end items-center pt-16">
            <View className={`w-11/12 items-center mb-12`}>
              <View className="w-full flex flex-col items-start">
                <Text className="text-white text-4xl font-semibold mb-b">Profile Picture</Text>
              </View>
              <View className="bg-slate-300 rounded-xl mt-4" style={{ height: imageWidth, width: imageWidth, backgroundColor: 'grey' }}>
                {
                  picture === null 
                    ? <TouchableOpacity onPress={() => { selectImage() }} className={`w-full h-full bg-slate-500 rounded-xl flex justify-center items-center`}><Plus height={32} width={32} color={'white'} /></TouchableOpacity>
                    : <View className="flex w-full h-full rounded-xl overflow-hidden">
                        <Image source={{ uri: picture.uri }} className="w-full h-full flex flex-row justify-between" />
                      </View>
                }
              </View>
              {
                picture === null 
                  ? null 
                  : <View className="w-full flex flex-row justify-between mt-4 p-2 rounded-xl">
                      <TouchableOpacity onPress={selectImage}>
                        <Text className="text-white text-xl font-bold">Replace</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => { setPicture(null) }}>
                        <Text className="text-white text-xl font-bold">Remove</Text>
                      </TouchableOpacity>
                    </View>
              }
              <LoginButtonComponent label={loading ? 'Loading...' : 'Signup'} handleFunction={() => { uploadImage() }} />
              <TouchableOpacity onPress={() => { navigation.goBack() }}>
                <Text className="text-white font-bold ml-1 mt-4">
                  Go Back
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default CreateProfileScreen;
