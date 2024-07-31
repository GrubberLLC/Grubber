import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native'

const screenWidth = Dimensions.get('screen').width
const screenHeight = screenWidth * .65

interface ListProps {
  created_at: string,
  created_by: string,
  description: string,
  last_activity: string,
  list_id: number,
  member_id: number,
  name: string,
  picture: string,
  public: boolean,
  sent_request: string,
  status: string,
  type: string,
  user_id: string,
}

interface ListTileProps {
  list: ListProps
}

const ListTile: React.FC<ListTileProps> = ({list}) => {
  const navigation = useNavigation()

  

  const redirectToListDetailScreen = (list: ListProps) => {
    navigation.navigate('ListDetailsScreen', {list: list})
  }

  return (
    <TouchableOpacity onPress={() => {redirectToListDetailScreen(list)}} className='py-3'>
      <View style={{height: screenHeight, width: screenWidth}}>
        <Image className='flex-1' source={{uri: list.picture}}/>
        <View style={{backgroundColor: 'rgba(0, 0, 0, .5)', height: screenHeight, width: screenWidth}} className='absolute z-5 flex flex-col justify-between p-2'>
          <View>
            <Text className='text-white text-2xl font-bold'>{list.name}</Text>
            <Text className='text-white text-base font-semibold'>{list.description}</Text>
          </View>
          <Text className='text-white text-base font-semibold'>{list.last_activity}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default ListTile
