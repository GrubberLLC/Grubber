import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { ChevronsRight } from 'react-native-feather'

const SelectPlaceComponent = () => {

  const [place, setPlace] = useState<string | null>(null)

  const limitString = (text: string, min = 18): string => {
    if (text.length > min) {
      return text.substring(0, min) + '...';
    }
    return text
  }

  return (
    <View className='flex flex-col p-4 border-b-2 border-b-neutral-700'>
      <View className='flex flex-row w-full justify-between'>
        <View className='flex flex-row justify-start'>
          <Text className='text-white font-bold text-xl'>PLACE: </Text>
          <Text className='text-white font-bold text-xl ml-4'>{limitString('Place Name Goes Here asdfasdf')}</Text>
        </View>
        <View>
          <ChevronsRight height={32} width={32} color={'white'}/>
        </View>
      </View>
    </View>
  )
}

export default SelectPlaceComponent
