import React, { useEffect, useState } from 'react';
import { Text, View, Platform, Alert, TouchableOpacity } from 'react-native';
import SearchBarComponent from '../../Components/Search/SearchBarComponent';
import IconLoadingButtonComponent from '../../Components/Buttons/IconLoadingButtonComponent';
import { useSearch } from '../../Context/SearchContext';
import { ScrollView } from 'react-native-gesture-handler';
import PlaceTileYelpNoSelect from '../../Components/Tile/PlaceTileYelpNoSelect';
import ColorGuide from '../../ColorGuide';
import { check, request, PERMISSIONS, RESULTS, openSettings } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import { GOOGLE_API } from '../../API/Authorizatgion';
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

  const [locationGranted, setLocationGranted] = useState(false);
<<<<<<< HEAD
  Geocoder.init(GOOGLE_API);
=======

  useEffect(() => {
    // Geocoder.init(GOOGLE_API); // Initialize Geocoder
    // handleLocationPermission();
    updateLocationSearch('Los Angeles, CA')
  }, []);

  const handleLocationPermission = async () => {
    let permissionStatus;
    
    if (Platform.OS === 'ios') {
      console.log("Checking iOS location permission");
      permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      console.log("Checking Android location permission");
      permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    }
  
    console.log("Permission status:", permissionStatus);
  
    switch (permissionStatus) {
      case RESULTS.UNAVAILABLE:
        Alert.alert(
          'Location Unavailable',
          'This feature is not available on this device'
        );
        setLocationGranted(false);
        updateLocationSearch('Los Angeles, CA');
        break;
  
      case RESULTS.DENIED:
        // Permission has not been requested yet, so request it
        const result = await request(
          Platform.OS === 'ios'
            ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
            : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        );
        
        if (result === RESULTS.GRANTED) {
          setLocationGranted(true);
          getLocationAndSearch();
        } else {
          setLocationGranted(false);
          Alert.alert(
            'Permission Denied',
            'Location permission is required to show nearby places. Would you like to enable it in settings?',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Open Settings', onPress: openSettings }
            ]
          );
          updateLocationSearch('Los Angeles, CA');
        }
        break;
  
      case RESULTS.GRANTED:
        setLocationGranted(true);
        getLocationAndSearch();
        break;
  
      case RESULTS.BLOCKED:
        setLocationGranted(false);
        Alert.alert(
          'Permission Blocked',
          'Location permission is blocked. Please enable it in your device settings to use this feature.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: openSettings }
          ]
        );
        updateLocationSearch('Los Angeles, CA');
        break;
    }
  };
>>>>>>> dev

  const getLocationAndSearch = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setMapLatitude(latitude);
        setMapLongitude(longitude);
        Geocoder.from({ latitude, longitude })
          .then((response) => {
<<<<<<< HEAD
            updateLocationSearch(response.results[0]['address_components'][3]['short_name']);
          })
          .catch((error) => {
            console.log('error getting location: ', error);
=======
            const addressComponent = response.results[0].address_components.find(
              component => component.types.includes('locality')
            );
            updateLocationSearch(addressComponent ? addressComponent.short_name : 'Unknown Location');
          })
          .catch((error) => {
            console.log('Error getting location:', error);
            updateLocationSearch('Los Angeles, CA');
>>>>>>> dev
          });
        searchYelp(longitude, latitude);
      },
      (error) => {
        console.error('Error getting current position:', error);
        Alert.alert('Location Error', 'Unable to fetch your location. Using default location.');
        updateLocationSearch('Los Angeles, CA');
        searchYelp();
      },
<<<<<<< HEAD
      { enableHighAccuracy: true, timeout: 30000, maximumAge: 10000 }
    );
  };

  useEffect(() => {
    updateLocationSearch('Los Angeles, CA');
  }, [locationGranted]);

=======
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  
>>>>>>> dev
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
<<<<<<< HEAD
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
=======
                >
                {
                  yelpResults.map((property: any) => {
                    return(
                      <Marker 
                      pinColor='blue'
                      key={property.id}
                      coordinate={{
                        longitude: property.coordinates.longitude,
                        latitude: property.coordinates.latitude
                      }}
                      >
                        <Callout>
                          <View className='w-64'>
                            <PlaceTileMap place={property}/>
                          </View>
                        </Callout>
                      </Marker>
                    )
                  })
                }
              </MapView>
            </View>
      }
>>>>>>> dev
    </View>
  );
};

export default SearchScreen;