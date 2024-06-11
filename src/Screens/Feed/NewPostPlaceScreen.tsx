import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { usePost } from '../../Context/PostContext'
import NoMenuPageHeader from '../../Components/Headers/NoMenuPageHeader'
import SearchBarComponent from '../../Components/Search/SearchBarComponent'
import { Search } from 'react-native-feather'
import MenuSubButtonComponent from '../../Components/Buttons/MenuSubButtonComponent'
import LoadingButtonComponent from '../../Components/Buttons/IconLoadingButtonComponent'
import IconLoadingButtonComponent from '../../Components/Buttons/IconLoadingButtonComponent'
import PlaceTileYelp from '../../Components/Tile/PlaceTileYelp'
import ColorGuide from '../../ColorGuide'

const NewPostPlaceScreen = () => {
  const navigation = useNavigation()

  const {place, location, updatePlace, updateLocation, 
    searchingPlaces, handleSetSearchingPlaces, postSearchResults} = usePost()

  const redirectToPostPlace = () => {
    navigation.navigate('ReviewPostScreen')
  }

  return (
    <View className={'flex-1'} style={{backgroundColor: ColorGuide['bg-dark']}}>
      <NoMenuPageHeader backing={true} leftLabel='New Post'/>
      <View className='pt-2 px-2 flex flex-row w-full'>
        <SearchBarComponent term={place} updateTerm={updatePlace} placeholder='Search Place...' icon='Home' />
      </View>
      <View className='px-2 flex flex-row w-full border-b-2 border-b-neutral-700 mb-2.5'>
        <SearchBarComponent term={location} updateTerm={updateLocation} placeholder='Search Location...' icon='MapPin' />
        <IconLoadingButtonComponent icon='Search' loading={searchingPlaces} onChange={handleSetSearchingPlaces}/>
      </View>
      <ScrollView className='flex-1'>
        {
          postSearchResults.map((singlePlace: any) => {
            return(
              <View key={singlePlace.id}>
                {/* <Text className='text-white'>{singlePlace.name}</Text> */}
                <PlaceTileYelp place={singlePlace}/>
              </View>
            )
          })
        }
      </ScrollView>
      <MenuSubButtonComponent label='Confirm Post' justify='end' handleFunction={redirectToPostPlace}/>
    </View>
  )
}

export default NewPostPlaceScreen

