import React, { ReactNode, createContext, useContext, useState } from 'react';
import axios from 'axios';
import { YELP_API_KEY } from '../API/Authorizatgion';

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
  updateSearchTerm: () => {},
  updateLocationSearch: () => {},
  searchYelp: () => {},
  searchYelpFull: () => {},
  grabYelpSearchPosts: () => {}
});

interface SearchContextType {
  loadingPlaces: boolean;
  termSearch: string;
  locationSearch: string;
  yelpResults: any[];
  yelpResultsFull: any[]
  yelpResultsFullPosts: any[]
  updateSearchTerm: (text: string) => void;
  updateLocationSearch: (text:string) => void;
  searchYelp: () => void;
  searchYelpFull: (yelp_id: string) => void;
  grabYelpSearchPosts: (yelp_id: string) => void
}

// the main provider
export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {

  const [loadingPlaces, setLoadingPlaces] = useState<boolean>(false)
  const [termSearch, setSearchTermSearch] = useState<string>('') 
  const [locationSearch, setLocationSearch] = useState<string>('') 
  const [yelpResults, setYelpResults] = useState<any[]>([])
  const [yelpResultsFull, setYelpResultsFull] = useState<any[]>([])
  const [yelpResultsFullPosts, setYelpResultsFullPosts] = useState<any[]>([])

  const updateSearchTerm = (text:string) => {
    setSearchTermSearch(text)
  }

  const updateLocationSearch = (text: string) => {
    setLocationSearch(text)
  }

  const searchYelp = async () => {
    setLoadingPlaces(true)
    const yelpUrl = 'https://api.yelp.com/v3/businesses/search';
    const query = {
      term: termSearch,
      location: locationSearch,
      categories: 'restaurant',
    }; 
  
    try {
      const response = await axios.get(yelpUrl, {
        headers: {
          Authorization: `Bearer ${YELP_API_KEY}`,
        },
        params: query,
      });
      setYelpResults(response.data.businesses)
      setLoadingPlaces(false)
      return response.data;
    } catch (error) {
      setLoadingPlaces(false)
      console.error('Error fetching data from Yelp:', error);
    }
  };

  const searchYelpFull = async (yelp_id: string) => {
    setLoadingPlaces(true)

    const options = {
      method: 'GET',
      url: `https://api.yelp.com/v3/businesses/${yelp_id}`,
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
        accept: 'application/json'
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setYelpResultsFull(response.data)
        grabYelpSearchPosts(yelp_id)
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const grabYelpSearchPosts = async (yelp_id: string) => {
    let url = `https://grubberapi.com/api/v1/posts/yelp/${yelp_id}`
    axios.get(url)
      .then(function (response) {
        console.log('full yelp search: ', JSON.stringify(response.data))
        setYelpResultsFullPosts(response.data)
        setLoadingPlaces(false)
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
        updateSearchTerm,
        updateLocationSearch,
        searchYelp,
        searchYelpFull,
        grabYelpSearchPosts
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};