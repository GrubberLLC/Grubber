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
  media: string,
  media_type: string,
  name: string, 
  phone: string,
  place_id: string,
  post_id: string,
  price: string,
  rating: number,
  review_count: number,
  user_id: string,
  yelp_id: string,
  yelp_url: string,
}

const ExploreContext = createContext<ExploreContextType>({
  loadingPosts: false,
  allPosts: null,
  grabAllPosts: () => {}
});

interface ExploreContextType {
  loadingPosts: boolean;
  allPosts: SinglePostProps[] | null
  grabAllPosts: () => void
}

// the main provider
export const ExploreProvider: React.FC<ExploreProviderProps> = ({ children }) => {

  const [loadingPosts, setLoadingPosts] = useState<boolean>(false)
  const [allPosts, setAllPosts] = useState<SinglePostProps[] | null>(null)

  const grabAllPosts = () => {
    console.log('search all posts')
    setLoadingPosts(true)
    let url = `https://grubberapi.com/api/v1/posts`
    axios.get(url)
      .then(response => {
        console.log('results: ', response.data)
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
        loadingPosts,
        allPosts,
        grabAllPosts
      }}
    >
      {children}
    </ExploreContext.Provider>
  );
};