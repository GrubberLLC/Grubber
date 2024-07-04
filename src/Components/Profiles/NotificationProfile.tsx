import React from 'react'
import { Image, View, Text, TouchableOpacity} from 'react-native'
import ColorGuide from '../../ColorGuide'
import { useNavigation } from '@react-navigation/native'

interface RequestProp {
  activity_id: number,
  user_id: string | null,
  post_id: string | null,
  list_id: string | null,
  place_id: string | null,
  comment_id: string | null,
  message: string | null,
  friend_id: string | null,
  created_at: string | null,
  activity_user_id: string | null,
  activity_message: string | null,
  activity_created_at: string | null,
  media: string | null,
  media_type: string | null,
  caption: string | null,
  yelp_id: string | null,
  post_created_at: string | null,
  post_media: string | null,
  description: string | null,
  picture: string | null,
  public: boolean | null,
  last_activity: string | null,
  created_by: string | null,
  name: string | null,
  list_created_at: string | null,
  list_picture: string | null,
  phone: string | null,
  price: string | null,
  rating: number | null,
  review_count: number | null,
  closed: boolean | null,
  yelp_url: string | null,
  address_street: string | null,
  address_city: string | null,
  address_state: string | null,
  address_zip_code: string | null,
  image: string | null,
  longitude: number | null,
  latitude: number | null,
  address_formatted: string | null,
  place_created_at: string | null,
  place_image: string | null,
  username: string | null,
  first_name: string | null,
  last_name: string | null,
  full_name: string | null,
  nickname: string | null,
  email: string | null,
  location: string | null,
  profile_picture: string | null,
  bil: string | null,
  notifications: boolean | null,
  following: number | null,
  followers: number | null,
  profile_id: number | null,
  profile_user_id: string | null,
  profile_created_at: string | null
}

interface NotificationProps {
  request: RequestProp
}

const NotificationProfile: React.FC<NotificationProps> = ({request}) => {
  const navigation = useNavigation()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
  
    return `${month}/${day}/${year}`;
  };

  const daysAgo = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const timeDifference = today.getTime() - date.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
  
    if (daysDifference === 0) {
      return 'Today';
    } else if (daysDifference === 1) {
      return '1 day ago';
    } else {
      return `${daysDifference} days ago`;
    }
  };

  const handlePress = () => {
    if (request.post_id) {
      navigation.navigate('PostDetailsScreen', {post: request});
    } else if (request.list_id) {
      navigation.navigate('ListDetailsScreen', {list: request});
    } else if (request.friend_id) {
      navigation.navigate('UserProfileScreen', {user_id: request.requested_id});
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} className='w-full flex flex-row' >
      <View className='h-10 w-10 rounded-full overflow-hidden' style={{backgroundColor: ColorGuide['bg-dark-6']}}>
        <Image className='flex-1' source={{uri: request.media ? request.media : request.profile_picture ? request.profile_picture : ''}}/>
      </View>
      <View className='w-full ml-4 flex flex-col'>
        <Text className='text-white text-base font-semibold'>{request.message}</Text>
        <Text className='text-white text-base '>({daysAgo(request.activity_created_at)})</Text>
      </View>
    </TouchableOpacity>
  )
}

export default NotificationProfile
