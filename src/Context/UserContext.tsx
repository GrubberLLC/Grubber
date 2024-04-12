import React, { createContext, useContext, ReactNode } from 'react';

interface AuthContextType {
  // currentUser: Account;
  // resetUserEmail: (email: string) => void;
}

const AuthContext = createContext<AuthContextType>({
  // currentUser: { userId: null, username: null },
  // resetUserEmail: () => {}
});

interface AuthProviderProps {
  children: ReactNode;
}

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  
  return (
    <AuthContext.Provider
      value={{
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
