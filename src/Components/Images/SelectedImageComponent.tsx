import React, { useEffect } from 'react'
import { Dimensions, Image, View } from 'react-native'
import { usePost } from '../../Context/PostContext'
import ColorGuide from '../../ColorGuide'

const imageWidth = Dimensions.get('window').width

interface SelectedImageProps {
  image: string | null
}

const SelectedImageComponent: React.FC<SelectedImageProps> = ({image}) => {

  return (
    <View style={{height: imageWidth, width: imageWidth, backgroundColor: ColorGuide['bg-dark-8']}}>
      {
        image 
          ? <Image className='z-5 h-full w-full' source={{uri: image}}/>
          : <View className='h-full w-full' style={{backgroundColor: ColorGuide['bg-dark-7']}}></View>
      }
    </View>
  )
}

export default SelectedImageComponent
