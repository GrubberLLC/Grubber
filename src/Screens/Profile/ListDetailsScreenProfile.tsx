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
import ColorGuide from '../../ColorGuide';

const screenWidth = Dimensions.get('screen').width
const screenHeight = screenWidth * .55

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'ListDetailScreen'>;

const ListDetailsScreenProfile = () => {
  const route = useRoute<ProfileScreenRouteProp>()
  const params = route.params

  const {getListPlaces, placesInSelectList, getAllListMembers, listMembers} = useList()

  useEffect(() => {
    getListPlaces(params.list.list_id)
    getAllListMembers(params.list.list_id)
  }, [])

  return (
    <View className={'flex-1'} style={{backgroundColor: ColorGuide['bg-dark']}}>
      <ListDetailsHeader list_name={params.list.name} list_id={params.list.list_id} list={params.list} listMembers={listMembers}/>
      <ScrollView className='flex-1'>
        {
          placesInSelectList.length > 0
            ? <View>
                {
                  placesInSelectList.map((place: any) => {
                    return(
                      <View key={place.id}>
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

export default ListDetailsScreenProfile
