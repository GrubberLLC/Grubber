import React, { useEffect } from 'react'
import { Dimensions, Image, ScrollView, Text, View } from 'react-native'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../Types/NavigationTypes';
import ListHeader from '../../Components/Headers/ListHeader';
import ListDetailsHeader from '../../Components/Headers/ListDetailsHeader';
import { list } from 'aws-amplify/storage';
import { useList } from '../../Context/ListContext';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import PlaceTileDatabase from '../../Components/Tile/PlaceTileDatabase';
import PlaceListTile from '../../Components/Tile/PlaceListTile';

const screenWidth = Dimensions.get('screen').width
const screenHeight = screenWidth * .55

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'ListDetailScreen'>;

const ListDetailsScreen = () => {
  const route = useRoute<ProfileScreenRouteProp>()
  const params = route.params

  const {getListPlaces, placesInSelectList} = useList()

  useEffect(() => {
    getListPlaces(params.list.list_id)
  }, [])

  return (
    <View className={'flex-1 bg-neutral-900'}>
      <ListDetailsHeader list_name={params.list.name} list_id={params.list.list_id} list={params.list}/>
      {/* <View className='w-full flex flex-row border-b-2 border-b-neutral-700'>
        <View className='h-28 w-28'>
          <Image className='flex-1' source={{uri: params.list.picture}}/>
        </View>
        <View className='flex-1 ml-3'>
          <Text className='text-white text-2xl font-bold'>{limitStringLength(params.list.name, 15)}</Text>
          <Text className='text-white text-base font-semibold'>{limitStringLength(params.list.description, 100)}</Text>
        </View>
      </View> */}
      <ScrollView className='flex-1'>
        {
          placesInSelectList.length > 0
            ? <View>
                {
                  placesInSelectList.map((place: any) => {
                    return(
                      <View>
                        <PlaceListTile place={place}/>
                      </View>
                    )
                  })
                }
              </View>
            : null
        }
      </ScrollView>
    </View>
  )
}

export default ListDetailsScreen
