import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import PostProfileComponent from '../Profiles/PostProfileComponent'
import { useAuth } from '../../Context/UserContext'
import SelectedImageComponent from '../Select/SelectedImageComponent'

interface SinglePost {
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

interface SinglePostProps {
  post: SinglePost
}

const FullPostTileComponent: React.FC<SinglePostProps> = ({post}) => {

  const {userProfile} = useAuth()

  useEffect(() => {
    console.log('render single post: ', post)
  }, [])
  return (
    <View>
      <PostProfileComponent profile={userProfile}/>
      <SelectedImageComponent image={post.media}/>
    </View>
  )
}

export default FullPostTileComponent