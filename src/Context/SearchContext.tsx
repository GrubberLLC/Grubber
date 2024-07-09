import React, { ReactNode, createContext, useContext, useState } from 'react';
import axios from 'axios';
import { YELP_API_KEY } from '../API/Authorizatgion.js';
import { useAuth } from './UserContext';

export function useSearch() {
  return useContext(SearchContext);
}

interface SearchProviderProps {
  children: ReactNode;
}

const SearchContext = createContext<SearchContextType>({
  loadingPlaces: false,
  termSearch: '',
  locationSearch: '',
  yelpResults: [],
  yelpResultsFull: [],
  yelpResultsFullPosts: [],
  mapView: 'list', 
  mapLongitude: 0, 
  mapLatitude: 0,
  setMapLatitude: () => {},
  setMapLongitude: () => {},
  setMapView: () => {},
  updateSearchTerm: () => {},
  updateLocationSearch: () => {},
  searchYelp: () => {},
  searchYelpFull: () => {},
  grabYelpSearchPosts: () => {},
  updateCurrentLocation: () => {}
});

interface SearchContextType {
  loadingPlaces: boolean;
  termSearch: string;
  locationSearch: string;
  yelpResults: any[];
  yelpResultsFull: any[];
  yelpResultsFullPosts: any[];
  mapView: string 
  mapLongitude: number, 
  mapLatitude: number, 
  setMapLatitude: (number: number) => void
  setMapLongitude: (number: number) => void
  setMapView: (text: string) => void
  updateSearchTerm: (text: string) => void;
  updateLocationSearch: (text: string) => void;
  searchYelp: (longitude?: number, latutide?: number) => void;
  searchYelpFull: (yelp_id: string) => void;
  grabYelpSearchPosts: (yelp_id: string) => void;
  updateCurrentLocation: (latitude: number, longitude: number) => void;
}

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const { userProfile } = useAuth();

  const [loadingPlaces, setLoadingPlaces] = useState<boolean>(false);
  const [termSearch, setSearchTermSearch] = useState<string>('');
  const [locationSearch, setLocationSearch] = useState<string>(userProfile && userProfile.location && userProfile.location != '' ? userProfile.location : 'Los Angeles');
  const [yelpResults, setYelpResults] = useState<any[]>([]);
  const [yelpResultsFull, setYelpResultsFull] = useState<any[]>([]);
  const [yelpResultsFullPosts, setYelpResultsFullPosts] = useState<any[]>([]);
  const [mapView, setMapView] = useState<string>('list')
  const [mapLongitude, setMapLongitude] = useState<number>(0)
  const [mapLatitude, setMapLatitude] = useState<number>(0)

  const updateSearchTerm = (text: string) => {
    setSearchTermSearch(text);
  };

  const updateLocationSearch = (text: string) => {
    setLocationSearch(text);
  };

  const updateCurrentLocation = (latitude: number, longitude: number) => {
    setLocationSearch(`${latitude},${longitude}`);
  };

  const searchYelp = async (longitude?: number, latutide?: number) => {
    setLoadingPlaces(true);
    const yelpUrl = 'https://api.yelp.com/v3/businesses/search';
    let query: any
    if(!longitude && !latutide){
      query = {
        term: termSearch,
        location: locationSearch,
        categories: 'restaurant',
      };
    } else {
      query = {
        term: termSearch,
        latitude: latutide,
        longitude: longitude,
        categories: 'restaurant',
      };
    }

    try {
      const response = await axios.get(yelpUrl, {
        headers: {
          Authorization: `Bearer ${YELP_API_KEY}`,
        },
        params: query,
      });
      console.log('yelp results: ', JSON.stringify(response.data.businesses))
      setYelpResults(response.data.businesses);
      setLoadingPlaces(false);
      return response.data;
    } catch (error) {
      setLoadingPlaces(false);
      console.error('Error fetching data from Yelp:', error);
    }
  };

  const searchYelpFull = async (yelp_id: string) => {
    setLoadingPlaces(true);

    const options = {
      method: 'GET',
      url: `https://api.yelp.com/v3/businesses/${yelp_id}`,
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
        accept: 'application/json',
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setYelpResultsFull(response.data);
        grabYelpSearchPosts(yelp_id);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const grabYelpSearchPosts = async (yelp_id: string) => {
    let url = `https://grubberapi.com/api/v1/posts/yelp/${yelp_id}`;
    axios
      .get(url)
      .then(function (response) {
        setYelpResultsFullPosts(response.data);
        setLoadingPlaces(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <SearchContext.Provider
      value={{
        loadingPlaces,
        termSearch,
        locationSearch,
        yelpResults,
        yelpResultsFull,
        yelpResultsFullPosts,
        mapView, 
        mapLongitude, 
        mapLatitude, 
        setMapLatitude,
        setMapLongitude,
        setMapView,
        updateSearchTerm,
        updateLocationSearch,
        searchYelp,
        searchYelpFull,
        grabYelpSearchPosts,
        updateCurrentLocation,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
