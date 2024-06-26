import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, Text, View } from 'react-native'
import { Star } from 'react-native-feather'
import { TouchableOpacity } from 'react-native-gesture-handler'

interface PlacePostProps {
  image: string,
  name: string,
  rating: number,
  reviews: number,
  place_id: string
}

const PlacePostSummary: React.FC<PlacePostProps> = ({image, name, rating, reviews, place_id}) => {
  const navigation = useNavigation()

  const redirectToPlace = () => {
    navigation.navigate('PlaceScreen', {place_id: place_id})
  }

  return (
    <TouchableOpacity onPress={() => {redirectToPlace()}} className='w-full px-2 flex flex-row pt-4'>
      <View className='mr-4'>
        <Image height={48} width={48} source={{uri: image}}/>
      </View>
      <View className='justify-between flex-1'>
        <Text className='text-white text-base font-bold'>{name}</Text>
        <View className='flex-1 flex flex-row items-center justify-between'>
          <View className='flex flex-row items-center'>
            <Star className='mr-1' height={20} width={20} color={'#e94f4e'} fill={'#e94f4e'}/>
            <Text className='text-white'>{rating} / 5 stars</Text>
          </View>
          <Text className='text-white'>({reviews}) Reviews</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default PlacePostSummary
