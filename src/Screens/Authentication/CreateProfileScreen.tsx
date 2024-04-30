import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, Dimensions, Image, ImageBackground, KeyboardAvoidingView, PermissionsAndroid, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Background from '../../Assets/background2.jpg'
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../Types/NavigationTypes'; 
import LoginButtonComponent from '../../Components/Inputs/LoginButtonComponent';
import { Plus, RefreshCcw, X } from 'react-native-feather';
import { launchImageLibrary } from 'react-native-image-picker'; 
import { useAuth } from '../../Context/UserContext';
import { uploadData } from 'aws-amplify/storage';

const imageWidth = Dimensions.get('window').width - 32

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'CreateProfileScreen'>;

const CreateProfileScreen: React.FC = () => {
  const route = useRoute<ProfileScreenRouteProp>();
  const params = route.params

  const navigation = useNavigation()

  const {handleSignupObject} = useAuth()

  const [picture, setPicture] = useState<any>(null)
  const [loading, setLoading] = useState<any>(false)

  useEffect(() => {
    JSON.stringify(picture)
  }, [picture])

  const selectImage = async () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const selectedFiles = response.assets.map(asset => ({
          uri: asset.uri,
          type: asset.type,
          fileName: asset.fileName
        }));
        console.log('selected media: ', selectedFiles[0])
        setPicture(selectedFiles[0]);
      }
    });
  };

  const getBlob = () => {
    return fetch(picture.uri)
      .then(response => response.blob()) // Convert the response to a blob
      .catch(error => {
          console.error("Error fetching blob:", error);
          throw error; // Propagate error to be handled later
      });
  };

  const uploadImage = async () => {
    setLoading(true)
    const blob = await getBlob(); // Wait for the blob to be fetched
    // Assuming listImage.fileName and listImage.type are available
    const fileName = picture.fileName;
    const fileType = picture.type;
    const folderName = "profileImages";

    const fileKey = `${folderName}/${fileName}`;

    // Wait for the uploadData function to complete
    const result = await uploadData({
        key: fileKey,
        data: blob,
        options: {
            accessLevel: 'guest',
        }
    }).result;
    let uploadedImage = `https://seekify-storage-da999112230453-staging.s3.us-west-1.amazonaws.com/public/${result.key}`
    createAccountAndProfile(uploadedImage)
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
    }

    handleSignupObject(signupDate, navigation)
    setLoading(false)
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
            <View className={`w-11/12 items-center mb-12`}>
              <View className="w-full flex flex-col items-start">
                <Text className="text-white text-4xl font-semibold mb-b">Profile Picture</Text>
              </View>
              <View className="bg-slate-300 rounded-xl mt-4" style={{height: imageWidth, width: imageWidth}}>
                {
                  picture === null 
                    ? <TouchableOpacity onPress={() => {selectImage()}} className={`w-full h-full bg-slate-500 rounded-xl flex justify-center items-center`}><Plus  height={32} width={32} color={'black'}/></TouchableOpacity>
                    : <View className="flex w-full h-full rounded-xl overflow-hidden">
                        <Image source={{uri: picture.uri}} className="w-full h-full flex flex-row justify-between" />
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
                      <TouchableOpacity onPress={() => {setPicture(null)}}>
                        <Text className="text-white text-xl font-bold">Remove</Text>
                      </TouchableOpacity>
                    </View>
              }
              <LoginButtonComponent label={loading ? 'Loading...' : 'Signup'} handleFunction={() => {uploadImage()}}/>
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
  )
}

export default CreateProfileScreen
