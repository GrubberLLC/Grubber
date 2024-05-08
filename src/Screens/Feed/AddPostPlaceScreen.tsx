import React, { useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import PageHeaderComponent from '../../Components/Headers/PageHeaderComponent'
import SearchBarComponent from '../../Components/Inputs/SearchBarComponent'
import { RefreshCcw, Search } from 'react-native-feather'
import { usePost } from '../../Context/PostContext'
import PlaceTileYelpComponent from '../../Components/Tiles/PlaceTileYelpComponent'
import NextButtonComponnent from '../../Components/Buttons/NextButtonComponnent'
import { useNavigation } from '@react-navigation/native'

const AddPostPlaceScreen = () => {
  const navigation = useNavigation()

  const {postSearchLoading, postSearchResults, place, location, updatePlace, updateLocation, searchYelp} = usePost()

  const redirectToPreviewPage = () => {
    navigation.navigate('ReviewPostScreen')
  }

  return (
    <View className={'flex-1 bg-neutral-900'}>
      <PageHeaderComponent backing={true} leftLabel='Select Place'/>
      <View className='p-2 pb-3 border-b-2 border-b-neutral-700'>
        <View className='w-full flex flex-row items-center pb-3'>
          <SearchBarComponent 
            term={place}
            icon={'Search'}
            updateTerm={updatePlace}
            placeholder='Search place...'
          />
        </View>
        <View className='w-full flex flex-row items-center'>
          <SearchBarComponent 
            term={location}
            icon={'MapPin'}
            updateTerm={updateLocation}
            placeholder='Enter location...'
          />
          {
            postSearchLoading
              ? <View className='h-12 w-12 flex justify-center items-center rounded-md ml-2' style={{backgroundColor: '#e94f4e'}}>
                  <TouchableOpacity>
                  <RefreshCcw className='animate-spin' height={32} width={28} color={'white'}/>
                  </TouchableOpacity>
                </View>
              : <View className='h-12 w-12 flex justify-center items-center rounded-md ml-2' style={{backgroundColor: '#e94f4e'}}>
                  <TouchableOpacity onPress={() => {searchYelp()}}>
                    <Search height={32} width={28} color={'white'}/>
                  </TouchableOpacity>
                </View>
          }
        </View>
      </View>
      <ScrollView className='flex-1'>
         {
            postSearchResults.length > 0
              ? postSearchResults.map((item) => {
                  return(
                    <PlaceTileYelpComponent item={item}/>
                  )
                })
              : <View className='flex flex-col justify-center items-center mt-44'>
                  {
                    postSearchLoading
                      ? <RefreshCcw className='animate-spin' height={32} width={28} color={'white'}/>
                      : <Text className='text-xl text-white font-bold'>No Results...</Text>
                  }
                </View>
         }
      </ScrollView>
      <View>
        <NextButtonComponnent justify='end' buttonFunction={redirectToPreviewPage}/>
      </View>
    </View>
  )
}

export default AddPostPlaceScreen
