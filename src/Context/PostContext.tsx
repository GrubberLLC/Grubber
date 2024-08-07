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

interface LikesProps {
  created_at: string,
  like_id: number,
  post_id: number,
  user_id: string
}

interface PlaceProps {
  image?: string,
  name?: string,
  phone?: string,
  price?: string,
  rating?: number,
  review_count?: number,
  closed?: boolean,
  yelp_url?: string,
  yelp_id?: string,
  longitude?: number,
  latitude?: number,
  address_street?: string,
  address_city?: string,
  address_state?: string,
  address_zip_code?: string,
  address_formatted?: string
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

interface CommentPropsd {
  bio: string,
  comment: string,
  comment_id: number,
  created_at: string,
  email: string,
  first_name: string,
  followers: number,
  following: number,
  full_name: string,
  last_name: string,
  location: string,
  nickname: string,
  notifications: boolean,
  phone: string,
  post_id: number,
  profile_id: string,
  profile_picture: string,
  public: boolean,
  user_id: string,
  username: string
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
  postComments: null,
  postLikes: null,
  selectedPlace: null,
  addPlaceList: false,
  selectedUserPosts: [],
  editPost: false,
  updatedCaption: '',
  loadingUpdatePost: false,
  updatePlace: () => {},
  updateLocation:  () => {},
  updateCaption: () => {},
  updatePicture: () => {},
  searchYelp: () => {},
  updatePostPlace: () => {},
  createPost: () => {},
  getUsersPosts: () => {},
  handleSetSearchingPlaces: () => {},
  createPostComment: () => {},
  grabPostComments: () => {},
  deletePost: () => {},
  getPlaceById: () => {},
  handleAddPlaceList: () => {},
  getSelectedUserPosts: () => {},
  toggleEditPOst: () => {},
  updateCurrentCaption: () => {},
  updatePostCaption: () => {}
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
  postComments: CommentPropsd[] | null;
  postLikes: LikesProps[] | null;
  selectedPlace: any;
  addPlaceList: boolean
  selectedUserPosts: SinglePostProps[]
  editPost: boolean,
  updatedCaption: string,
  loadingUpdatePost: boolean
  updatePlace: (text:string) => void,
  updateLocation:  (text:string) => void,
  updateCaption: (text: string) => void;
  updatePicture: (picture: PictureProps) => void;
  searchYelp: () => void;
  updatePostPlace: (place: PlaceProps) => void;
  createPost: (navigation: any, user_id: string) => void;
  getUsersPosts: (user_id: string) => void;
  handleSetSearchingPlaces: () => void;
  createPostComment: (post: any, comment: string, user_id: string, fcmtoken: string) => void;
  grabPostComments: (post_id: string) => void;
  deletePost: (post_id: string, navigation: any) => void;
  getPlaceById: (place_id: string) => void;
  handleAddPlaceList: () => void
  getSelectedUserPosts: (user_id: string) => void
  toggleEditPOst: () => void
  updateCurrentCaption: (text: string) => void
  updatePostCaption: (post: any, navigation: any) => void
}

// the main provider
export const PostProvider: React.FC<PostProviderProps> = ({ children }) => {
  const {userProfile, generateNotification} = useAuth()
  
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

  const [postComments, setPostComments] = useState<CommentPropsd[] | null>(null)

  const [postLikes, setPostLikes] = useState<LikesProps[] | null>(null)

  const [selectedPlace, setSelectedPlaCe] = useState<any>()
  const [addPlaceList, setAddPlaceList] = useState<boolean>(false)

  const [selectedUserPosts, setSelectedUserPosts] = useState<SinglePostProps[]>([])

  const [editPost, setEditPost] = useState<boolean>(false)

  const [loadingUpdatePost, setLoadingUpdatePost] = useState<boolean>(false)
  const [updatedCaption, setUpdatedCaption] = useState<string>('')

  useEffect(() => {
    userProfile && userProfile.user_id != ''
      ? getUsersPosts(userProfile.user_id)
      : null
  }, [userProfile])

  const toggleEditPOst = () => {
    setEditPost(!editPost)
  }

  const updateCurrentCaption = (text:string) => {
    setUpdatedCaption(text)
  }

  const handleAddPlaceList = () => {
    setAddPlaceList(!addPlaceList)
  }

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

        setLoggedInUserPosts(response.data)
      })
      .catch(error => {
        console.error('Error fetching user posts:', error);
        throw error;
      });
  }

  const getPlaceById = (place_id: string) => {
    let url = `https://grubberapi.com/api/v1/places/check/${place_id}`
    axios.get(url)
      .then(response => {
        setSelectedPlaCe(response.data)
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

  const createPost = (navigation: any, user_id: string) => {
    setCreatePostLoading(true)
    let url = `https://grubberapi.com/api/v1/places/check/${postPlace?.yelp_id}`
    axios.get(url)
      .then(response => {
        response.data.length > 0
          ? uploadImage(response.data[0]['place_id'], navigation, user_id)
          : postPlace != null 
              ? addPlace(postPlace, navigation, user_id)
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

  const deletePost = (post_id: string, user_id: string) => {
    let url = `https://grubberapi.com/api/v1/posts/${post_id}`
    axios.delete(url)
      .then(response => {
        getUsersPosts(user_id)
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        throw error;
      });
  };

  const addPlace = (postPlace: PlaceProps, navigation: any, user_id: string) => {
    let url = `https://grubberapi.com/api/v1/places`
    axios.post(url, postPlace)
      .then(response => {
        uploadImage(response.data[0]['place_id'], navigation, user_id)
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        throw error;
      });
  }

  const uploadImage = (place_id: number, navigation: any, user_id: string) => {
    postPicture
      ? fetch(postPicture.uri)
          .then(response => response.blob()) // Correctly wait for blob
          .then(blob => {
              startUploading(blob, place_id, navigation, user_id);
          })
          .catch(error => {
              console.error("Error fetching blob:", error);
          })
      : null
  }

  const startUploading = async (blob: any, place_id: number, navigation: any, user_id: string) => {
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
          place_id: place_id,
          yelp_id: postPlace?.yelp_id
        }

        let url = `https://grubberapi.com/api/v1/posts`
        axios.post(url, newPost)
          .then(response => {
            setCreatePostLoading(false)
            getUsersPosts(user_id)
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

  const createPostComment = (post: any, comment: string, user_id: string, fcmtoken: string) => {
    console.log('post to create: ', post)
    setCreatePostLoading(true)
    const newData = {
      post_id: post.post_id,
      comment: comment,
      user_id: user_id,
    }
    let url = `https://grubberapi.com/api/v1/postComments`
    axios.post(url, newData)
      .then(response => {
        grabPostComments(post.post_id)
        setCreatePostLoading(false)
        generateNotification(fcmtoken, 'New Comment', `${userProfile?.username} commented on your post`, post.image)
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        throw error;
      });
  };

  const grabPostComments = (post_id: string) => {
    let url = `https://grubberapi.com/api/v1/postComments/${post_id}`
    axios.get(url)
      .then(response => {
        setPostComments(response.data)
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        throw error;
      });
  }

  const getSelectedUserPosts = (user_id: string) => {
    let url = `https://grubberapi.com/api/v1/posts/user/${user_id}`
    axios.get(url)
      .then(response => {
        setSelectedUserPosts(response.data)
      })
      .catch(error => {
        console.error('Error fetching user posts:', error);
        throw error;
      });
  }

  const updatePostCaption = (post: any, navigation: any) => {
    setLoadingUpdatePost(true)
    const data = {
      media: post.media, 
      media_type: post.media_type, 
      user_id: post.user_id, 
      place_id: post.place_id,
      caption: updatedCaption
    }
    console.log(data)
    let url = `https://grubberapi.com/api/v1/posts/${post.post_id}`
    axios.put(url, data)
      .then(response => {
        getUsersPosts(userProfile ? userProfile.user_id : '')
        navigation.navigate('ProfileScreen')
        setLoadingUpdatePost(false)
      })
      .catch(error => {
        console.error('Error fetching user posts:', error);
        setLoadingUpdatePost(false)
        throw error;
      });
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
        postComments,
        postLikes,
        selectedPlace,
        addPlaceList,
        selectedUserPosts,
        editPost,
        updatedCaption,
        loadingUpdatePost,
        createPostComment,
        updatePlace,
        updateLocation,
        updateCaption,
        updatePicture,
        updatePostPlace,
        searchYelp,
        createPost,
        getUsersPosts,
        handleSetSearchingPlaces,
        grabPostComments,
        deletePost,
        getPlaceById,
        handleAddPlaceList,
        getSelectedUserPosts,
        toggleEditPOst,
        updateCurrentCaption,
        updatePostCaption
      }}
    >
      {children}
    </PostContext.Provider>
  );
};