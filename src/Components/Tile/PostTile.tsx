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

interface LikesProps {
  created_at: string,
  like_id: number,
  post_id: number,
  user_id: string
}

interface PostTileProps {
  post: SinglePostProps,
  profile?: ProfileProps | null,
}

const PostTile: React.FC<PostTileProps> = ({post, profile}) => {
  const navigation = useNavigation()
  const {userProfile} = useAuth()

  const [postLikes, setPostLikes] = useState<LikesProps[]>([])

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
    <View className='bg-skys-500 w-full'>
      <PostProfile profile={profile ? profile : null}/>
      <FullImageComponent image={post.media} addImageLike={checkImageLike}/>
      <PostSubMenu postLikes={postLikes} post_id={post.post_id} post={post}/>
      <PlacePostSummary image={post.image} name={post.name} rating={post.rating} reviews={post.review_count}/>
      <CaptionComponent caption={post.caption}/>
      <MenuSubButtonComponent justify='end' label='Post Details' handleFunction={() => {redirectToPostPlace()}}/>
    </View>
  )
}

export default PostTile
