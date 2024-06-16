import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import SearchBarComponent from '../../Components/Search/SearchBarComponent'
import IconLoadingButtonComponent from '../../Components/Buttons/IconLoadingButtonComponent'
import { useSearch } from '../../Context/SearchContext'
import { ScrollView } from 'react-native-gesture-handler'
import PlaceTileYelp from '../../Components/Tile/PlaceTileYelp'
import PlaceTileYelpNoSelect from '../../Components/Tile/PlaceTileYelpNoSelect'
import ColorGuide from '../../ColorGuide'

const SearchScreen = () => {
  const {yelpResults, loadingPlaces, searchYelp, termSearch, locationSearch, updateSearchTerm, updateLocationSearch} = useSearch()

  useEffect(() => {
    searchYelp()
  }, [])

  return (
    <View className='flex-1' style={{backgroundColor: ColorGuide['bg-dark']}}>
      <View className='pt-2 px-2 flex flex-row w-full'>
        <SearchBarComponent icon='Home' placeholder='restaurant...' term={termSearch} updateTerm={updateSearchTerm}/>
      </View>
      <View className='px-2 flex flex-row w-full border-b-2 border-b-neutral-700 mb-4'>
        <SearchBarComponent icon='MapPin' placeholder='city, state...' term={locationSearch} updateTerm={updateLocationSearch}/>
        <IconLoadingButtonComponent icon='Search' loading={loadingPlaces} onChange={searchYelp}/>
      </View>
      <ScrollView className='flex-1'>
        {
          yelpResults.map((singlePlace: any) => {
            return(
              <View key={singlePlace.id}>
                <PlaceTileYelpNoSelect place={singlePlace}/>
              </View>
            )
          })
        }
      </ScrollView>
    </View>
  )
}

export default SearchScreen
