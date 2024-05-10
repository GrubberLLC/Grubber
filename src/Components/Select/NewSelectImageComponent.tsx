import React, { useState } from 'react'
import { Dimensions, Image, TouchableOpacity, View } from 'react-native'
import { Plus, RefreshCcw, X } from 'react-native-feather'
import { launchImageLibrary } from 'react-native-image-picker'

const imageWidth = Dimensions.get('window').width

interface imageProps {
  uri: string | undefined,
  type: string | undefined,
  fileName: string | undefined
}

interface ImageProps {
  picture: imageProps,
  selectingImage: () => {}
}

const NewSelectImageComponent = ({picture, selectingImage}) => {
  
  const selectAnImage = () => {
    launchImageLibrary({ mediaType: 'mixed' }, (response) => {
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
        selectingImage(selectedFiles[0]);
      }
    });
  }

  return (
    <View>
      <TouchableOpacity>
        <View style={{height: imageWidth, width: imageWidth}} className='bg-neutral-800'>
          {
            picture
              ? <View className='flex-1 items-center justify-end'>
                  <View className='absolute z-10 w-full flex flex-row justify-between items-center p-2'>
                    <TouchableOpacity onPress={() => {selectAnImage()}} className='p-2 rounded-3xl' style={{backgroundColor: 'rgba(255, 255, 255, .4)'}}>
                      <RefreshCcw height={24} width={24} color={'black'}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {selectingImage(null)}} className='p-2 rounded-3xl' style={{backgroundColor: 'rgba(255, 255, 255, .4)'}}>
                      <X height={24} width={24} color={'black'}/>
                    </TouchableOpacity>
                  </View>
                  <Image className='z-5 h-full w-full' source={{uri: picture.uri}}/>
                </View>
              : <TouchableOpacity onPress={() => {selectAnImage()}} className='flex-1 justify-center items-center'>
                  <Plus height={32} width={32} color={'white'}/>
                </TouchableOpacity>
          }
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default NewSelectImageComponent