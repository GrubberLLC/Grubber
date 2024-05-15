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

const NewPostPlaceScreen = () => {
  const navigation = useNavigation()

  const {place, location, updatePlace, updateLocation, searchingPlaces, handleSetSearchingPlaces} = usePost()

  const redirectToPostPlace = () => {
    navigation.navigate('ReviewPostScreen')
  }

  return (
    <View className={'flex-1 bg-neutral-900'}>
      <NoMenuPageHeader backing={true} leftLabel='New Post'/>
      <View className='pt-2 px-2 flex flex-row w-full'>
        <SearchBarComponent term={place} updateTerm={updatePlace} placeholder='Search Place...' icon='Home' />
      </View>
      <View className='px-2 flex flex-row w-full border-b-2 border-b-neutral-700 mb-2.5'>
        <SearchBarComponent term={location} updateTerm={updateLocation} placeholder='Search Location...' icon='MapPin' />
        {/* <View className='h-14 w-14  bg-red-500 flex flex-row justify-center items-center ml-2 rounded-md'>
          <Search className='' height={30} width={30} color={'white'}/>
        </View> */}
        <IconLoadingButtonComponent icon='Search' loading={searchingPlaces} onChange={handleSetSearchingPlaces}/>
      </View>
      <ScrollView className='flex-1'>

      </ScrollView>
      <MenuSubButtonComponent label='Confirm Post' justify='end' handleFunction={redirectToPostPlace}/>
    </View>
  )
}

export default NewPostPlaceScreen

