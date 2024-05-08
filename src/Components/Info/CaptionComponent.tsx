import React from 'react'
import { Text, View } from 'react-native'

interface CaptionProps {
  caption: string | null
}

const CaptionComponent: React.FC<CaptionProps> = ({caption}) => {
  return (
    <View className='px-2'>
      <Text className='text-white text-base'>
        {
          caption
            ? caption
            : null
        }
      </Text>
    </View>
  )
}

export default CaptionComponent
