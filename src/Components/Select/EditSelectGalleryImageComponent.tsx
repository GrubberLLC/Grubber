import React, { useState } from 'react'
import { Dimensions, Image, TouchableOpacity, View } from 'react-native'
import { Plus, RefreshCcw, X } from 'react-native-feather'
import { launchImageLibrary } from 'react-native-image-picker'
import ColorGuide from '../../ColorGuide'

const imageWidth = Dimensions.get('window').width

interface SingleImageProp {
  uri: string | undefined,
  fileType: string | undefined,
  fileName: string | undefined,
}

interface ImageProps {
  picture: SingleImageProp | null,
  selectingImage: (picture: any) => void
  size: number | undefined
}

const EditSelectGalleryImageComponent: React.FC<ImageProps> = ({picture, selectingImage, size}) => {
  
  const selectAnImage = () => {
    launchImageLibrary({ mediaType: 'mixed' }, (response) => {
      if (response.didCancel) {
      } else if (response.errorCode) {
      } else {
        const selectedFiles = response.assets.map(asset => ({
          uri: asset.uri,
          type: asset.type,
          fileName: asset.fileName
        }));
        selectingImage(selectedFiles[0]);
      }
    });
  }

  return (
    <View>
      <TouchableOpacity>
        <View style={{height: size, width: size, backgroundColor: ColorGuide['bg-dark']}}>
          {
            picture
              ? <View className='flex-1 items-center justify-start'>
                  <View className='absolute z-10 w-full flex flex-row justify-between items-center p-2'>
                    <View></View>
                    <TouchableOpacity onPress={() => {selectingImage(null)}} className='p-1 rounded-3xl' style={{backgroundColor: 'rgba(255, 255, 255, .6)'}}>
                      <X height={12} width={12} color={'black'}/>
                    </TouchableOpacity>
                  </View>
                  <Image className='z-5 h-full w-full rounded-full overflow-hidden' source={{uri: picture.uri}}/>
                </View>
              : <TouchableOpacity onPress={() => {selectAnImage()}} className='flex-1 justify-center items-center rounded-full h-full w-full' style={{backgroundColor: ColorGuide['bg-dark-7']}}>
                  <Plus height={18} width={18} color={'white'}/>
                </TouchableOpacity>
          }
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default EditSelectGalleryImageComponent
