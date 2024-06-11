import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import PostProfile from '../Profiles/PostProfile'
import FullImageComponent from '../Images/FullImageComponent'
import CaptionComponent from '../Info/CaptionComponent'
import PostSubMenu from '../Menus/PostSubMenu'
import PlacePostSummary from '../Places/PlacePostSummary'
import MenuSubButtonComponent from '../Buttons/MenuSubButtonComponent'
import { useNavigation } from '@react-navigation/native'
import { usePost } from '../../Context/PostContext'
import axios from 'axios'
import { useAuth } from '../../Context/UserContext'
import PostSubMenuNoEdit from '../Menus/PostSubMenuNoEdit'

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
  yelp_url: string,
  bio: string
  email: string,
  first_name: string,
  followers: number,
  following: number,
  full_name: string,
  last_name: string,
  location: string, 
  nickname: string,
  notifications: boolean,
  profile_id: string,
  profile_picture: string,
  public: boolean,
  username: string
}

interface LikesProps {
  created_at: string,
  like_id: number,
  post_id: number,
  user_id: string
}

interface PostTileProps {
  post: SinglePostProps
}

const PostTileWithProfile: React.FC<PostTileProps> = ({post}) => {
  const navigation = useNavigation()
  const {userProfile} = useAuth()

  const [postLikes, setPostLikes] = useState<LikesProps[]>([])


  let profileData = {
    bio: post.bio,
    created_at: post.created_at,
    email: post.email,
    first_name: post.first_name,
    followers: post.followers,
    following: post.first_name,
    full_name: post.full_name,
    last_name: post.last_name,
    location: post.location, 
    nickname: post.nickname,
    notifications: post.notifications,
    phone: post.phone,
    profile_id: post.profile_id,
    profile_picture: post.profile_picture,
    public: post.public,
    user_id: post.user_id,
    username: post.username
  }

  useEffect(() => {
    getAllPostLikes(post.post_id)
  }, [])

  const addPostLike = (post_id: string, user_id: string) => {
    const newData = {
      post_id,
      user_id
    }
    let url = `https://grubberapi.com/api/v1/likes`
    axios.post(url, newData)
      .then(response => {
        console.log('response: ', response.data)
        getAllPostLikes(post_id)
      })
      .catch(error => {
        console.error('Error adding like:', error);
        throw error;
      });
  }

  const removePostLike = (post_id: string) => {
    console.log('remopving the post like: ', post_id)
    let url = `https://grubberapi.com/api/v1/likes/${post_id}`
    axios.delete(url)
      .then(response => {
        console.log('delete a like: ', response.data)
        // setPostComments(response.data)
        getAllPostLikes(post_id)
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        throw error;
      });
  }

  const getAllPostLikes = (post_id: string) => {
    console.log(post_id)
    let url = `https://grubberapi.com/api/v1/likes/${post_id}`
    axios.get(url)
      .then(response => {
        console.log('response: ', response.data)
        setPostLikes(response.data)
      })
      .catch(error => {
        console.error('Error fetching post likes:', error);
        throw error;
      });
  }

  const checkImageLike = () => {
    const userLikedPost = postLikes.filter((post) => post.user_id === userProfile?.user_id)
    console.log('user liked the image', userLikedPost)
    userLikedPost.length > 0
      ? removePostLike(userLikedPost[0]['like_id'].toString())
      : addPostLike(post.post_id, post.user_id)

  }

  const redirectToPostPlace = () => {
    navigation.navigate('PostDetailsScreen', {post})
  }

  return (
    <View className='w-full'>
      <PostProfile profile={profileData != null ? profileData : null}/>
      <FullImageComponent image={post.media} addImageLike={checkImageLike}/>
      {
        profileData.user_id === userProfile?.user_id
          ?  <PostSubMenu postLikes={postLikes} post_id={post.post_id} post={post}/>
          : <PostSubMenuNoEdit postLikes={postLikes} post_id={post.post_id} post={post}/>
      }
      <PlacePostSummary image={post.image} name={post.name} rating={post.rating} reviews={post.review_count} place_id={post.place_id}/>
      <CaptionComponent caption={post.caption}/>
      <MenuSubButtonComponent justify='end' label='Post Details' handleFunction={() => {redirectToPostPlace()}}/>
    </View>
  )
}

export default PostTileWithProfile
