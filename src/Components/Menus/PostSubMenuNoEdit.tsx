import React, { useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { Bookmark, Heart, MoreHorizontal, PlusSquare, Trash } from 'react-native-feather';
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

const PostSubMenuNoEdit: React.FC<PostSumProps> = ({ postLikes, post_id, post }) => {
  const navigation = useNavigation()
  const { userProfile, addPostToFavorites, userFavorites, removeFavorites } = useAuth();
  const { deletePost, addPlaceList, handleAddPlaceList } = usePost();

  const userLikedPost = postLikes.some((like) => like.user_id === userProfile?.user_id);
  const userFavoritedPost = userFavorites.filter((favorite) => parseInt(favorite.post_id) === parseInt(post_id));

  const [editPost, setEditPost] = useState<boolean>(false)

  const confirmDelete = () => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this post?',
      [
        {
          text: 'Cancel',
          onPress: () => {
            setEditPost(!editPost)
          },
          style: 'cancel'
        },
        {
          text: 'Delete',
          onPress: () => {
            deletePost(post_id ? post_id : '', userProfile?.user_id)
            setEditPost(!editPost)
          },
          style: 'destructive'
        }
      ],
      { cancelable: false }
    );
  };

  const toggleFavorite = () => {
    if (userFavoritedPost.length > 0) {
      const favorite = userFavoritedPost[0];
      removeFavorites(favorite.favorites_id);
    } else {
      addPostToFavorites(parseInt(post_id));
    }
  }



  return (
    <View className='flex flex-row w-full px-2 py-2 justify-between items-center'>
      <View className='w-full flex flex-row items-center mt-2 justify-between'>
        <View className='flex flex-row items-center'>
          {userLikedPost ? (
            <Heart className='mr-2' height={26} width={26} color='#e94f4e' fill='#e94f4e' />
          ) : (
            <Heart className='mr-2' height={26} width={26} color='white' />
          )}
          <Text className='mr-1 text-white text-base font-semibold'>{postLikes.length}</Text>
          <Text className='mr-2 text-white text-base'>Likes</Text>
        </View>
        <TouchableOpacity onPress={toggleFavorite}>
          <Bookmark height={26} width={26} color='white' fill={userFavoritedPost.length > 0 ? 'white' : 'none'} />
        </TouchableOpacity>
      </View>
      {
        editPost 
          ? <View className='absolute flex flex-col top-[-100px] right-1 z-10 rounded-lg' style={{backgroundColor: ColorGuide['bg-dark']}}>
              <TouchableOpacity onPress={handleAddPlaceList} className='flex flex-row items-row px-5 py-3'>
                <PlusSquare height={22} width={22} color={'white'}/>
                <Text className='text-white text-base font-semibold ml-2'>Add To list</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={confirmDelete} className='flex flex-row items-row px-5 py-3'>
                <Trash height={22} width={22} color={'white'}/>
                <Text className='text-white text-base font-semibold ml-2'>Delete</Text>
              </TouchableOpacity>
            </View>
          : <View></View>
      }
      {/* {
        post.user_id === userProfile?.user_id
          ? <TouchableOpacity onPress={() => {setEditPost(!editPost)}} className='p-1'>
              <MoreHorizontal height={26} width={26} color='white' />
            </TouchableOpacity>
          : null
      } */}
    </View>
  );
};

export default PostSubMenuNoEdit;
