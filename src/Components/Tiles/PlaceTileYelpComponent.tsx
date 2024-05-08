import React, { useEffect, useState } from 'react'
import { Dimensions, Image, Text, View } from 'react-native'
import { Star } from 'react-native-feather'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { usePost } from '../../Context/PostContext'

const imageWidth = Dimensions.get('screen').width

interface PlaceTileProps {
  item: any
}


const PlaceTileYelpComponent: React.FC<PlaceTileProps> = ({item}) => {

  const {updatePostPlace, postPlace} = usePost()

  const [selected, setSelected] = useState<boolean>(false)

  useEffect(() => {
    postPlace?.yelp_id === item.id
      ? setSelected(true)
      : setSelected(false)
  }, [postPlace])
  
  const addPlaceToPost = () => {
    const newData = {
      image: item.image_url,
      name: item.name,
      phone: item.phone,
      price: item.price,
      rating: item.rating,
      review_count: item.review_count,
      closed: item.is_closed,
      yelp_url: item.url,
      yelp_id: item.id,
      longitude: item.coordinates.longitude,
      latitude: item.coordinates.longitude,
      address_street: item.location.address1,
      address_city: item.location.city,
      address_state: item.location.state,
      address_zip_code: item.location.zip_code,
      address_formatted: `${item.location.address1} ${item.location.city}, ${item.location.state} ${item.location.zip_code}`,
    }
    updatePostPlace(newData)
  }

  return (
    <TouchableOpacity onPress={() => {addPlaceToPost()}} className='flex-1 p-2 mt-2'>
      <View>
        <View className='w-full h-80'>
          <Image className='flex-1 z-5' source={{uri: item.image_url}}/>
          <View 
            className='absolute top-0 left-0 w-full h-80' 
            style={{backgroundColor: 'rgba(0, 0, 0, .4)'}}
          ></View>
          <View className='absolute w-full h-80 top-0 p-3 flex flex-col justify-between'>
            <View>
              {
                selected
                  ? <View className='rounded-md bg-red-500'>
                      <Text className='text-white text-lg font-bold p-2'>Selected</Text>
                    </View>
                  : null
              }
            </View>
            <View>
              <Text className='text-white text-3xl font-bold'>{item.name}</Text>
              <View className='mt-2'>
                <Text className='text-lg text-white font-bold'>{item.location.address1}</Text>
                <Text className='text-lg text-white font-bold'>{item.location.city}, {item.location.state} {item.location.zip_code}</Text>
              </View>
              <View className='mt-2 w-full flex flex-row items-center justify-between'>
                <View className='flex flex-row items-center'>
                  <Star className='mr-2' height={20} width={20} fill={'#e94f4e'} color={'#e94f4e'}/>
                  <Text className='text-lg text-white font-bold'>{item.rating} / 5 Rating</Text>
                </View>
                <Text className='text-lg text-white font-bold'>({item.review_count}) Reviews</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default PlaceTileYelpComponent
