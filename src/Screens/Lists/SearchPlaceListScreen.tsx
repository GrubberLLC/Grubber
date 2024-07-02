import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Text, View } from 'react-native'
import SearchBarComponent from '../../Components/Search/SearchBarComponent'
import IconLoadingButtonComponent from '../../Components/Buttons/IconLoadingButtonComponent'
import { useSearch } from '../../Context/SearchContext'
import { ScrollView } from 'react-native-gesture-handler'
import PlaceTileYelp from '../../Components/Tile/PlaceTileYelp'
import PlaceTileYelpNoSelect from '../../Components/Tile/PlaceTileYelpNoSelect'
import { useList } from '../../Context/ListContext'
import PlaceTileYelpList from '../../Components/Tile/PlaceTileYelpList'
import MenuSubButtonComponent from '../../Components/Buttons/MenuSubButtonComponent'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../Types/NavigationTypes';
import ColorGuide from '../../ColorGuide'

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'SearchPlaceListScreen'>;

const SearchPlaceListScreen = () => {
  const navigation = useNavigation()
  const route = useRoute<ProfileScreenRouteProp>()
  const params = route.params

  const {getAllListMembers, listMembers, search, location, updateSearch, updateLocation, loadingResults, searchYelp, yelpResults, checkPlace, selectedPlace} = useList()

  useLayoutEffect(() => {
    getAllListMembers(parseInt(route.params.list_id))
  }, [])

  return (
    <View className='flex-1 ' style={{backgroundColor: ColorGuide['bg-dark']}}>
      <View className='pt-2 px-2 flex flex-row w-full'>
        <SearchBarComponent icon='Home' placeholder='restaurant...' term={search} updateTerm={updateSearch}/>
      </View>
      <View className='px-2 flex flex-row w-full border-b-2 border-b-neutral-700 mb-4'>
        <SearchBarComponent icon='MapPin' placeholder='city, state...' term={location} updateTerm={updateLocation}/>
        <IconLoadingButtonComponent icon='Search' loading={loadingResults} onChange={searchYelp}/>
      </View>
      <ScrollView className='flex-1'>
        {
          yelpResults.map((singlePlace: any) => {
            return(
              <View key={singlePlace.id}>
                {/* <Text className='text-white'>{singlePlace.name}</Text> */}
                <PlaceTileYelpList place={singlePlace} />
              </View>
            )
          })
        }
      </ScrollView>
      <MenuSubButtonComponent justify='end' label='Add Place To List' handleFunction={() => {checkPlace(selectedPlace.yelp_id , selectedPlace.name, params.list_id, navigation, params.list, listMembers)}}/>
    </View>
  )
}

export default SearchPlaceListScreen
