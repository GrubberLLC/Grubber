import React, { useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { Bookmark, Edit, Edit2, Heart, MessageSquare, MoreHorizontal, Plus, PlusSquare, Trash } from 'react-native-feather';
import { useAuth } from '../../Context/UserContext';
import { useNavigation } from '@react-navigation/native';
import { usePost } from '../../Context/PostContext';
import ColorGuide from '../../ColorGuide';

interface LikesProps {
  created_at: string;
  like_id: number;
  post_id: number;
  user_id: string;
}

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

interface PostSumProps {
  postLikes: LikesProps[] | [];
  post_id?: string;
  post: SinglePostProps
}

const PostSubMenu: React.FC<PostSumProps> = ({ postLikes, post_id, post }) => {
  const navigation = useNavigation()
  const { userProfile } = useAuth();
  const { deletePost, toggleEditPOst} = usePost();

  const userLikedPost = postLikes.some((like) => like.user_id === userProfile?.user_id);

  const [editPost, setEditPost] = useState<boolean>(false)

  const confirmDelete = () => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this post?',
      [
        {
          text: 'Cancel',
          onPress: () => {
            toggleEditPOst()
          },
          style: 'cancel'
        },
        {
          text: 'Delete',
          onPress: () => {
            deletePost(post_id ? post_id : '', userProfile?.user_id)
            toggleEditPOst()
          },
          style: 'destructive'
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <View className='flex flex-row w-full px-2 pt-2 justify-between'>
      <View className='flex flex-row items-center'>
        {userLikedPost ? (
          <Heart className='mr-2' height={26} width={26} color='#e94f4e' fill='#e94f4e' />
        ) : (
          <Heart className='mr-2' height={26} width={26} color='white' />
        )}
        <Text className='mr-1 text-white text-base font-semibold'>{postLikes.length}</Text>
        <Text className='mr-2 text-white text-base'>Likes</Text>
        {/* <Bookmark height={26} width={26} color='white' /> */}
      </View>
      <View className=' flex flex-row' style={{backgroundColor: ColorGuide['bg-dark']}}>
        <TouchableOpacity onPress={() => {}} className='flex flex-row items-row mr-3 py-3'>
          <Bookmark height={22} width={22} color={'white'}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {navigation.navigate('EditPostScreen', {post})}} className='flex flex-row items-row mr-3 py-3'>
          <Edit height={22} width={22} color={'white'}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={confirmDelete} className='flex flex-row items-row py-3'>
          <Trash height={22} width={22} color={'white'}/>
        </TouchableOpacity>
      </View>
      
    </View>
  );
};

export default PostSubMenu;