import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { ChevronRight, ChevronsRight } from 'react-native-feather'

interface NextButtonProps {
  justify: string,
  buttonFunction: () => void
}

const NextButtonComponnent: React.FC<NextButtonProps> = (props) => {
  const {justify, buttonFunction} = props
  return (
    <View className={`w-full flex flex-row justify-${justify} p-4`}>
      <TouchableOpacity onPress={() => {buttonFunction()}}>
        <View className='flex flex-row rounded-md p-2 items-center' style={{backgroundColor: '#e94f4e'}}>
          <Text className='text-white mr-1 font-extrabold'>Next</Text>
          <ChevronsRight height={18} width={18} strokeWidth={4} color={'white'}/>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default NextButtonComponnent
