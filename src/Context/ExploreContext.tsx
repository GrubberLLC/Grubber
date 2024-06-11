import React, { createContext, useContext, ReactNode, useState } from 'react';
import { confirmSignUp, getCurrentUser, resendSignUpCode, resetPassword, signIn, signOut, signUp } from 'aws-amplify/auth';
import axios from 'axios';

export function useExplore() {
  return useContext(ExploreContext);
}

interface ExploreProviderProps {
  children: ReactNode;
}

interface SinglePostProps {
  media: string,
  media_type: string,
  user_id: string,
  created_at: string,
  caption: string,
  place_id: string,
  post_id: string,
  name: string,
  phone: string,
  price: string,
  rating: number,
  review_count: number,
  closed: boolean,
  yelp_url: string,
  yelp_id: string,
  address_street: string,
  address_city: string,
  address_state: string,
  address_zip_code: string,
  image: string,
  longitude: number,
  latitude: number,
  address_formatted: string,
  username: string,
  first_name: string,
  last_name: string,
  full_name: string,
  nickname: string,
  email: string,
  location: string,
  profile_picture: string,
  bio: string,
  public: boolean,
  notifications: boolean,
  followers: number,
  following: number,
  profile_id: string
}

interface SinglePlaceProps {
  address_city: string,
  address_formatted: string,
  address_state: string, 
  address_street: string,
  address_zip_code: string,
  caption: string | null,
  closed: boolean,
  created_at: string,
  image: string,
  latitude: string,
  longitude: string,
  name: string, 
  phone: string,
  place_id: string,
  price: string,
  rating: number,
  review_count: number,
  yelp_id: string,
  yelp_url: string,
}

const ExploreContext = createContext<ExploreContextType>({
  loadingPlace: false,
  loadingPosts: false,
  placePosts: null,
  allPosts: null,
  selectedPlace: null,
  grabPlaceById: () => {},
  grabTotalPosts: () => {}
});

interface ExploreContextType {
  loadingPlace: boolean;
  loadingPosts: boolean
  placePosts: SinglePostProps[] | null
  allPosts: SinglePostProps[] | null
  selectedPlace: SinglePlaceProps | null
  grabPlaceById: (place_id: string) => void
  grabTotalPosts: () => void
}

// the main provider
export const ExploreProvider: React.FC<ExploreProviderProps> = ({ children }) => {

  const [loadingPlace, setLoadingPlace] = useState<boolean>(false)
  const [placePosts, setPlacePosts] = useState<SinglePostProps[] | null>(null)
  const [selectedPlace, setSelectedPlace] = useState<SinglePlaceProps | null>(null)

  const [loadingPosts, setLoadingPosts] = useState<boolean>(false)
  const [allPosts, setAllPosts] = useState<SinglePostProps[] | null>(null)

  const grabPlaceById = (place_id: string) => {
    setLoadingPlace(true)
    let url = `https://grubberapi.com/api/v1/places/${place_id}`
    axios.get(url)
      .then(response => {
        setSelectedPlace(response.data)
        grabAllPosts(place_id)
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        throw error;
      });
  }

  const grabAllPosts = (place_id: string) => {
    console.log('search all posts')
    let url = `https://grubberapi.com/api/v1/posts/place/${place_id}`
    axios.get(url)
      .then(response => {
        setPlacePosts(response.data)
        setLoadingPlace(false)
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        throw error;
      });
  };

  const grabTotalPosts = () => {
    console.log('search all posts')
    setLoadingPosts(true)
    let url = `https://grubberapi.com/api/v1/posts`
    axios.get(url)
      .then(response => {
        setAllPosts(response.data)
        setLoadingPosts(false)
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        throw error;
      });
  };
  
  return (
    <ExploreContext.Provider
      value={{
        loadingPlace,
        loadingPosts,
        placePosts,
        allPosts,
        selectedPlace,
        grabPlaceById,
        grabTotalPosts
      }}
    >
      {children}
    </ExploreContext.Provider>
  );
};