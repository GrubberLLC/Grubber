import React, { createContext, useContext, ReactNode, useState } from 'react';

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
    public: 1,}
});

interface AuthContextType {
  currentUser: string | null;
  userAccount: UserAccount | null;
  userProfile: UserProfile | null;
}

// the main provider
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const currentUser = ''

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
  
  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userAccount,
        userProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};