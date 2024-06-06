import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useAuth } from '../../Context/UserContext'
import { Bell, PlusSquare, X } from 'react-native-feather'
import { useNavigation } from '@react-navigation/native'

interface AddMemberProps {
  closeModal: () => void
}

const AddMemberHeader: React.FC<AddMemberProps> = ({closeModal}) => {
  return (
    <View className='h-16 w-full bg-neutral-900 px-4 flex flex-row items-center justify-between border-b-2 border-b-neutral-800'>
      <Text className='text-white text-xl font-extrabold'>Add Member</Text>
      <View className='flex flex-row items-center'>
        <TouchableOpacity onPress={closeModal}>
          <X height={24} width={24} color={'red'}/>
        </TouchableOpacity>
       </View>
    </View>
  )
}

export default AddMemberHeader
