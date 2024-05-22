import React, { useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../Types/NavigationTypes';
import PostProfile from '../../Components/Profiles/PostProfile';
import FullImageComponent from '../../Components/Images/FullImageComponent';
import PlacePostSummary from '../../Components/Places/PlacePostSummary';
import PostSubMenu from '../../Components/Menus/PostSubMenu';
import CaptionComponent from '../../Components/Info/CaptionComponent';
import NoMenuPageHeader from '../../Components/Headers/NoMenuPageHeader';
import LargeTextInputComponent from '../../Components/Inputs/LargeTextInputComponent';
import { ArrowRight, ArrowUp } from 'react-native-feather';
import { usePost } from '../../Context/PostContext';
import PostComment from '../../Components/Comments/PostComment';

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'AccessCodeScreen'>;

interface ProfileProp {
  user_id: string,
  username: string,
  email: string,
  phone: string,
  location: string,
  first_name: string,
  last_name: string,
  full_name: string,
  profile_picture: string,
  bio: string,
  public: boolean, 
  nuckname: string,
  notifications: boolean,
  following: number,
  followers: number,
  created_at: string,
  nickname: string,
  profile_id: string
}

const PostDetailsScreen = () => {
  const route = useRoute<ProfileScreenRouteProp>();
  const params = route.params

  const {createPostComment, createPostLoading, grabPostComments, postComments} = usePost()

  const [profile, setProfile] = useState<ProfileProp>({
    user_id: params.post.user_id,
    username: params.post.username,
    email: params.post.email,
    phone: params.post.phone,
    location: params.post.location,
    first_name: params.post.first_name,
    last_name: params.post.last_name,
    full_name: params.post.full_name,
    profile_picture: params.post.profile_picture,
    bio: params.post.bio,
    public: params.post.public, 
    nuckname: params.post.nuckname,
    notifications: params.post.notifications,
    following: params.post.following,
    followers: params.post.followers,
    created_at: params.post.created_at,
    nickname: params.post.nickname,
    profile_id: params.post.profile_id
  })
  const [newComment, setNewComment] = useState<string>('')

  useEffect(() => { // look into use memo
    grabPostComments(params.post.post_id)
  }, [])

  const updateNewComment = (text: string) => {
    setNewComment(text)
  }

  const createComment = () => {
    createPostComment(params.post.post_id, newComment, params.post.user_id)
    setNewComment('')
  }

  return (
    <View className={'flex-1 bg-neutral-900'}>
      <NoMenuPageHeader backing={true} leftLabel='Post'/>
      <ScrollView className=''>
        <PostProfile profile={profile}/>
        <FullImageComponent image={params.post.media}/>
        <PostSubMenu />
        <PlacePostSummary image={params.post.image} name={params.post.name} rating={params.post.rating} reviews={params.post.review_count}/>
        <CaptionComponent caption={params.post.caption}/>
        <Text className='text-lg text-white font-bold mt-4 px-2'>Comments: </Text>
        <View>
          {
            postComments
              ? postComments.map((singleComment) => {
                  return(
                    <View key={singleComment.comment_id}>
                      <PostComment comment={singleComment}/>
                    </View>
                  )
                })
              : null
          }
        </View>
      </ScrollView>
      <View className='mt-2 flex flex-row items-end border-t-2 border-t-stone-700 py-3'>
        <LargeTextInputComponent value={newComment} onChange={updateNewComment} placeholder='add comment...' multiline={false} capitalize='none'/>
        <View className='mb-1'>
          {
            createPostLoading
              ? <View className='This is  p-1.5 bg-red-500 rounded-md'>
                  <ActivityIndicator size={'small'} color={'white'}/>
                </View>
              : <TouchableOpacity onPress={() => {createComment()}} className='mr-2 p-1 bg-red-500 rounded-md'>
                  <ArrowRight height={24} width={24} color={'white'}/>
                </TouchableOpacity>
          }
        </View>
      </View>
    </View>
  )
}

export default PostDetailsScreen
