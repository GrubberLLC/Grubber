import React, { useEffect, useState } from 'react'
import { Dimensions, Image, ScrollView, Switch, Text, View } from 'react-native'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../Types/NavigationTypes';
import ListHeader from '../../Components/Headers/ListHeader';
import ListDetailsHeader from '../../Components/Headers/ListDetailsHeader';
import { list } from 'aws-amplify/storage';
import { useList } from '../../Context/ListContext';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import PlaceTileDatabase from '../../Components/Tile/PlaceTileDatabase';
import PlaceListTile from '../../Components/Tile/PlaceListTile';
import ListSettingHeader from '../../Components/Headers/ListSettingHeader';
import { Edit } from 'react-native-feather';
import SelectGalleryImage from '../../Components/Select/SelectGalleryImage';
import LargeTextInputComponent from '../../Components/Inputs/LargeTextInputComponent';
import ColorGuide from '../../ColorGuide';

const screenWidth = Dimensions.get('screen').width
const screenHeight = screenWidth * .6

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'ListDetailScreen'>;

const ListSettingsScreen = () => {
  const route = useRoute<ProfileScreenRouteProp>()
  const params = route.params

  const [listName, setListName] = useState<string>(params.list.name)
  const [listDescription, setListDescription] = useState<string>(params.list.description)
  const [privacy, setPrivacy] = useState<boolean>(false)

  const updateListName = (text: string) => {
    setListName(text)
  }

  const updateListDescription = (text: string) => {
    setListDescription(text)
  }

  return (
    <View className={'flex-1'} style={{backgroundColor: ColorGuide['bg-dark']}}>
      <ListSettingHeader list_name={params.list.name} list_id={params.list.list_id} list={params.list}/>
      <View className='flex flex-row w-full'>
        <Image className='h-24 w-24' source={{uri: params.list.picture}}/>
        <View className='flex-1 border-y-2 border-y-neutral-800 pt-1 flex flex-row items-center'>
          <LargeTextInputComponent 
            value={listName} 
            onChange={updateListName} 
            placeholder='List Name...'
            capitalize='true'
            multiline={false}/>
        </View>
      </View>
      <View className='flex flex-row w-full'>
        <View className='flex-1 border-b-2 border-b-neutral-800 py-4 flex flex-row items-center'>
          <LargeTextInputComponent 
            value={listDescription} 
            onChange={updateListDescription} 
            placeholder='List Description...'
            capitalize='true'
            multiline={false}/>
        </View>
      </View>
      <View className='flex flex-row justify-between items-center px-4 pt-4'>
        <Text className='text-white text-2xl font-bold mr-4'>{params.list.name}</Text>
        <Edit height={20} width={20} color={'white'}/>
      </View>
      <View className='flex flex-row justify-between px-4 items-center pt-4'>
        <Text className='text-white text-base font-bold mr-4'>{params.list.description}</Text>
        <Edit height={20} width={20} color={'white'}/>
      </View>         
      <View className='w-full flex flex-row justify-between px-4 pt-4'>
        <Text className='text-white font-semibold text-xl'>Public: </Text>
        <Switch className='scale-75' value={params.list.public} onValueChange={() => {setPrivacy(!privacy)}} trackColor={{false: 'white', true: '#e94f4e'}}/>
      </View> 
    </View>
  )
}

export default ListSettingsScreen
