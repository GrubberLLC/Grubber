import React, { createContext, useContext, ReactNode, useState } from 'react';
import { confirmSignUp, getCurrentUser, resendSignUpCode, resetPassword, signIn, signOut, signUp } from 'aws-amplify/auth';
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
  following: number
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
    followers: 0
  },
  validAccessCode: false,
  loginLoading: false,
  currentProfileView: 'posts',
  grabCurrentUser: () => {},
  signInUser: () => {},
  signOutUser: () => {},
  handleSignupObject: () => {},
  confirmEmailSignup: () => {},
  resendConfirmationCode: () => {},
  ResetUsersPassword: () => {},
  handleProfileViewChange: () => {}
});

interface AuthContextType {
  userAccount: UserAccount | null;
  userProfile: UserProfile | null;
  validAccessCode: boolean;
  loginLoading: boolean;
  currentProfileView: string;
  grabCurrentUser: () => void;
  signInUser: (username: string, password: string) => void;
  signOutUser: () => void;
  handleSignupObject: (data: SignupObject, navigation: any) => void;
  confirmEmailSignup: (username: string, confirmationCode: string, navigation: any) => void;
  resendConfirmationCode: (username: string) => void;
  ResetUsersPassword: (username: string, navigation: any) => void;
  handleProfileViewChange: (text: string) => void;
}

// the main provider
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

  const [loginLoading, setLoginLoading] = useState<boolean>(false)
  const [invalidLogin, setInvalidLogin] = useState<boolean>()
  const [validAccessCode, setValidAccessCode] = useState<boolean>(false) 
  const [currentProfileView, setCurrentProfileView] = useState<string>('posts')

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
                                                                following: 0
                                                              })

  const toggleValidAccessCode = () => {
    setValidAccessCode(!validAccessCode)
  }

  const handleProfileViewChange = (text: string) => {
    setCurrentProfileView(text)
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
  
  return (
    <AuthContext.Provider
      value={{
        userAccount,
        userProfile,
        validAccessCode,
        loginLoading,
        currentProfileView,
        grabCurrentUser,
        signInUser,
        signOutUser,
        handleSignupObject,
        confirmEmailSignup,
        resendConfirmationCode,
        ResetUsersPassword,
        handleProfileViewChange
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};