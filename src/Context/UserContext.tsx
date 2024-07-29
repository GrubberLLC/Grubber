import React, { createContext, useContext, ReactNode, useState, ProfilerProps, useEffect } from 'react';
import { confirmResetPassword, confirmSignUp, getCurrentUser, resendSignUpCode, resetPassword, signIn, signOut, signUp } from 'aws-amplify/auth';
import axios from 'axios';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import messaging from '@react-native-firebase/messaging';
import { Alert, Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Geocoder from 'react-native-geocoding';
import { GOOGLE_API } from '../API/Authorizatgion';
import { Text, View, PermissionsAndroid, TouchableOpacity } from 'react-native';


export function useAuth() {
  return useContext(AuthContext);
}

interface AuthProviderProps {
  children: ReactNode;
}

interface UserAccount {
  username: string | null;
  email: string | null;
  userId: string | null;
}

interface PictureProps {
  uri: string,
  fileType: string,
  fileName: string
}

interface SignupAttributesObject {
  email: string, 
  given_name: string,
  family_name: string,
  nickname: string,
  name: string,
  locale: string,
  preferred_username: string
}

interface SignupOptionsObject {
  userAttributes: SignupAttributesObject
}

interface SignupObject {
  username: string,
  password: string,
  email: string, 
  phone: string,
  given_name: string,
  family_name: string,
  nickname: string,
  name: string,
  locale: string,
  preferred_username: string,
  bio: string,
  profile_picture: string,
  public: boolean,
  notifications: boolean,
  fcmtoken?: string
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
  profile_picture: string;
  bio: string;
  public: boolean;
  followers: number;
  following: number;
  notifications: boolean;
  fcmtoken?: string
}

const AuthContext = createContext<AuthContextType>({
  userAccount: null,
  userProfile: {
    user_id: '',
    username: '',
    email: '',
    phone: '',
    location: '',
    first_name: '',
    last_name: '',
    full_name: '',
    profile_picture: '',
    bio: '',
    public: true,
    following: 0,
    followers: 0,
    notifications: true
  },
  validAccessCode: false,
  loginLoading: false,
  currentProfileView: 'posts',
  allProfiles: [],
  userGroupRequest: [],
  selectedUserProfile: null,
  selectedUserProfileView: 'posts',
  searchedUserResults: [],
  searchedUsers: '',
  userFollowing: [],
  userFollowers: [],
  followingPosts: [],
  pendingFollowRequests: [],
  userSelectedFollowers: [],
  userSelectedFollowing: [],
  userFavorites: [],
  favoritesView: 'Posts',
  userLikedPosts: [],
  userCommentedPosts: [],
  loading: false,
  appLoading: true, 
  editPost: false,
  userActivity: [],
  validLogin: true,
  locationGranted: false,
  profileImage: '',
  updateProfilePic: () => {},
  username: '', 
  updateUsername: () => {},
  firstName: '',  
  updateFirstName: () => {},
  lastName: '',  
  updateLastName: () => {},
  phone: '',  
  updatePhone: () => {},
  bio: '', 
  updateBio: () => {},
  location: '',  
  updateLocation: () => {},
  usPublic: true, 
  updatePublic: () => {},
  grabCurrentUser: () => {},
  grabInitialCurrentUser: () => {},
  signInUser: () => {},
  signOutUser: () => {},
  handleSignupObject: () => {},
  confirmEmailSignup: () => {},
  resendConfirmationCode: () => {},
  ResetUsersPassword: () => {},
  handleProfileViewChange: () => {},
  getUserListRequests: () => {},
  acceptListRequest: () => {},
  rejectListRequest: () => {},
  getSelectedUserProfile: () => {},
  toggleSelectedUserProfileView: () => {},
  updateUserSearchTerm: () => {},
  grabUserFollowing: () => {},
  grabUserFollowers: () => {},
  createFollowUser: () => {},
  removeFollowing: () => {},
  getFollowingPosts: () => {},
  getAllFolloingRequests: () => {},
  acceptFollowingRequest: () => {},
  grabSelectedUserFollowing: () => {},
  grabSelectedUserFollowers: () => {},
  ResetUsersPasswordWithUsername: () => {},
  passwordReset: () => {},
  passwordResetWithUsername: () => {},
  addPostToFavorites: () => {},
  getFavorites: () => {},
  removeFavorites: () => {},
  setFavoritesView: () => {},
  addPlaceToFavorites: () => {},
  addListToFavorites: () => {},
  getLikedPosts: () => {},
  getCommentedPosts: () => {},
  updateUserProfile: () => {},
  createImageActivity: () => {},
  getUserActivity: () => {},
  generateNotification: () => {},
  deleteAccount: () => {}
});

interface AuthContextType {
  userAccount: UserAccount | null;
  userProfile: UserProfile | null;
  validAccessCode: boolean;
  loginLoading: boolean;
  currentProfileView: string;
  allProfiles: UserProfile[]
  userGroupRequest: any[]
  selectedUserProfile: UserProfile | null
  selectedUserProfileView: string
  searchedUserResults: UserProfile[]
  searchedUsers: string
  userFollowing: any[]
  userFollowers: any[]
  followingPosts: any[]
  pendingFollowRequests: any[]
  userSelectedFollowers: any[],
  userSelectedFollowing: any[],
  userFavorites: any[]
  favoritesView: string
  userLikedPosts: any[]
  userCommentedPosts: any[]
  userActivity: any[]
  editPost: boolean
  loading: boolean
  appLoading: boolean
  validLogin: boolean
  locationGranted: boolean
  profileImage: string,
  updateProfilePic: (picture: string) => void
  username: string, 
  updateUsername: (text: string) => void,
  firstName: string,  
  updateFirstName: (text: string) => void,
  lastName: string,  
  updateLastName: (text: string) => void,
  phone: string,  
  updatePhone: (text: string) => void,
  bio: string, 
  updateBio: (text: string) => void,
  location: string,  
  updateLocation: (text: string) => void,
  usPublic: boolean, 
  updatePublic: (text: boolean) => void,
  getCommentedPosts: () => void
  grabCurrentUser: () => void;
  grabInitialCurrentUser: () => void,
  signInUser: (username: string, password: string) => void;
  signOutUser: () => void;
  handleSignupObject: (data: SignupObject, navigation: any) => void;
  confirmEmailSignup: (username: string, confirmationCode: string, navigation: any) => void;
  resendConfirmationCode: (username: string) => void;
  ResetUsersPassword: (username: string, navigation: any) => void;
  handleProfileViewChange: (text: string) => void;
  getUserListRequests: (user_id: string) => void
  acceptListRequest: (member_id: number, user_id: string, request: any) => void
  rejectListRequest: (member_id: number, user_id: string) => void
  getSelectedUserProfile: (user_id: string) => void
  toggleSelectedUserProfileView: (text: string) => void
  updateUserSearchTerm: (text:string) => void
  grabUserFollowing: (user_id: string) => void
  grabUserFollowers: (user_id: string) => void
  createFollowUser: (user: any) => void
  removeFollowing: (friend_id: number) => void
  getFollowingPosts: (user_id: string) => void
  getAllFolloingRequests: (user_id: string) => void
  acceptFollowingRequest: (friend_id: number, request: any) => void
  grabSelectedUserFollowing: (user_id: string) => void
  grabSelectedUserFollowers: (user_id: string) => void
  ResetUsersPasswordWithUsername: (username: string) => void
  passwordReset: (confirmation_code: string, password: string, navigation: any) => void
  passwordResetWithUsername: (username: string, confirmation_code: string, password: string, navigation: any) => void
  addPostToFavorites: (place_id: number) => void
  addListToFavorites: (list_id: number) => void
  getFavorites: (user_id: string) => void
  removeFavorites: (favorites_id: string) => void
  setFavoritesView: (text: string) => void
  addPlaceToFavorites: (place_id: string) => void
  getLikedPosts: () => void
  updateUserProfile: (navigation: any) => void
  createImageActivity: (
    user_id: string | null, 
    message: string | null,
    post_id: string | null,
    list_id: string | null,
    place_id: string | null,
    friend_id: string | null,
    comment_id: string | null
  ) => void
  getUserActivity: () => void
  generateNotification: (fcmToken: string, title: string, body: string, imageUrl?: string) => void
  deleteAccount: () => void
}

// the main provider
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

  const [loginLoading, setLoginLoading] = useState<boolean>(false)
  const [invalidLogin, setInvalidLogin] = useState<boolean>()
  const [validAccessCode, setValidAccessCode] = useState<boolean>(false) 
  const [currentProfileView, setCurrentProfileView] = useState<string>('posts')
  const [allProfiles, setAllProfiles] = useState<UserProfile[]>([])

  const [userGroupRequest, setUserGroupRequest] = useState<any[]>([])
  const [userUserRequest, setUserUserRequest] = useState<any[]>([])

  const [userAccount, setUserAccount] = useState<UserAccount | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile>({
                                                                user_id: '',
                                                                username: '',
                                                                email: '',
                                                                phone: '',
                                                                location: '',
                                                                first_name: '',
                                                                last_name: '',
                                                                full_name: '',
                                                                profile_picture: '',
                                                                bio: '',
                                                                public: true,
                                                                followers: 0,
                                                                following: 0,
                                                                notifications: true
                                                              })
                                                            
  const [searchedUsers, setSearchedUsers] = useState<string>('')
  const [searchedUserResults, setSearchedUserResults] = useState<UserProfile[]>([])

  const [selectedUserProfile, setSelectedUserProfile] = useState<UserProfile | null>(null)
  const [selectedUserProfileView, setSelectedUserProfileView] = useState<string>('posts')

  const [userFollowing, setUserFollowing] = useState<any[]>([])
  const [userFollowers, setUserFollowers] = useState<any[]>([])

  const [userSelectedFollowing, setUserSelectedFollowing] = useState<any[]>([])
  const [userSelectedFollowers, setUserSelectedFollowers] = useState<any[]>([])

  const [followingPosts, setFollowingPosts] = useState<any>([])

  const [pendingFollowRequests, setPendingFollowRequest] = useState<any>([])

  const [userFavorites, setUserFavorites] = useState<any[]>([])

  const [favoritesView, setFavoritesView] = useState<string>('Posts')

  const [userLikedPosts, setUserLikedPosts] = useState<any[]>([])
  const [userCommentedPosts, setUserCommentedPosts] = useState<any[]>([])
   
  const [editPost, setEditPOst] = useState<boolean>(false)

  const [profileImage, setProfileImage] = useState<string>(userProfile && userProfile.profile_picture ? userProfile.profile_picture : '')
  const [username, setUsername] = useState<string>(userProfile?.username)
  const [firstName, setFirstName] = useState<string>(userProfile?.first_name)
  const [lastName, setLastName] = useState<string>(userProfile?.last_name)
  const [phone, setPhone] = useState<string>(userProfile?.phone)
  const [bio, setBio] = useState<string>(userProfile?.bio)
  const [location, setLocation] = useState<string>(userProfile?.location)
  const [usPublic, setIsPublic] = useState<boolean>(userProfile?.public)

  const [loading, setLoading] = useState<boolean>(true);
  const [appLoading, setAppLoading] = useState<boolean>(true)

  const [userActivity, setUserActivity] = useState<any>([])

  const [validLogin, setValidLogin] = useState<boolean>(true)

  const [locationGranted, setLocationGranted] = useState(false)

  const updateUsername = (text: string) => {
    setUsername(text)
  }

  const updateFirstName = (text: string) => {
    setFirstName(text)
  }

  const updateLastName = (text: string) => {
    setLastName(text)
  }

  const updatePhone = (text: string) => {
    setPhone(text)
  }

  const updateBio = (text: string) => {
    setBio(text)
  }

  const updateLocation = (text: string) => {
    setLocation(text)
  }

  const updatePublic = (text: boolean) => {
    setIsPublic(text)
  }

  const updateProfilePic = (picture: string) => {
    setProfileImage(picture)
  }


  const toggleValidAccessCode = () => {
    setValidAccessCode(!validAccessCode)
  }

  const toggleEditPost = () => {
    setEditPOst(!editPost)
  }

  const toggleSelectedUserProfileView = (text: string) => {
    setSelectedUserProfileView(text)
  }

  const handleProfileViewChange = (text: string) => {
    setCurrentProfileView(text)
  }

  const updateUserSearchTerm = (text: string) => {
    setSearchedUsers(text)
    searchForUsers(text)
  }

  useEffect(() => {
    getAllUserProfile()
    requestLocationPermission()
  }, [])

  Geocoder.init(GOOGLE_API); // use a valid API key

  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'ios') {
        const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        if (result === RESULTS.GRANTED) {
          setLocationGranted(true);
        } else {
          setLocationGranted(false);
        }
      } 
    } catch (err) {
      console.log(err);
    }
  };

  const requestFCMToken = async (user_id: string) => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log('FCM Token:', fcmToken);
        // Here, you should send the token to your server to associate it with the user
        await storeFCMToken(fcmToken, user_id);
      } else {
        console.log('Failed to get FCM token');
      }
    }
  };

  const storeFCMToken = async (token: string, user_id: string) => {
    let url = `https://grubberapi.com/api/v1/profiles/fcm-token/${user_id}`
    const data = {
      token: token
    }
    axios.put(url, data)
      .then(response => {
        
      })
      .catch(error => {
        console.error('Error storing fcm token in database:', error);
        throw error;
      });
  };

  const generateNotification = async (fcmToken: string, title: string, body: string, imageUrl?: string) => {
    console.log('fcm token: ', fcmToken)
    console.log('title: ', title)
    console.log('body: ', body)
    console.log('imageUrl: ', imageUrl)
    setTimeout(async () => {
      const response = await axios.post(
        `https://grubberapi.com/api/v1/notifications`,
        {
          fcmtoken: fcmToken,
          title,
          body,
          imageUrl,
        }
      );
      console.log('Notification response:', response.data);
    }, 1000); // 5-second delay
  };

  const searchForUsers = (text: string) => {
    let url = `https://grubberapi.com/api/v1/profiles/search/${text}`
    axios.get(url)
      .then(response => {
        setSearchedUserResults(response.data)
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        throw error;
      });
  }

  const grabCurrentUser = () => {
    getCurrentUser()
      .then((user) => {
        setUserAccount({
          username: user.username,
          email: user.username,
          userId: user.userId
        });
        getUserProfile(user.userId); 
      })
      .catch((err) => {
        console.log('error getting user: ', err)
      });
  };

  const getUserProfile = (user_id: string) => {
    let url = `https://grubberapi.com/api/v1/profiles/${user_id}`;
    axios.get(url)
      .then(response => {
        setUserProfile(response.data[0]);
        requestFCMToken(user_id)
        setLoginLoading(false); // Set loading to false after fetching profile
      })
      .catch(error => {
        console.log('error getting profile: ', error)
      });
  };

  const grabInitialCurrentUser = () => {
    setAppLoading(true)
    getCurrentUser()
      .then((user) => {
        setUserAccount({
          username: user.username,
          email: user.username,
          userId: user.userId
        });
        getInitialUserProfile(user.userId); // Moved inside then block
      })
      .catch((err) => {
        console.log('error getting user: ', err)
        setAppLoading(false); // Set loading to false on error
      });
  };

  const getInitialUserProfile = (user_id: string) => {
    let url = `https://grubberapi.com/api/v1/profiles/${user_id}`;
    axios.get(url)
      .then(response => {
        setUserProfile(response.data[0]);
        requestFCMToken(user_id)
        setAppLoading(false); // Set loading to false after fetching profile
      })
      .catch(error => {
        console.log('error getting profile: ', error)
        setAppLoading(false); // Set loading to false on error
      });
  };

  const signInUser = (username: string, password: string) => {
    setLoginLoading(true)
    signIn({username, password})
      .then((response) => {
        grabCurrentUser();
      })
      .catch((error) => {
        console.log('Error signing in user: ', error)
        setLoginLoading(false)
        setValidLogin(false)
      });
  };

  const signOutUser = () => {
    setLoading(true);
    let url = `https://grubberapi.com/api/v1/profiles/fcm-token/${userProfile.user_id}`
    const data = {
      token: ''
    }
    axios.put(url, data)
      .then(response => {
        signOut()
          .then(response => {
            setUserAccount(null);
            setLoading(false);
          })
          .catch(error => {
            console.error(error);
            setLoading(false);
          });
      })
      .catch(error => {
        console.error('Error storing fcm token in database:', error);
        throw error;
      });
  };

  const deleteAccount = () => {
    let url = `https://grubberapi.com/api/v1/profiles/${userProfile.user_id}`
    axios.delete(url)
      .then((response) => {
        setUserAccount(null)
        setUserProfile({
          user_id: '',
          username: '',
          email: '',
          phone: '',
          location: '',
          first_name: '',
          last_name: '',
          full_name: '',
          profile_picture: '',
          bio: '',
          public: true,
          followers: 0,
          following: 0,
          notifications: true
        })
        // deleteUser()
      })
      .catch((error) => {
        console.log('Error signing in user: ', error)
        setLoginLoading(false)
        setValidLogin(false)
      });
  };

  const deleteUser = async () => {
    try {
      await deleteUser();
      Alert.alert('Account deleted successfully');
      // Navigate to a different screen or log the user out after account deletion
    } catch (error) {
      console.log('Error deleting user:', error);
    }
  };

  const getUserActivity = () => {
    let url = `https://grubberapi.com/api/v1/activity/${userProfile.user_id}`;
    axios.get(url)
      .then(response => {
        setUserActivity(response.data);
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        setLoading(false); // Set loading to false on error
      });
  };

  const getAllUserProfile = () => {
    let url = `https://grubberapi.com/api/v1/profiles`
    axios.get(url)
      .then(response => {
        setAllProfiles(response.data)
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        throw error;
      });
  }

  const handleSignupObject = (data: SignupObject, navigation: any) => {
    const signupData = {
      username: data.username,
      password: data.password,
      options: {
        userAttributes: {
          email: data.email,
          given_name: data.given_name,
          family_name: data.family_name,
          nickname: data.given_name,
          name: `${data.given_name} ${data.family_name}`,
          locale: data.locale,
          preferred_username: data.preferred_username,
        }
      }
    }
    signUp(signupData)
      .then((currentUser: any) => {
        createUserProfile(currentUser.userId, data, navigation)
      })
      .catch((err: any) => {
        console.log('Could not create user:', err);
      });
  }

  const createUserProfile = (userId: string, data: SignupObject, navigation: any) => {
    const profileData = {
      userId: userId, //
      username: data.username, //
      email: data.email, //
      phone: data.phone, //
      location: data.locale,
      first_name: data.given_name,
      last_name: data.family_name,
      name: data.name,
      bio: data.bio,
      nickname: data.given_name,
      profile_picture: data.profile_picture,
      preferred_username: data.username,
      public: data.public,
      notifications: true,
    }
    let url = `https://grubberapi.com/api/v1/profiles/`
    axios.post(url, profileData)
      .then(response => {
        navigation.navigate('AccessCodeScreen', {username: data.username})
        setLoginLoading(false)
      })
      .catch(error => {
        console.log('Error fetching profile:', error);
      });
  }

  const confirmEmailSignup = (username: string, confirmationCode: string, navigation: any) => {
    confirmSignUp({
      username: username,
      confirmationCode: confirmationCode
    })
    .then(response => {
      navigation.navigate('LoginScreen');
    })
    .catch(error => {
        console.log('Error confirming sign up', error);
        toggleValidAccessCode()
    });
  }

  const resendConfirmationCode = (username: string) => {
    resendSignUpCode({
      username: username
    })
    .then(response => {
    })
    .catch(error => {
        console.log('Error confirming sign up', error);
    });
  }

  const ResetUsersPassword = (username: string, navigation: any) => {
    resetPassword({username})
      .then(response => {
        navigation.navigate('ResetPasswordScreenAuth', {username: username})
      })
      .catch(error => {
        console.error(error)
      })
  }

  const ResetUsersPasswordWithUsername = (username: string) => {
    resetPassword({username})
      .then(response => {
      })
      .catch(error => {
        console.error(error)
      })
  }

  const getAllFolloingRequests = (user_id: string) => {
    let url = `https://grubberapi.com/api/v1/friends/requests/${user_id}`
    axios.get(url)
      .then(response => {
        setPendingFollowRequest(response.data)
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        throw error;
      });
  }

  const getFollowingPosts = (user_id: string) => {
    let url = `https://grubberapi.com/api/v1/posts/friend/${user_id}`
    axios.get(url)
      .then(response => {
        setFollowingPosts(response.data)
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        throw error;
      });
  }

  const acceptListRequest = (member_id: number, user_id: string, request: any) => {
    console.log('acceptListRequest started');
    let url = `https://grubberapi.com/api/v1/members/request/accept/${member_id}`;
    
    axios.put(url)
      .then(response => {
        generateNotification(request.fcmtoken, 'List Request',  `${userProfile.username} accepted your request to join ${request.name}`, request.picture);
        setUserGroupRequest([])
        setTimeout(() => {
          getUserListRequests(userProfile.user_id);
        }, 100);
      })
      .catch(error => {
        console.error('Error in acceptListRequest:', error);
      });
  };
  
  const getUserListRequests = (user_id: string) => {
    let url = `https://grubberapi.com/api/v1/members/request/${user_id}`;
    
    axios.get(url)
      .then(response => {
        setUserGroupRequest(response.data);
      })
      .catch(error => {
        console.error('Error fetching list requests:', error);
      });
  };
  

  const rejectListRequest = (member_id: number, user_id: string) => {
    let url = `https://grubberapi.com/api/v1/members/request/reject/${member_id}`
    axios.delete(url)
      .then(response => {
        getUserListRequests(user_id)
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        throw error;
      });
  }

  const getSelectedUserProfile = (user_id: string) => {
    let url = `https://grubberapi.com/api/v1/profiles/${user_id}`
    axios.get(url)
      .then(response => {
        setSelectedUserProfile(response.data[0])
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        throw error;
      });
  }

  const createFollowUser = (user: any) => {
    const data = {
      following_id: user.user_id,
      follower_id: userProfile.user_id,
      status: user.public ? 'active' : 'pending',
      type: 'friend'
    }
    let url = `https://grubberapi.com/api/v1/friends`
    axios.post(url, data)
      .then(response => {
        generateNotification(user.fcmtoken, 'New Follower', user.public ? `${userProfile.username} started following you.` : `${userProfile.username} sent you a friend request`, userProfile.profile_picture)
        grabUserFollowers(userProfile.user_id)
        grabUserFollowing(userProfile.user_id) 
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        throw error;
      });
  }

  const removeFollowing = (friend_id: number) => {
    let url = `https://grubberapi.com/api/v1/friends/${friend_id}`
    axios.delete(url)
      .then(response => {
        grabUserFollowers(userProfile.user_id)
        grabUserFollowing(userProfile.user_id)
        getAllFolloingRequests(userProfile.user_id)
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        throw error;
      });
  }

  const acceptFollowingRequest = (friend_id: number, request: any) => {
    console.log(request)
    let url = `https://grubberapi.com/api/v1/friends/accept/${friend_id}`
    axios.put(url)
      .then(response => {
        generateNotification(request.fcmtoken, 'Follow Request', `${userProfile.username} accepted your friend request`, userProfile.profile_picture)
        grabUserFollowers(userProfile.user_id)
        grabUserFollowing(userProfile.user_id)
        getAllFolloingRequests(userProfile.user_id)
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        throw error;
      });
  }

  const grabUserFollowing = (user_id: string) => {
    let url = `https://grubberapi.com/api/v1/friends/following/${user_id}`
    axios.get(url)
      .then(response => {
        setUserFollowing(response.data)
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        throw error;
      });
  }

  const grabUserFollowers = (user_id: string) => {
    let url = `https://grubberapi.com/api/v1/friends/follower/${user_id}`
    axios.get(url)
      .then(response => {
        setUserFollowers(response.data)
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        throw error;
      });
  }

  const grabSelectedUserFollowing = (user_id: string) => {
    let url = `https://grubberapi.com/api/v1/friends/following/${user_id}`
    axios.get(url)
      .then(response => {
        setUserSelectedFollowing(response.data)
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        throw error;
      });
  }

  
  const grabSelectedUserFollowers = (user_id: string) => {
    let url = `https://grubberapi.com/api/v1/friends/follower/${user_id}`
    axios.get(url)
      .then(response => {
        setUserSelectedFollowers(response.data)
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        throw error;
      });
  }

  const addPostToFavorites = (post_id: number) => {
    let url = `https://grubberapi.com/api/v1/favorites`
    const data = {
      user_id: userProfile.user_id,
      post_id: post_id,
      list_id: null,
      place_id: null
    }
    axios.post(url, data)
      .then(response => {
        getFavorites(userProfile.user_id)
      })
      .catch(error => {
        console.error('Error creating favorites:', error);
        throw error;
      });
  }

  const addPlaceToFavorites = (place_id: string) => {
    let url = `https://grubberapi.com/api/v1/favorites`;
    const data = {
      user_id: userProfile.user_id,
      post_id: null,
      list_id: null,
      place_id: place_id
    };
    axios.post(url, data)
      .then(response => {
        getFavorites(userProfile.user_id);
      })
      .catch(error => {
        console.error('Error creating favorites:', error);
        throw error;
      });
  };

  const addListToFavorites = (list_id: number) => {
    console.log('lists: ', list_id)
    let url = `https://grubberapi.com/api/v1/favorites`;
    const data = {
      user_id: userProfile.user_id,
      post_id: null,
      list_id: list_id,
      place_id: null
    };
    axios.post(url, data)
      .then(response => {
        getFavorites(userProfile.user_id);
      })
      .catch(error => {
        console.error('Error creating favorites:', error);
        throw error;
      });
  };

  const getFavorites = (user_id: string) => {
    let url = `https://grubberapi.com/api/v1/favorites/${user_id}`
    axios.get(url)
      .then(response => {
        setUserFavorites(response.data)
      })
      .catch(error => {
        console.error('Error creating favorites:', error);
        throw error;
      });
  }

  const removeFavorites = (favorites_id: string) => {
    console.log('remove favorite by id: ', favorites_id)
    let url = `https://grubberapi.com/api/v1/favorites/${favorites_id}`
    axios.delete(url)
      .then(response => {
        getFavorites(userProfile.user_id)
      })
      .catch(error => {
        console.error('Error creating favorites:', error);
        throw error;
      });
  }

  const getLikedPosts = () => {
    let url = `https://grubberapi.com/api/v1/likes/user/${userProfile.user_id}`
    axios.get(url)
      .then(response => {
        setUserLikedPosts(response.data)
      })
      .catch(error => {
        console.error('Error getting all like posts:', error);
        throw error;
      });
  }

  const getCommentedPosts = () => {
    let url = `https://grubberapi.com/api/v1/postComments/user/${userProfile.user_id}`
    axios.get(url)
      .then(response => {
        setUserCommentedPosts(response.data)
      })
      .catch(error => {
        console.error('Error getting all commented posts:', error);
        throw error;
      });
  }

  const updateUserProfile = (navigation: any) => {
    const data = {
      username, 
      email: userProfile.email, 
      phone, 
      location, 
      first_name: firstName, 
      last_name: lastName,
      full_name: `${firstName} ${lastName}`, 
      bio, 
      nickname: `${firstName} ${lastName}`, 
      profile_picture: profileImage, 
      public: usPublic, 
      notifications: userProfile.notifications
    }
    let url = `https://grubberapi.com/api/v1/profiles/${userProfile.user_id}`
    console.log(url)
    console.log(JSON.stringify(data))
    axios.put(url, data)
      .then(response => {
        getUserProfile(userProfile.user_id)
        navigation.navigate('ProfileScreen')
      })
      .catch(error => {
        console.error('Error getting all commented posts:', error);
        throw error;
      });
  }

  const passwordReset = (confirmation_code: string, password: string, navigation: any) => {
    confirmResetPassword({
      username: userProfile.username, 
      confirmationCode: confirmation_code, 
      newPassword: password
    })
    .then((response) => {
      navigation.goBack()
    }).catch((error) => {
      console.error(error)
    })

  }

  const passwordResetWithUsername = (username: string, confirmation_code: string, password: string, navigation: any) => {
    confirmResetPassword({
      username: username, 
      confirmationCode: confirmation_code, 
      newPassword: password
    })
    .then((response) => {
      navigation.navigate('LoginScreen')
    }).catch((error) => {
      console.error(error)
    })

  }

  const createImageActivity = (
    user_id: string | null, 
    message: string | null,
    post_id: string | null,
    list_id: string | null,
    place_id: string | null,
    friend_id: string | null,
    comment_id: string | null
  ) => {
    console.log('create a new activity')
    const data = {
      user_id,
      message,
      post_id,
      list_id, 
      place_id, 
      friend_id, 
      comment_id
    }
    let url = `https://grubberapi.com/api/v1/activity`
    axios.post(url, data)
      .then(response => {
        console.log('New Activity created')
      })
      .catch(error => {
        console.error('Error getting all commented posts:', error);
        throw error;
      });
  }
  
  return (
    <AuthContext.Provider
      value={{
        userAccount,
        userProfile,
        validAccessCode,
        loginLoading,
        currentProfileView,
        allProfiles,
        userGroupRequest,
        selectedUserProfile,
        selectedUserProfileView,
        searchedUserResults,
        searchedUsers,
        userFollowing,
        userFollowers,
        followingPosts,
        pendingFollowRequests,
        userSelectedFollowers,
        userSelectedFollowing,
        userFavorites,
        favoritesView,
        userLikedPosts,
        userCommentedPosts,
        userActivity,
        editPost,
        loading,
        appLoading,
        validLogin, 
        locationGranted,
        profileImage,
        updateProfilePic,
        username, 
        updateUsername,
        firstName, 
        updateFirstName,
        lastName, 
        updateLastName,
        phone, 
        updatePhone,
        bio, 
        updateBio,
        location, 
        updateLocation,
        usPublic, 
        updatePublic,
        getCommentedPosts,
        toggleSelectedUserProfileView,
        grabCurrentUser,
        grabInitialCurrentUser,
        signInUser,
        signOutUser,
        handleSignupObject,
        confirmEmailSignup,
        resendConfirmationCode,
        ResetUsersPassword,
        handleProfileViewChange,
        getUserListRequests,
        acceptListRequest,
        rejectListRequest,
        getSelectedUserProfile,
        updateUserSearchTerm,
        grabUserFollowing,
        grabUserFollowers,
        createFollowUser,
        removeFollowing,
        getFollowingPosts,
        getAllFolloingRequests,
        acceptFollowingRequest,
        grabSelectedUserFollowing,
        grabSelectedUserFollowers,
        ResetUsersPasswordWithUsername,
        passwordReset,
        passwordResetWithUsername,
        addPostToFavorites,
        addListToFavorites,
        getFavorites,
        removeFavorites,
        setFavoritesView,
        addPlaceToFavorites,
        getLikedPosts,
        updateUserProfile,
        createImageActivity,
        getUserActivity,
        generateNotification,
        deleteAccount
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};