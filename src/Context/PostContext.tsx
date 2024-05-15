import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { confirmSignUp, getCurrentUser, resendSignUpCode, resetPassword, signIn, signOut, signUp } from 'aws-amplify/auth';
import axios from 'axios';
import { YELP_API_KEY } from '../API/Authorizatgion';
import { uploadData } from 'aws-amplify/storage';
import { useAuth } from './UserContext';

export function usePost() {
  return useContext(PostContext);
}

interface PostProviderProps {
  children: ReactNode;
}

interface PictureProps {
  uri: string,
  fileName: string,
  fileType: string
}

interface PlaceProps {
  image: string,
  name: string,
  phone: string,
  price: string,
  rating: number,
  review_count: number,
  closed: boolean,
  yelp_url: string,
  yelp_id: string,
  longitude: number,
  latitude: number,
  address_street: string,
  address_city: string,
  address_state: string,
  address_zip_code: string,
  address_formatted: string
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

const PostContext = createContext<PostContextType>({
  postPicture: {
    uri: '',
    fileName: '',
    fileType: ''
  },
  postCaption: '',
  postSearchLoading: false,
  postSearchResults: [],
  place: '',
  location: '',
  postPlace: null,
  createPostLoading: false,
  loggedInUsersPosts: null,
  searchingPlaces: false,
  updatePlace: () => {},
  updateLocation:  () => {},
  updateCaption: () => {},
  updatePicture: () => {},
  searchYelp: () => {},
  updatePostPlace: () => {},
  createPost: () => {},
  getUsersPosts: () => {},
  handleSetSearchingPlaces: () => {}
});

interface PostContextType {
  postPicture: PictureProps | null;
  postCaption: string;
  postSearchLoading: boolean;
  postSearchResults: any[];
  place: string,
  location: string,
  postPlace: PlaceProps | null;
  createPostLoading: boolean;
  loggedInUsersPosts: SinglePostProps[] | null;
  searchingPlaces: boolean;
  updatePlace: (text:string) => void,
  updateLocation:  (text:string) => void,
  updateCaption: (text: string) => void;
  updatePicture: (picture: PictureProps) => void;
  searchYelp: () => void;
  updatePostPlace: (place: PlaceProps) => void;
  createPost: (navigation: any) => void;
  getUsersPosts: (user_id: string) => void;
  handleSetSearchingPlaces: () => void;
}

// the main provider
export const PostProvider: React.FC<PostProviderProps> = ({ children }) => {
  const {userProfile} = useAuth()
  
  const [postPicture, setPostPicture] = useState<PictureProps | null>(null)
  const [postPictureUrl, setPostPictureUrl] = useState()
  const [postCaption, setPostCaption] = useState<string>('')
  const [postPlace, setPostPlace] = useState<PlaceProps | null>(null)
  const [postList, setPostList] = useState()

  const [postSearchResults, setPostSearchResults] = useState<any[]>([])
  const [postSearchLoading, setPostSearchLoading] = useState<boolean>(false)

  const [createPostLoading, setCreatePostLoading] = useState<boolean>(false)

  const [place, setPlace] = useState<string>('')
  const [location, setLocation] = useState<string>('')
  const [searchingPlaces, setSearchingPlaces] = useState<boolean>(false)

  const [loggedInUsersPosts, setLoggedInUserPosts] = useState<SinglePostProps[] | null>([])

  useEffect(() => {
    userProfile && userProfile.user_id != ''
      ? getUsersPosts(userProfile.user_id)
      : null
  }, [userProfile])

  const updatePlace = (text:string) => {
    setPlace(text)
  }

  const updateLocation = (text:string) => {
    setLocation(text)
  }

  const updateCaption = (text: string) => {
    setPostCaption(text)
  }

  const updatePicture = (picutre: PictureProps) => {
    setPostPicture(picutre)
  }

  const updatePostPlace = (place: PlaceProps) => {
    setPostPlace(place)
  }

  const handleSetSearchingPlaces = () => {
    setSearchingPlaces(true)
    searchYelp()
  }

  const getUsersPosts = (user_id: string) => {
    let url = `https://grubberapi.com/api/v1/posts/user/${user_id}`
    axios.get(url)
      .then(response => {
        console.log('users posts list: ', response.data)
        setLoggedInUserPosts(response.data)
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        throw error;
      });
  }

 

  const searchYelp = async () => {
    setPostSearchLoading(true)
    const yelpUrl = 'https://api.yelp.com/v3/businesses/search';
    const query = {
      term: place,
      location: location,
      categories: 'restaurant',
    }; 
  
    try {
      const response = await axios.get(yelpUrl, {
        headers: {
          Authorization: `Bearer ${YELP_API_KEY}`,
        },
        params: query,
      });
      setPostSearchResults(response.data.businesses)
      setPostSearchLoading(false)
      setSearchingPlaces(false)
      return response.data;
    } catch (error) {
      setPostSearchLoading(false)
      console.error('Error fetching data from Yelp:', error);
    }
  };

  const createPost = (navigation: any) => {
    console.log('places place_id: ', postPlace?.yelp_id)
    setCreatePostLoading(true)
    let url = `https://grubberapi.com/api/v1/places/check/${postPlace?.yelp_id}`
    axios.get(url)
      .then(response => {
        console.log('response data from place add: ', response.data)
        response.data.length > 0
          ? uploadImage(response.data[0]['place_id'], navigation)
          : postPlace != null 
              ? addPlace(postPlace, navigation)
              : null
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        throw error;
      });
    // check if the place id is in places
        // yes: create post
        // no: add to place => create post
  };

  const addPlace = (postPlace: PlaceProps, navigation: any) => {
    console.log('adding a new place')
    let url = `https://grubberapi.com/api/v1/places`
    axios.post(url, postPlace)
      .then(response => {
        console.log('added place: ', response.data)
        uploadImage(response.data[0]['place_id'], navigation)
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        throw error;
      });
  }

  const uploadImage = (place_id: number, navigation: any) => {
    postPicture
      ? fetch(postPicture.uri)
          .then(response => response.blob()) // Correctly wait for blob
          .then(blob => {
              startUploading(blob, place_id, navigation);
          })
          .catch(error => {
              console.error("Error fetching blob:", error);
          })
      : null
  }

  const startUploading = async (blob: any, place_id: number, navigation: any) => {
    try {
        const fileName = blob._data.name || `file-${Date.now()}`;
        const fileType = blob._data.type || 'image/jpeg'; // Default type if not specified
        const folderName = "PostMedia";

        const fileKey = `${folderName}/${fileName}`;

        const result = await uploadData({
            key: fileKey,
            data: blob,
            options: {
              accessLevel: 'guest',
              contentType: fileType,  // Set Content-Type metadata
            }
        }).result

        const uploadedImage = `https://grubber-mobile-storage-8be2b031175523-staging.s3.us-west-1.amazonaws.com/public/${result.key}`;
        const newPost = {
          media: uploadedImage,
          media_type: fileType,
          user_id:  userProfile?.user_id,
          caption: postCaption, 
          place_id: place_id
        }
        console.log('post data: ', newPost)

        let url = `https://grubberapi.com/api/v1/posts`
        axios.post(url, newPost)
          .then(response => {
            console.log(response.data)
            setCreatePostLoading(false)
            navigation.navigate('FeedScreen')
          })
          .catch(error => {
            console.error('Error fetching profile:', error);
            throw error;
          });
        // Optionally, call a function to save this URL to your database
        // saveToDatabase(uploadedImage, place_id, fileType);
    } catch (error) {
        console.error("Error uploading file:", error);
    }
}

  return ( 
    <PostContext.Provider
      value={{
        postPicture,
        postCaption,
        postSearchLoading,
        postSearchResults,
        postPlace,
        place,
        location,
        createPostLoading,
        loggedInUsersPosts,
        searchingPlaces,
        updatePlace,
        updateLocation,
        updateCaption,
        updatePicture,
        updatePostPlace,
        searchYelp,
        createPost,
        getUsersPosts,
        handleSetSearchingPlaces
      }}
    >
      {children}
    </PostContext.Provider>
  );
};