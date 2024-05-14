import React, { useEffect } from 'react'
import { Dimensions, Image, View } from 'react-native'
import { usePost } from '../../Context/PostContext'

const imageWidth = Dimensions.get('window').width

interface SelectedImageProps {
  image: string | null
}

const FullImageComponent: React.FC<SelectedImageProps> = ({image}) => {

  useEffect(() => {
    console.log('image uri: ', image)
  }, [])

  return (
    <View style={{height: imageWidth, width: imageWidth}} className='bg-neutral-800'>
      {
        image 
          ? <Image className='z-5 h-full w-full' source={{uri: image}}/>
          : <View className='h-full w-full bg-neutral-700'></View>
      }
    </View>
  )
}

export default FullImageComponent
