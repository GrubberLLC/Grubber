import React, { createContext, useContext, ReactNode, useState } from 'react';
import { getCurrentUser, signIn, signOut } from 'aws-amplify/auth';
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

interface SignupObject {
  username: string,
  email: string,
  firstName: string,
  lastName: string,
  name: string,
  location: string, 
  public: boolean,
  phone: string,
  password: string
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
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  userAccount: {username: null, email: null, userId: null},
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
  },
  grabCurrentUser: () => {},
  signInUser: () => {},
  signOutUser: () => {},
  handleSignupObject: () => {}
});

interface AuthContextType {
  currentUser: string | null;
  userAccount: UserAccount | null;
  userProfile: UserProfile | null;
  grabCurrentUser: () => void;
  signInUser: (username: string, password: string) => void;
  signOutUser: (user_id: string) => void;
  handleSignupObject: (data: SignupObject) => void;
}

// the main provider
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const currentUser = ''

  const [loginLoading, setLoginLoading] = useState<boolean>()
  const [invalidLogin, setInvalidLogin] = useState<boolean>()

  const [userAccount, setUserAccount] = useState<UserAccount | null>({
                                                                username: null,
                                                                email: null,
                                                                userId: null
                                                              })
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
                                                              })

  const [signupUserObject, setSignupUserObject] = useState<SignupObject>({
                                                                          first_name: '',
                                                                          last_name: '',
                                                                          name: '',
                                                                          username: '',
                                                                          email: '',
                                                                          phone: '',
                                                                          location: '',
                                                                          public: true,
                                                                          profile_picture: ''
                                                                        })

  const grabCurrentUser = () => {
    getCurrentUser()
      .then((user) => {
        console.log(user)
        getUserProfile(user.userId)
        // setUserAccount(user)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const signInUser = (username: string, password: string) => {
    setLoginLoading(true)
    signIn({username, password})
      .then((response) => {
        getCurrentUser()
      })
      .catch((error) => {
        setLoginLoading(false)
        setInvalidLogin(true)
        console.log(error)
      })
  }

  const signOutUser = (user_id: string) => {
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
        setLoginLoading(false)
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        throw error;
      });
  }

  const handleSignupObject = (data: SignupObject) => {
    setSignupUserObject(data)
  }
  
  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userAccount,
        userProfile,
        grabCurrentUser,
        signInUser,
        signOutUser,
        handleSignupObject
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};