import React from 'react';
import { Text, View } from 'react-native';
import { Bookmark, Heart, MessageSquare, MoreHorizontal } from 'react-native-feather';
import { useAuth } from '../../Context/UserContext';

interface LikesProps {
  created_at: string;
  like_id: number;
  post_id: number;
  user_id: string;
}

interface PostSumProps {
  postLikes: LikesProps[] | [];
}

const PostSubMenu: React.FC<PostSumProps> = ({ postLikes }) => {
  const { userProfile } = useAuth();

  const userLikedPost = postLikes.some((like) => like.user_id === userProfile?.user_id);

  return (
    <View className='flex flex-row w-full px-2 pt-4 justify-between'>
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
      <MoreHorizontal height={26} width={26} color='white' />
    </View>
  );
};

export default PostSubMenu;