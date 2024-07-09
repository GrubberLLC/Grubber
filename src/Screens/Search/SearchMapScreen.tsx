import React, { useEffect, useState } from 'react';
import { Text, View, PermissionsAndroid, Platform, Alert, TouchableOpacity } from 'react-native';
import SearchBarComponent from '../../Components/Search/SearchBarComponent';
import IconLoadingButtonComponent from '../../Components/Buttons/IconLoadingButtonComponent';
import { useSearch } from '../../Context/SearchContext';
import { ScrollView } from 'react-native-gesture-handler';
import PlaceTileYelpNoSelect from '../../Components/Tile/PlaceTileYelpNoSelect';
import ColorGuide from '../../ColorGuide';
import Geolocation from '@react-native-community/geolocation';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Geocoder from 'react-native-geocoding';
import { GOOGLE_API } from '../../API/Authorizatgion';
import { List, MapPin } from 'react-native-feather';


const SearchMapScreen = () => {
  const {
    yelpResults,
    loadingPlaces,
    searchYelp,
    termSearch,
    locationSearch,
    updateSearchTerm,
    updateLocationSearch,
    mapView, setMapView
  } = useSearch();

  return (
    <View className='flex-1' style={{ backgroundColor: ColorGuide['bg-dark'] }}>
      <View className='pt-2 px-2 flex flex-row w-full'>
        <SearchBarComponent
          icon='Home'
          placeholder='restaurant...'
          term={termSearch}
          updateTerm={updateSearchTerm}
        />
      </View>
      <View className='px-2 flex flex-row w-full border-b-2 mb-4' style={{borderColor: ColorGuide['bg-dark-6']}}>
        <SearchBarComponent
          icon='MapPin'
          placeholder='city, state...'
          term={locationSearch}
          updateTerm={updateLocationSearch}
        />
        <IconLoadingButtonComponent icon='Search' loading={loadingPlaces} onChange={searchYelp} />
      </View>
      <View className='absolute bottom-6 z-40 w-full flex flex-row justify-center'>
        {
          mapView === 'list'
            ? <TouchableOpacity onPress={() => setMapView('list')} className='flex flex-row items-center rounded-lg px-3 py-1.5'  style={{backgroundColor: ColorGuide.primary}}>
                <Text className='text-white font-semibold text-lg mr-2'>
                  Map
                </Text>
                <MapPin height={20} width={20} color={'white'}/>
                {/* <IconLoadingButtonComponent icon='MapPin' loading={false} onChange={() => {}} /> */}
              </TouchableOpacity>
            : <TouchableOpacity onPress={() => setMapView('map')} className='flex flex-row items-center rounded-lg px-3 py-1.5'  style={{backgroundColor: ColorGuide.primary}}>
                <Text className='text-white font-semibold text-lg mr-2'>
                  List
                </Text>
                <List height={20} width={20} color={'white'}/>
                {/* <IconLoadingButtonComponent icon='MapPin' loading={false} onChange={() => {}} /> */}
              </TouchableOpacity>
        }
      </View>
      <ScrollView className='flex-1'>
        
      </ScrollView>
    </View>
  );
};

export default SearchMapScreen;
