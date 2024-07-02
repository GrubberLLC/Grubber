import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Dimensions, Image, TouchableOpacity, View } from 'react-native';
import { Plus } from 'react-native-feather';
import { launchImageLibrary } from 'react-native-image-picker';
import ColorGuide from '../../ColorGuide';
import { uploadData } from 'aws-amplify/storage';

const imageWidth = Dimensions.get('window').width;

interface ImageProps {
  picture: string;
  selectingImage: (picture: string) => void;
  size: number | undefined;
}

interface FullImageProp {
  uri: string;
  type: string;
  fileName: string;
}

const EditSelectGalleryImageComponent: React.FC<ImageProps> = ({ picture, selectingImage, size }) => {
  const [tempPicture, setTempPicture] = useState<string | null>(null);
  const [fullImage, setFullImage] = useState<FullImageProp | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setTempPicture(picture);
  }, [picture]);

  const selectImage = async () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.error('ImagePicker Error: ', response.errorCode);
      } else {
        const selectedFile = response.assets[0];
        if (selectedFile) {
          const { uri, type, fileName } = selectedFile;
          setFullImage({ uri, type, fileName });
          setTempPicture(uri);
          uploadImage(uri, type, fileName);
        }
      }
    });
  };

  const getBlob = async (uri: string) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  };

  const uploadImage = async (uri: string, type: string, fileName: string) => {
    setLoading(true);
    try {
      const blob = await getBlob(uri);
      const folderName = 'profileImages';
      const fileKey = `${folderName}/${fileName}`;

      const result = await uploadData({
        key: fileKey,
        data: blob,
        options: {
            accessLevel: 'guest',
        }
      }).result;
      const uploadedImage = `https://grubber-mobile-storage-8be2b031175523-staging.s3.us-west-1.amazonaws.com/public/${result.key}`;
      console.log('selected image downloadable url: ', uploadedImage);
      setTempPicture(uploadedImage);
      selectingImage(uploadedImage);
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={selectImage}>
        <View style={{ height: size, width: size, backgroundColor: ColorGuide['bg-dark'] }}>
          {tempPicture && tempPicture !== '' ? (
            <View className='flex-1 items-center justify-start'>
              <View className='absolute z-10 w-full flex flex-row justify-between items-center p-2'>
                <View></View>
                {loading && <ActivityIndicator size={20} color={'white'} />}
              </View>
              <Image className='z-5 h-full w-full rounded-full overflow-hidden' source={{ uri: tempPicture }} />
            </View>
          ) : (
            <TouchableOpacity onPress={selectImage} className='flex-1 justify-center items-center rounded-full h-full w-full' style={{ backgroundColor: ColorGuide['bg-dark-7'] }}>
              <Plus height={18} width={18} color={'white'} />
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default EditSelectGalleryImageComponent;
