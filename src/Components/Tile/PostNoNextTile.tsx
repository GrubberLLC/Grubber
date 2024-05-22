import React from 'react'
import { View } from 'react-native'
import PostProfile from '../Profiles/PostProfile'
import FullImageComponent from '../Images/FullImageComponent'
import CaptionComponent from '../Info/CaptionComponent'
import PostSubMenu from '../Menus/PostSubMenu'
import PlacePostSummary from '../Places/PlacePostSummary'
import MenuSubButtonComponent from '../Buttons/MenuSubButtonComponent'
import { useNavigation } from '@react-navigation/native'

interface SinglePostProps {
  address_city: string,
  address_formatted: string,
  address_state: string, 
  address_street: string,
  address_zip_code: string,
  caption: string | null,
  closed: boolean,
  created_at: string,
  image: string,
  latitude: string,
  longitude: string,
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
  yelp_url: string,
}

interface ProfileProps {
  bio: string
  created_at: string,
  email: string,
  first_name: string,
  followers: number,
  following: number,
  full_name: string,
  last_name: string,
  location: string, 
  nickname: string,
  notifications: boolean,
  phone: string,
  profile_id: string,
  profile_picture: string,
  public: boolean,
  user_id: string,
  username: string
}

interface PostTileProps {
  post: SinglePostProps,
  profile?: ProfileProps | null,
}

const PostNoNextTile: React.FC<PostTileProps> = ({post, profile}) => {
  const navigation = useNavigation()

  return (
    <View className='bg-skys-500 w-full'>
      <PostProfile profile={profile ? profile : null}/>
      <FullImageComponent image={post.media}/>
      <PostSubMenu />
      <PlacePostSummary image={post.image} name={post.name} rating={post.rating} reviews={post.review_count}/>
      <CaptionComponent caption={post.caption}/>
    </View>
  )
}

export default PostNoNextTile
