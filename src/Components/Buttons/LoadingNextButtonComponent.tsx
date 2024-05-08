import React from 'react'
import { Text, View } from 'react-native'
import { ChevronsRight, RefreshCcw } from 'react-native-feather'

interface NextButtonProps {
  justify: string,
}

const LoadingNextButtonComponent: React.FC<NextButtonProps> = (props) => {
  const {justify} = props

  return (
    <View className={`w-full flex flex-row justify-${justify} p-4`}>
      <View>
        <View className='flex flex-row rounded-md p-2 items-center' style={{backgroundColor: '#e94f4e'}}>
          <RefreshCcw height={16} width={16} color={'white'} className='animate-spin'/>
        </View>
      </View>
    </View>
  )
}

export default LoadingNextButtonComponent
