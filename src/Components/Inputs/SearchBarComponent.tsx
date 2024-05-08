import React from 'react'
import { View } from 'react-native'
import * as Icons from 'react-native-feather';
import LargeTextInputComponent from './LargeTextInputComponent'

interface SearchProps {
  term: string, 
  updateTerm: (text: string) => void,
  icon: string,
  placeholder: string,
}

const SearchBarComponent: React.FC<SearchProps> = (props) => {
  const {term, icon, updateTerm, placeholder} = props

  const IconComponent = Icons[icon]

  return (
    <View className='w-full flex-1 flex flex-row h-14 items-center p-3 border-2 border-neutral-700 rounded-md text-base'>
      <View>
        {IconComponent ? <IconComponent className="mr-2" height={20} width={20} color="white" /> : null}
      </View>
      <LargeTextInputComponent
        value={term}
        onChange={updateTerm}
        capitalize='none'
        placeholder={placeholder}
        multiline={false}
        className='text-base'
      />
    </View>
  )
}

export default SearchBarComponent
