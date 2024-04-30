export type RootStackParamList = {
  LoginScreen: undefined;
  SignupScreen: undefined;
  ProfileScreen: {
    username: string;
    email: string;
    password: string;
  };
  CreateProfileScreen: {
    username: string;
    email: string;
    password: string;
    phone: string;
    given_name: string;
    family_name: string;
    nickname: string;
    name: string;
    locale: string;
    bio: string;
    preferred_username: string;
    isPublic: boolean;
  };
  AccessCodeScreen: {
    username: string;
  };
  ForgotScreen: undefined;
};