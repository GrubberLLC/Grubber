import React from 'react'
import { Image, Text, View } from 'react-native'
import { Star } from 'react-native-feather'

interface PlaceProps {
  image: string,
  name: string,
  phone: string,
  price: string,
  rating: number,
  review_count: number,
  closed: boolean,
  yelp_url: string,
  yelp_id: string,
  longitude: number,
  latitude: number,
  address_street: string,
  address_city: string,
  address_state: string,
  address_zip_code: string,
  address_formatted: string
}

interface PlacePostProps {
  place: PlaceProps | null
}

const PlacePostTileComponent: React.FC<PlacePostProps> = ({place}) => {
  return (
    <View className='px-2 py-6 w-full flex flex-row'>
      <View>
        <Image height={68} width={68} className='bg-stone-800 rounded-md' source={{uri: place?.image}}/>
      </View>
      <View className='ml-4 flex-w flex justify-center'>
        <Text className='text-white text-xl font-bold leading-5'>{place?.name}</Text>
        <Text className='text-white text-base'>{place?.address_formatted}</Text>
        <View className='flex flex-row items-center'>
          <View className='flex flex-row items-center justify-between'>
            <Star height={16} width={16} color={'#e94f4e'} fill={'#e94f4e'}/>
            <Text className='text-white text-sm ml-2'>{place?.rating} / 5</Text>
          </View>
          <Text className='text-white text-base ml-2'>({place?.review_count}) Reviews</Text>
        </View>
      </View>
    </View>
  )
}

export default PlacePostTileComponent
