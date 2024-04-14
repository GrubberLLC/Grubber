import React, { createContext, useContext, ReactNode, useState } from 'react';
import { getCurrentUser, signIn } from 'aws-amplify/auth';

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
  signInUser: () => {}
});

interface AuthContextType {
  currentUser: string | null;
  userAccount: UserAccount | null;
  userProfile: UserProfile | null;
  grabCurrentUser: () => void;
  signInUser: (username: string, password: string) => void;
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

  const grabCurrentUser = () => {
    getCurrentUser()
      .then((user) => {
        console.log(user)
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
  
  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userAccount,
        userProfile,
        grabCurrentUser,
        signInUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};