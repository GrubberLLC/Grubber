import React from 'react'
import { Text, View } from 'react-native'

interface CaptionProps {
  caption: string | null
}

const CaptionComponent: React.FC<CaptionProps> = ({caption}) => {
  return (
    <View> 
      {
        caption
          ? <Text className='text-white text-base px-2 pt-3'>{caption}</Text>
          : null
      }
    </View>
  )
}

export default CaptionComponent
