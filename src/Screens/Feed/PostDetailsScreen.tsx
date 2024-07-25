import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
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
import axios from 'axios';
import { useAuth } from '../../Context/UserContext';
import ColorGuide from '../../ColorGuide';

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'PostDetailsScreen'>;

interface LikesProps {
  created_at: string;
  like_id: number;
  post_id: number;
  user_id: string;
}

interface ProfileProp {
  user_id: string;
  username: string;
  email: string;
  phone: string;
  location: string;
  first_name: string;
  last_name: string;
  full_name: string;
  profile_picture: string;
  bio: string;
  public: boolean;
  nuckname: string;
  notifications: boolean;
  following: number;
  followers: number;
  created_at: string;
  nickname: string;
  profile_id: string;
}

const PostDetailsScreen = () => {
  const route = useRoute<ProfileScreenRouteProp>();
  const params = route.params;
  const { userProfile, createImageActivity } = useAuth();
  const { addPlaceList } = usePost();
  const { createPostComment, createPostLoading, grabPostComments, postComments } = usePost();

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
    profile_id: params.post.profile_id,
  });
  const [newComment, setNewComment] = useState<string>('');
  const [postLikes, setPostLikes] = useState<LikesProps[]>([]);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    grabPostComments(params.post.post_id);
    getAllPostLikes(params.post.post_id);

    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const updateNewComment = (text: string) => {
    setNewComment(text);
  };

  const createComment = () => {
    createImageActivity(
      params.post.user_id,
      `${userProfile?.username} commented on your post.`,
      params.post.post_id,
      null,
      null,
      null,
      null
    );
    createPostComment(params.post, newComment, userProfile?.user_id, params.post.fcmtoken);
    setNewComment('');
  };

  const addPostLike = (post_id: string, user_id: string) => {
    const newData = {
      post_id,
      user_id,
    };
    let url = `https://grubberapi.com/api/v1/likes`;
    axios.post(url, newData)
      .then((response) => {
        getAllPostLikes(post_id);
      })
      .catch((error) => {
        console.error('Error adding like:', error);
        throw error;
      });
  };

  const removePostLike = (post_id: string) => {
    let url = `https://grubberapi.com/api/v1/likes/${post_id}`;
    axios.delete(url)
      .then((response) => {
        getAllPostLikes(post_id);
      })
      .catch((error) => {
        console.error('Error fetching profile:', error);
        throw error;
      });
  };

  const getAllPostLikes = (post_id: string) => {
    let url = `https://grubberapi.com/api/v1/likes/${post_id}`;
    axios.get(url)
      .then((response) => {
        setPostLikes(response.data);
      })
      .catch((error) => {
        console.error('Error fetching post likes:', error);
        throw error;
      });
  };

  const checkImageLike = () => {
    const userLikedPost = postLikes.filter((post) => post.user_id === userProfile?.user_id);
    userLikedPost.length > 0
      ? removePostLike(userLikedPost[0]['like_id'].toString())
      : addPostLike(params.post.post_id, params.post.user_id);
  };

  return (
    <KeyboardAvoidingView
      className={'flex-1'}
      style={{ backgroundColor: ColorGuide['bg-dark'] }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90} // Adjust this offset as needed
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <NoMenuPageHeader backing={true} leftLabel='Post' />
        <PostProfile profile={profile} />
        <FullImageComponent image={params.post.media} addImageLike={checkImageLike} />
        <PostSubMenu postLikes={postLikes} post_id={params.post.post_id} post={params.post} />
        <PlacePostSummary image={params.post.image} name={params.post.name} rating={params.post.rating} reviews={params.post.review_count} place_id={params.post.place_id} />
        <CaptionComponent caption={params.post.caption} />
        <Text className='text-lg text-white font-bold mt-4 px-2'>Comments: </Text>
        <View>
          {postComments && postComments.map((singleComment) => (
            <View key={singleComment.comment_id}>
              <PostComment comment={singleComment} />
            </View>
          ))}
        </View>
      </ScrollView>
      <View className='flex flex-row items-end border-t-2 border-t-stone-700 py-2 pl-1'>
        <LargeTextInputComponent value={newComment} onChange={updateNewComment} placeholder='add comment...' multiline={true} capitalize='none' />
        <View className='mb-1'>
          {createPostLoading ? (
            <View className='p-1.5 bg-red-500 rounded-md' style={{ backgroundColor: ColorGuide.primary }}>
              <ActivityIndicator size={'small'} color={'white'} />
            </View>
          ) : (
            <TouchableOpacity onPress={() => { createComment(); }} className='mr-2 p-1 bg-red-500 rounded-md' style={{ backgroundColor: ColorGuide.primary }}>
              <ArrowRight height={24} width={24} color={'white'} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {addPlaceList && (
        <View className='absolute z-15 w-full h-full' style={{ backgroundColor: ColorGuide['bg-dark-8'] }}>
          <Text className='text-white'>Hello this is the first thing adskjfnalksdjnalsdkfjhasljkd</Text>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default PostDetailsScreen;
