import React, { useState } from 'react'
import { View } from 'react-native'
import LargeTextInputComponent from './LargeTextInputComponent'

const AddCaptionComponent = () => {

  const [caption, setCaption] = useState<string>('')

  const handleCaptionChange = (text: string) => {
    setCaption(text)
  }

  return (
    <View className='w-full p-4 pb-6 border-b-2 border-b-neutral-700  text-base'>
      <LargeTextInputComponent
        label={'CAPTION:'}
        value={caption}
        onChange={handleCaptionChange}
        placeholder='start typing...'
        capitalize='none'
        multiline={true}
        className=' text-base'
      />
    </View>
  )
}

export default AddCaptionComponent
