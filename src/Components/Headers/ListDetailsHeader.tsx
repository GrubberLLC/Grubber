import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../Context/UserContext';
import { ChevronsLeft, PlusSquare, Settings, Zap, Bookmark as BookmarkOutline, Bookmark as BookmarkFilled } from 'react-native-feather'; // Adjust imports for filled bookmark icon
import { useNavigation } from '@react-navigation/native';
import ColorGuide from '../../ColorGuide';
import { useList } from '../../Context/ListContext';

interface ListDetailHeaderProp {
  list_name: string;
  list_id: number;
  list: any;
  listMembers: any[];
}

const ListDetailsHeader: React.FC<ListDetailHeaderProp> = ({ list_name, list_id, list, listMembers }) => {
  const navigation = useNavigation();
  const { userProfile, addListToFavorites, userFavorites, removeFavorites, getFavorites } = useAuth(); // Including addListToFavorites, userFavorites, removeFavorites, and getFavorites from useAuth

  const { placesInSelectList } = useList();

  useEffect(() => {
    // Fetch the updated list of favorites whenever the component mounts or updates
    getFavorites(userProfile.user_id);
  }, [userProfile?.user_id, getFavorites]);

  const redirectToNewList = () => {
    navigation.navigate('ListSettingsScreen', { list: list });
  };

  const redirectToAddPlace = () => {
    navigation.navigate('SearchPlaceListScreen', { list_id: list_id, list: list });
  };

  const getRandomIndex = (length: number) => {
    return Math.floor(Math.random() * length);
  };

  const redirectToRandomPlace = () => {
    if (placesInSelectList.length > 0) {
      const randomIndex = getRandomIndex(placesInSelectList.length);
      const randomPlace = placesInSelectList[randomIndex];
      navigation.navigate('PlaceDetailsScreenList', { place_id: randomPlace.place_id });
    } else {
      console.error('No places in the selected list.');
    }
  };

  const limitString = (text: string, min = 22): string => {
    if (text.length > min) {
      return text.substring(0, min) + '...';
    }
    return text;
  };

  const isMemberOrOwner = listMembers.find(member => member.user_id === userProfile.user_id && member.status === 'active');

  const isFavorite = userFavorites.find(favorite => favorite.list_id === list_id);
  const favoriteId = isFavorite ? isFavorite.favorites_id : null;

  const handleRemoveFavorite = async (favoriteId) => {
    await removeFavorites(favoriteId);
    getFavorites(userProfile.user_id); // Fetch updated favorites after removing
  };

  return (
    <View className='h-16 w-full px-4 flex flex-row items-center justify-between border-b-2 border-b-neutral-800' style={{ backgroundColor: ColorGuide['bg-dark'] }}>
      <TouchableOpacity onPress={() => { navigation.goBack(); }} className='flex flex-row items-center'>
        <ChevronsLeft height={24} width={24} color={'white'} className='mr-2' />
        <Text className='text-white text-xl font-extrabold'>{limitString(list_name)}</Text>
      </TouchableOpacity>
      <View className='flex flex-row items-center'>
        <TouchableOpacity className='mr-4' onPress={redirectToRandomPlace}>
          <Zap height={24} width={24} color={'white'} />
        </TouchableOpacity>
        {isMemberOrOwner ? (
          <>
            <TouchableOpacity className='mr-4' onPress={redirectToAddPlace}>
              <PlusSquare height={24} width={24} color={'white'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={redirectToNewList}>
              <Settings height={24} width={24} color={'white'} />
            </TouchableOpacity>
          </>
        ) : (
          <>
            {isFavorite ? (
              <TouchableOpacity className='' onPress={() => { handleRemoveFavorite(favoriteId); }}>
                <BookmarkFilled height={24} width={24} color={'white'} fill={'white'}/> 
              </TouchableOpacity>
            ) : (
              <TouchableOpacity className='' onPress={() => { addListToFavorites(list_id); }}>
                <BookmarkOutline height={24} width={24} color={'white'} /> 
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
    </View>
  );
};

export default ListDetailsHeader;
