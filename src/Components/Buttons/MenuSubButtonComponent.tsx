import React from 'react'
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'
import { ChevronsRight } from 'react-native-feather'

interface NextButtonProps {
  justify: string,
  label: string,
  handleFunction: () => void,
  loading?: boolean
}

const MenuSubButtonComponent: React.FC<NextButtonProps> = (props) => {
  const {justify, label, handleFunction, loading} = props

  return (
    <View className={`w-full flex flex-row justify-${justify} p-4 pr-2`}>
      <TouchableOpacity onPress={() => {handleFunction()}}>
        <View className='flex flex-row rounded-md p-2 items-center' style={{backgroundColor: '#e94f4e'}}>
          {
            loading
              ? <ActivityIndicator size={'small'} color={'white'}/>
              : <> 
                  <Text className='text-white mr-1 font-extrabold'>{label}</Text>
                  <ChevronsRight height={18} width={18} strokeWidth={4} color={'white'}/>
                </>
          }
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default MenuSubButtonComponent