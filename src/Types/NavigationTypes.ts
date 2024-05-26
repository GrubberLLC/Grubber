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
  PostDetailsScreen: {
    address_city: string,
    address_formatted: string,
    address_state: string,
    address_street: string,
    address_zip_code: string,
    caption: string | null,
    closed: boolean
    created_at: string,
    image: string,
    latitude: number,
    longitude: number,
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
    yelp_url: string
  },
  PlaceScreen: {
    place_id: string
  }
};