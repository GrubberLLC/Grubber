import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { YELP_API_KEY } from '../API/Authorizatgion';
import { useAuth } from './UserContext';
import { list, uploadData } from 'aws-amplify/storage';

export function useList() {
  return useContext(ListContext);
}

interface PictureProps {
  uri: string,
  fileName: string,
  fileType: string
}

interface MemberProps {
  bio: string,
  created_at: string,
  email: string,
  first_name: string,
  followers: number,
  following: number,
  full_name: string,
  last_name: string,
  list_id: number,
  location: string,
  member_id: number,
  nuckname: string,
  notifications: boolean,
  phone: string,
  profile_id: string,
  profile_picture: string,
  public: boolean,
  sent_request: string,
  status: string,
  type: string,
  user_id: string,
  username: string
}

interface UserProfile {
  user_id: string;
  username: string;
  email: string;
  phone: string,
  location: string;
  first_name: string;
  last_name: string;
  full_name: string;
  profile_picture: string | null;
  bio: string | null;
  public: number;
  followers: number;
  following: number;
  notifications: boolean;
}

interface ListProviderProps {
  children: ReactNode;
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

const ListContext = createContext<ListContextType>({
  listPicture: null,
  listName: '',
  listDescription: '',
  selectgedUsers: [],
  currentlyUploading: false,
  userLists: [],
  search: '',
  location: '',
  yelpResults: [],
  selectedPlace: null,
  loadingResults: false,
  placesInSelectList: [],
  listMembers: [],
  loadingListMembers: false,
  addMember: false, 
  listPublic: false,
  selectedUserLists: [],
  handleAddMember: () => {},
  updatePicture: () => {},
  updateListName: () => {},
  updateListDescription: () => {},
  handleUpdateSelectedUsers: () => {},
  createList: () => {},
  getUserLists: () => {},
  checkPlace: () => {},
  updateSearch: () => {},
  updateLocation: () => {},
  searchYelp: () => {},
  updateSelectedPlace: () => {},
  getListPlaces: () => {},
  getAllListMembers: () => { },
  removeMemberFromList: () => {},
  addSelectedMembers: () => {},
  addSelectedMembersList: () => {},
  updateListPublic: () => {},
  getSelectedUserLists: () => {}
});

interface ListContextType {
  listPicture: PictureProps | null
  listName: string
  listDescription: string
  selectgedUsers: UserProfile[]
  currentlyUploading: boolean
  userLists: any
  search: string,
  location: string,
  yelpResults: any[],
  selectedPlace: any,
  loadingResults: boolean
  placesInSelectList: any[]
  listMembers: MemberProps[]
  loadingListMembers: boolean
  addMember: boolean
  listPublic: boolean
  selectedUserLists: any
  handleAddMember: () => void
  updatePicture: (picture: PictureProps) => void
  updateListName: (text: string) => void
  updateListDescription: (text: string) => void
  handleUpdateSelectedUsers: (user: UserProfile) => void
  createList: (navigation: any) => void
  getUserLists: (user_id: string) => void
  checkPlace: (place_id: string, list_id: string, navigation: any, list: any) => void
  updateSearch: (text: string) => void
  updateLocation: (text: string) => void
  searchYelp: () => void
  updateSelectedPlace: (place: PlaceProps) => void
  getListPlaces: (place_list_id: number) => void
  getAllListMembers: (list_id: number) => void
  removeMemberFromList: (member_id: number, list_id: number) => void
  addSelectedMembers: (list_id: string, navigation: any) => void
  addSelectedMembersList: (list_id: number, navigation: any, list: any) => void
  updateListPublic: () => void
  getSelectedUserLists: (user_id: string) => void
}

// the main provider
export const ListProvider: React.FC<ListProviderProps> = ({ children }) => {
  const {userProfile} = useAuth()

  const [listPicture, setListPicture] = useState<PictureProps | null>(null)
  const [listName, setListName] = useState<string>('')
  const [listDescription, setListDescription] = useState<string>('')
  const [listPublic, setListPublic] = useState<boolean>(false)
  const [currentlyUploading, setCurrentlyUploading] = useState<boolean>(false)

  const [selectgedUsers, setSelectedUsers] = useState<UserProfile[]>([])
  const [userLists, setUserLists] = useState<any>([])

  const [term, setTerm] = useState<string>('')

  const [search, setSearch] = useState<string>('')
  const [location, setLocation] = useState<string>('')
  const [yelpResults, setYelpResults] = useState<any[]>([])
  const [selectedPlace, setSelectedPlace] = useState<any>(null)

  const [loadingResults, setLoadingResults] = useState<boolean>(false)

  const [placesInSelectList, setPlacesInSelectList] = useState<any[]>([])

  const [listMembers, setListMembers] = useState<MemberProps[]>([])
  const [loadingListMembers, setLoadingListMembers] = useState<boolean>(false)

  const [addMember, setAddMember] = useState<boolean>(false);

  const [selectedUserLists, setSelectedUserLIsts] = useState<any>([])

  const handleAddMember = () => {
    setAddMember(!addMember)
  }

  useEffect(() => {
    console.log('selected users: ', selectgedUsers)
  }, [selectgedUsers])

  const updatePicture = (picutre: PictureProps) => {
    setListPicture(picutre)
  }

  const updateListPublic = () => {
    setListPublic(!listPublic)
  }

  const updateListName = (text: string) => {
    setListName(text)
  }

  const updateListDescription = (text: string) => {
    setListDescription(text)
  }

  const updateSearchTerm = (text: string) => {
    setTerm(text)
    searchNameInLists(text)
  }

  const updateSearch = (text: string) => {
    setSearch(text)
  }

  const updateLocation = (text: string) => {
    setLocation(text)
  }

  const updateSelectedPlace = (place: PlaceProps) => {
    setSelectedPlace(place)
  }

  const handleUpdateSelectedUsers = (user: UserProfile) => {
    setSelectedUsers((prevSelectedUsers) => {
      const isUserSelected = prevSelectedUsers.some(
        (selectedUser) => selectedUser.user_id === user.user_id
      );

      if (isUserSelected) {
        // Remove the user from the array
        return prevSelectedUsers.filter(
          (selectedUser) => selectedUser.user_id !== user.user_id
        );
      } else {
        // Add the user to the array
        return [...prevSelectedUsers, user];
      }
    });
  }

  const createList = (navigation: any) => {
    setCurrentlyUploading(true)
    listPicture
      ? fetch(listPicture.uri)
          .then(response => response.blob()) // Correctly wait for blob
          .then(blob => {
              startUploading(blob, navigation);
          })
          .catch(error => {
              console.error("Error fetching blob:", error);
          })
      : null
  }

  const getUserLists = (user_id: string) => {
    let url = `https://grubberapi.com/api/v1/lists/user/${user_id}`
    axios.get(url)
      .then(response => {
        setUserLists(response.data)
      })
      .catch(error => {
        console.error('Error add first member:', error);
        throw error;
      });
  }

  const checkPlace = (place_id: string, list_id: string, navigation: any, list: any) => {
    let url = `https://grubberapi.com/api/v1/places/check/${place_id}`
    axios.get(url)
      .then(response => {
        response.data.length > 0
          ? addPlaceToList(response.data[0]['place_id'], list_id, navigation, list)
          : addPlace(place_id, list_id, navigation, list)
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        throw error;
      });
  }

  const addPlaceToList = (place_id: string, list_id: string, navigation: any, list: any) => {
    const placeBody = {
      place_id: place_id,
      list_id: list_id
    }
    let url = `https://grubberapi.com/api/v1/placeinlist`
    axios.post(url, placeBody)
      .then(response => {
        // setUserLists(refsponse.data)
        navigation.navigate('ListDetailsScreen', {list: list})
      })
      .catch(error => {
        console.error('Error add first member:', error);
        throw error;
      });
  }

  const addPlace = (place_id: string, list_id: string, navigation: any, list: any) => {
    let url = `https://grubberapi.com/api/v1/places`
    axios.post(url, selectedPlace)
      .then(response => {
        addPlaceToList(response.data[0]['place_id'], list_id, navigation, list)
      })
      .catch(error => {
        console.error('Error add first member:', error);
        throw error;
      });
  }

  const searchYelp = async () => {
    setLoadingResults(true)
    const yelpUrl = 'https://api.yelp.com/v3/businesses/search';
    const query = {
      term: search,
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
      setYelpResults(response.data.businesses)
      setLoadingResults(false)
      return response.data;
    } catch (error) {
      setLoadingResults(false)
      console.error('Error fetching data from Yelp:', error);
    }
  };

  const getListPlaces = (list_id: number) => {
    let url = `https://grubberapi.com/api/v1/placeinlist/${list_id}`
    axios.get(url)
      .then(response => {
        console.log('list place: ', response.data)
        setPlacesInSelectList(response.data)
      })
      .catch(error => {
        console.error('Error add first member:', error);
        throw error;
      });
  }

  const searchNameInLists = (text: string) => {
    if(userLists && userLists.length > 0){

    }
  }

  const startUploading = async (blob: any, navigation: any) => {
    const fileName = blob._data.name || `file-${Date.now()}`;
    const fileType = blob._data.type || 'image/jpeg'; // Default type if not specified
    const folderName = "ListMedia";

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
    const listData = {
      user_id: userProfile?.user_id,
      name: listName, 
      description: listDescription, 
      picture: uploadedImage, 
      public: 1, 
      last_activity: `${userProfile?.username} create ${listName}`, 
      created_by: userProfile?.user_id 
    }
    let url = `https://grubberapi.com/api/v1/lists`
    axios.post(url, listData)
      .then(response => {
        addCreatedMember(response.data[0]['list_id'], navigation)
      })
      .catch(error => {
        console.error('Error creating list:', error);
        throw error;
      });
  }

  const addCreatedMember = (list_id: string, navigation: any) => {
    const memberData = {
      user_id: userProfile?.user_id, 
      list_id: list_id, 
      status: 'active', 
      type: 'owner', 
      sent_request: userProfile?.user_id
    }
    let url = `https://grubberapi.com/api/v1/members`
    axios.post(url, memberData)
      .then(response => {
        addSelectedMembers(list_id, navigation)
        // setCurrentlyUploading(false)
        // navigation.navigate('ListsScreen')
      })
      .catch(error => {
        console.error('Error add first member:', error);
        throw error;
      });
  }

  const addSelectedMembers = (list_id: string, navigation: any) => {
    if(selectgedUsers.length > 0){
      selectgedUsers.map((user) => {
        const memberData = {
          user_id: user.user_id, 
          list_id: list_id, 
          status: 'pending', 
          type: 'member', 
          sent_request: userProfile?.user_id
        }
        let url = `https://grubberapi.com/api/v1/members`
        axios.post(url, memberData)
          .then(response => {
          })
          .catch(error => {
            console.error('Error add first member:', error);
            throw error;
          });
      })
    }
    
    setCurrentlyUploading(false)
    navigation.navigate('ListsScreen')
    
  }

  const addSelectedMembersList = (list_id: number, navigation: any, list: any) => {
    if(selectgedUsers.length > 0){
      selectgedUsers.map((user) => {
        const memberData = {
          user_id: user.user_id, 
          list_id: list_id, 
          status: 'pending', 
          type: 'member', 
          sent_request: userProfile?.user_id
        }
        let url = `https://grubberapi.com/api/v1/members`
        axios.post(url, memberData)
          .then(response => {
            
          })
          .catch(error => {
            console.error('Error add first member:', error);
            throw error;
          });
      })
    }
    
    setCurrentlyUploading(false)
    getAllListMembers(list_id)
    handleAddMember()
  }

  const getAllListMembers = (list_id: number) => {
    setLoadingListMembers(true)
    let url = `https://grubberapi.com/api/v1/members/list/${list_id}`
    axios.get(url)
      .then(response => {
        console.log('list members: ', response.data)
        setListMembers(response.data)
        setLoadingListMembers(false)
      })
      .catch(error => {
        setLoadingListMembers(false)
        console.error('Error add first member:', error);
        throw error;
      });
  }

  const removeMemberFromList = (member_id: number, list_id: number) => {
    let url = `https://grubberapi.com/api/v1/members/${member_id}`
    axios.delete(url)
      .then(response => {
        console.log('list members: ', response.data)
        getAllListMembers(list_id)
      })
      .catch(error => {
        console.error('Error add first member:', error);
        throw error;
      });
  }

  const getSelectedUserLists = (user_id: string) => {
    let url = `https://grubberapi.com/api/v1/lists/user/${user_id}`
    axios.get(url)
      .then(response => {
        setSelectedUserLIsts(response.data)
      })
      .catch(error => {
        console.error('Error add first member:', error);
        throw error;
      });
  }

  return (
    <ListContext.Provider
      value={{
        listPicture,
        listName,
        listDescription,
        selectgedUsers,
        currentlyUploading,
        userLists,
        search,
        location,
        yelpResults,
        selectedPlace,
        loadingResults,
        placesInSelectList,
        listMembers,
        loadingListMembers,
        addMember, 
        listPublic,
        selectedUserLists,
        handleAddMember,
        updatePicture,
        updateListName,
        updateListDescription,
        handleUpdateSelectedUsers,
        createList,
        getUserLists,
        checkPlace,
        updateSearch,
        updateLocation,
        searchYelp,
        updateSelectedPlace,
        getListPlaces,
        getAllListMembers,
        removeMemberFromList,
        addSelectedMembers,
        addSelectedMembersList,
        updateListPublic,
        getSelectedUserLists
      }}
    >
      {children}
    </ListContext.Provider>
  );
};