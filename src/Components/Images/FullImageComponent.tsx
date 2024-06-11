import React, { useEffect, useState } from 'react'
import { Dimensions, Image, TouchableOpacity, View } from 'react-native'
import { usePost } from '../../Context/PostContext'
import useDoubleTap from '../../Hooks/useDoubleTap'
import axios from 'axios'
import ColorGuide from '../../ColorGuide'

const imageWidth = Dimensions.get('window').width

interface SelectedImageProps {
  image: string | null,
  addImageLike: () => void
}

const FullImageComponent: React.FC<SelectedImageProps> = ({image, addImageLike}) => {

  const handleDoubleTap = useDoubleTap(addImageLike);

  return (
    <TouchableOpacity 
      style={{height: imageWidth, width: imageWidth, backgroundColor: ColorGuide['bg-dark-8']}} 
      onPress={handleDoubleTap}
    >
      {
        image 
          ? <Image className='z-5 h-full w-full' source={{uri: image}}/>
          : <View className='h-full w-full' style={{backgroundColor: ColorGuide['bg-dark-7']}}></View>
      }
    </TouchableOpacity>
  )
}

export default FullImageComponent
