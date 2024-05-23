import React, { useEffect, useState } from 'react'
import { Dimensions, Image, TouchableOpacity, View } from 'react-native'
import { usePost } from '../../Context/PostContext'
import useDoubleTap from '../../Hooks/useDoubleTap'
import axios from 'axios'

const imageWidth = Dimensions.get('window').width

interface SelectedImageProps {
  image: string | null,
  addImageLike: () => void
}

const FullImageComponent: React.FC<SelectedImageProps> = ({image, addImageLike}) => {

  const handleDoubleTap = useDoubleTap(addImageLike);

  return (
    <TouchableOpacity 
      style={{height: imageWidth, width: imageWidth}} 
      className='bg-neutral-800'
      onPress={handleDoubleTap}
    >
      {
        image 
          ? <Image className='z-5 h-full w-full' source={{uri: image}}/>
          : <View className='h-full w-full bg-neutral-700'></View>
      }
    </TouchableOpacity>
  )
}

export default FullImageComponent
