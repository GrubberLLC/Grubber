import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Grid, Home, List } from 'react-native-feather';
import ColorGuide from '../../ColorGuide';
import NoMenuPageHeader from '../../Components/Headers/NoMenuPageHeader';
import { useAuth } from '../../Context/UserContext';
import PlaceYelpTileSearch from '../../Components/Tile/PlaceYelpTileSearch';
import { useNavigation } from '@react-navigation/native';
import PlaceTileDatabase from '../../Components/Tile/PlaceTileDatabase';

const FavoritesScreen = () => {
  const  navigation = useNavigation()
  const { favoritesView, setFavoritesView, userFavorites } = useAuth();

  const redirectToPostScreen = (post) => {
    navigation.navigate('PostDetailsScreen');
  };

  const renderFavorites = () => {
    switch (favoritesView) {
      case 'Posts':
        return userFavorites
          .filter((favorite) => favorite.post_id !== null)
          .map((favorite, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => redirectToPostScreen(favorite)}
            >
              <View className='p-1'>
                <Image className='w-1/3 h-32' source={{uri: favorite.media}}/>
              </View>
            </TouchableOpacity>
          ));
      case 'Places':
        return userFavorites
          .filter((favorite) => favorite.place_id !== null)
          .map((favorite, index) => {
            console.log(favorite)
            return(
              <TouchableOpacity key={index}>
                <View className='mb-3'>
                  <PlaceTileDatabase place={favorite}/>
                </View>
              </TouchableOpacity>
            )
          }
        );
      case 'Places':
        return userFavorites
          .filter((favorite) => favorite.place_id !== null)
          .map((favorite, index) => {
            console.log(favorite)
            return(
              <TouchableOpacity key={index}>
                <View className='mb-3'>
                  <PlaceTileDatabase place={favorite}/>
                </View>
              </TouchableOpacity>
            )
          }
        );
      default:
        return null;
    }
  };

  return (
    <View className={'flex-1'} style={{ backgroundColor: ColorGuide['bg-dark'] }}>
      <NoMenuPageHeader backing={true} leftLabel='Favorites' />
      <View className='w-full flex flex-row items-center mt-6'>
        <TouchableOpacity
          onPress={() => { setFavoritesView('Posts'); }}
          className={`flex flex-row items-center flex-1 justify-center pb-3 border-b-2`}
        >
          <Grid height={24} width={24} color={favoritesView === 'Posts' ? '#e94f4e' : 'white'} />
          <Text className='text-white text-xl font-semibold ml-2' style={{ color: favoritesView === 'Posts' ? ColorGuide.primary : 'white' }}>
            Posts
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { setFavoritesView('Places'); }}
          className={`flex flex-row items-center flex-1 justify-center pb-3 border-b-2`}
        >
          <Home height={24} width={24} color={favoritesView === 'Places' 
                                                ? '#e94f4e' 
                                                : 'white'} />
          <Text className='text-white text-xl font-semibold ml-2' style={{ color: favoritesView === 'Places' ? ColorGuide.primary : 'white' }}>
            Places
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { setFavoritesView('Lists'); }}
          className={`flex flex-row items-center flex-1 justify-center pb-3 border-b-2`}
        >
          <List height={24} width={24} color={favoritesView === 'Lists' 
                                                ? '#e94f4e' 
                                                : 'white'} />
          <Text className='text-white text-xl font-semibold ml-2' style={{ color: favoritesView === 'Lists' ? ColorGuide.primary : 'white' }}>
            Lists
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView className='flex-1'>
        {renderFavorites()}
      </ScrollView>
    </View>
  );
};

export default FavoritesScreen;
