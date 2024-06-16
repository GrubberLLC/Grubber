import React, { createContext, useContext, ReactNode, useState, ProfilerProps } from 'react';
import { confirmResetPassword, confirmSignUp, getCurrentUser, resendSignUpCode, resetPassword, signIn, signOut, signUp } from 'aws-amplify/auth';
import axios from 'axios';

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
    public: 1,
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
  grabCurrentUser: () => {},
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
  passwordReset: () => {}

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
  grabCurrentUser: () => void;
  signInUser: (username: string, password: string) => void;
  signOutUser: () => void;
  handleSignupObject: (data: SignupObject, navigation: any) => void;
  confirmEmailSignup: (username: string, confirmationCode: string, navigation: any) => void;
  resendConfirmationCode: (username: string) => void;
  ResetUsersPassword: (username: string, navigation: any) => void;
  handleProfileViewChange: (text: string) => void;
  getUserListRequests: (user_id: string) => void
  acceptListRequest: (member_id: number, user_id: string) => void
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
  acceptFollowingRequest: (friend_id: number) => void
  grabSelectedUserFollowing: (user_id: string) => void
  grabSelectedUserFollowers: (user_id: string) => void
  ResetUsersPasswordWithUsername: (username: string) => void
  passwordReset: (confirmation_code: string, password: string, navigation: any) => void
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
                                                                public: 1,
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

  const toggleValidAccessCode = () => {
    setValidAccessCode(!validAccessCode)
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
        })
        setLoginLoading(false)
        getUserProfile(user.userId)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const signInUser = (username: string, password: string) => {
    console.log('logging in: ', username)
    setLoginLoading(true)
    signIn({username, password})
      .then((response) => {
        grabCurrentUser()
      })
      .catch((error) => {
        setLoginLoading(false)
        setInvalidLogin(true)
        console.log(error)
      })
  }

  const signOutUser = () => {
    console.log('log out of your accoubnt')
    signOut()
      .then(response => {
        setUserAccount(null)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const getUserProfile = (user_id: string) => {
    let url = `https://grubberapi.com/api/v1/profiles/${user_id}`
    axios.get(url)
      .then(response => {
        setUserProfile(response.data[0])
        getAllUserProfile()
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        throw error;
      });
  }

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
    console.log(signupData)
    // createUserProfile('afew-bras-ad-sd-gsadf', data)
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
        console.error('Error fetching profile:', error);
        throw error;
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
      console.log('new email with code sent')
    })
    .catch(error => {
        console.log('Error confirming sign up', error);
    });
  }

  const ResetUsersPassword = (username: string, navigation: any) => {
    resetPassword({username})
      .then(response => {
        navigation.navigate('LoginScreen')
      })
      .catch(error => {
        console.log(error)
      })
  }

  const ResetUsersPasswordWithUsername = (username: string) => {
    resetPassword({username})
      .then(response => {
        console.log('Sent reset password email')
      })
      .catch(error => {
        console.log(error)
      })
  }

  const getAllFolloingRequests = (user_id: string) => {
    let url = `https://grubberapi.com/api/v1/friends/requests/${user_id}`
    axios.get(url)
      .then(response => {
        console.log('users pending requests: ', response.data)
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
        console.log('users requests: ', response.data)
        setFollowingPosts(response.data)
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        throw error;
      });
  }

  const getUserListRequests = (user_id: string) => {
    let url = `https://grubberapi.com/api/v1/members/request/${user_id}`
    axios.get(url)
      .then(response => {
        console.log('users requests: ', response.data)
        setUserGroupRequest(response.data)
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        throw error;
      });
  }

  const acceptListRequest = (member_id: number, user_id: string) => {
    let url = `https://grubberapi.com/api/v1/members/request/accept/${member_id}`
    axios.put(url)
      .then(response => {
        console.log('users requests: ', response.data)
        getUserListRequests(user_id)
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        throw error;
      });
  }

  const rejectListRequest = (member_id: number, user_id: string) => {
    let url = `https://grubberapi.com/api/v1/members/request/reject/${member_id}`
    axios.delete(url)
      .then(response => {
        console.log('users requests: ', response.data)
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
    console.log('users profile public status: ', user.pubilc)
    const data = {
      following_id: user.user_id,
      follower_id: userProfile.user_id,
      status: user.public ? 'active' : 'pending',
      type: 'friend'
    }
    let url = `https://grubberapi.com/api/v1/friends`
    axios.post(url, data)
      .then(response => {
        grabUserFollowers(userProfile.user_id)
        grabUserFollowing(userProfile.user_id)
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        throw error;
      });
  }

  const removeFollowing = (friend_id: number) => {
    console.log(friend_id)
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

  const acceptFollowingRequest = (friend_id: number) => {
    console.log(friend_id)
    let url = `https://grubberapi.com/api/v1/friends/accept/${friend_id}`
    axios.put(url)
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

  const passwordReset = (confirmation_code: string, password: string, navigation: any) => {
    confirmResetPassword({
      username: userProfile.username, 
      confirmationCode: confirmation_code, 
      newPassword: password
    })
    .then((response) => {
      console.log(response)
      navigation.goBack()
    }).catch((error) => {
      console.log(error)
    })

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
        toggleSelectedUserProfileView,
        grabCurrentUser,
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
        passwordReset
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};