import React, { useEffect, useState } from 'react';
import { Text, View, Alert, TouchableOpacity } from 'react-native';
import SearchBarComponent from '../../Components/Search/SearchBarComponent';
import IconLoadingButtonComponent from '../../Components/Buttons/IconLoadingButtonComponent';
import { useSearch } from '../../Context/SearchContext';
import { ScrollView } from 'react-native-gesture-handler';
import PlaceTileYelpNoSelect from '../../Components/Tile/PlaceTileYelpNoSelect';
import ColorGuide from '../../ColorGuide';
import { List, MapPin } from 'react-native-feather';
import MapView, { Marker, Callout } from 'react-native-maps';
import PlaceTileMap from '../../Components/Tile/PlaceTileMap';

const SearchScreen = () => {
  const {
    yelpResults,
    loadingPlaces,
    searchYelp,
    termSearch,
    locationSearch,
    updateSearchTerm,
    updateLocationSearch,
    mapView, setMapView,
    mapLongitude, setMapLongitude,
    mapLatitude, setMapLatitude
  } = useSearch();

  useEffect(() => {
    updateLocationSearch('Los Angeles, CA');
    searchYelp();
  }, []);

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
      <View className='px-2 flex flex-row w-full border-b-2 mb-4' style={{ borderColor: ColorGuide['bg-dark-6'] }}>
        <SearchBarComponent
          icon='MapPin'
          placeholder='city, state...'
          term={locationSearch}
          updateTerm={updateLocationSearch}
        />
        <IconLoadingButtonComponent icon='Search' loading={loadingPlaces} onChange={searchYelp} />
      </View>
      <View className='absolute bottom-6 z-40 w-full flex flex-row justify-center'>
        {mapView === 'list' ? (
          <TouchableOpacity onPress={() => setMapView('map')} className='flex flex-row items-center rounded-lg px-3 py-1.5' style={{ backgroundColor: ColorGuide.primary }}>
            <Text className='text-white font-semibold text-lg mr-2'>Map</Text>
            <MapPin height={20} width={20} color={'white'} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setMapView('list')} className='flex flex-row items-center rounded-lg px-3 py-1.5' style={{ backgroundColor: ColorGuide.primary }}>
            <Text className='text-white font-semibold text-lg mr-2'>List</Text>
            <List height={20} width={20} color={'white'} />
          </TouchableOpacity>
        )}
      </View>
      {mapView === 'list' ? (
        <ScrollView className='flex-1'>
          {yelpResults.map((singlePlace) => (
            <View key={singlePlace.id}>
              <PlaceTileYelpNoSelect place={singlePlace} />
            </View>
          ))}
        </ScrollView>
      ) : (
        <View className='flex-1'>
          <MapView
            scrollEnabled={true}
            zoomEnabled={true}
            zoomTapEnabled={true}
            className='h-full w-full'
            initialRegion={{
              latitude: mapLatitude,
              longitude: mapLongitude,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
          >
            {yelpResults.map((property) => (
              <Marker
                pinColor='blue'
                key={property.id}
                coordinate={{
                  longitude: property.coordinates.longitude,
                  latitude: property.coordinates.latitude,
                }}
              >
                <Callout>
                  <View className='w-64'>
                    <PlaceTileMap place={property} />
                  </View>
                </Callout>
              </Marker>
            ))}
          </MapView>
        </View>
      )}
    </View>
  );
};

export default SearchScreen;
