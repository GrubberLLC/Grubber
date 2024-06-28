import React, { useState } from 'react'
import { Text, TextInputComponent, View } from 'react-native'
import SelectGalleryImageFlex from '../../Components/Select/SelectGalleryImageFlex'
import NoMenuPageHeader from '../../Components/Headers/NoMenuPageHeader';
import LargeTextInputComponent from '../../Components/Inputs/LargeTextInputComponent';
import { ScrollView, Switch } from 'react-native-gesture-handler';
import MenuSubButtonComponent from '../../Components/Buttons/MenuSubButtonComponent';
import ColorGuide from '../../ColorGuide';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../Types/NavigationTypes';
import { useAuth } from '../../Context/UserContext';
import { useList } from '../../Context/ListContext';

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'EditListScreen'>;

interface PictureProps {
  uri: string,
  fileName: string,
  fileType: string
}

interface EditScreenProps {
  post: any
}

const EditListScreen: React.FC<EditScreenProps> = () => {
  const route = useRoute<ProfileScreenRouteProp>();
  const params = route.params
  const navigation = useNavigation()

  const {currentlyUploading, updateListDetails} = useList()

  const [listName, setListName] = useState<string>(params.list.name)
  const [listDescription, setListDescription] = useState<string>(params.list.description)
  const [listPicture, setListPicture] = useState<any>({
    uri: params.list.picture,
    fileType: 'image/jpeg',
    fileName: params.list.picture,
  })
  const [listPublic, setListPublic] = useState<boolean>(params.list.public)

  const updateListName = (text: string) => {
    setListName(text)
  }

  const updateListDescription = (text: string) => {
    setListDescription(text)
  }

  const updateListPublic = () => {
    setListPublic(!listPublic)
  }

  const updatePicture = (picutre: PictureProps) => {
    setListPicture(picutre)
  }

  const submitUpdatedList = () => {
    updateListDetails(params.list.list_id, listName, listDescription, listPicture.uri, listPublic, navigation, params.list)
  }

  return (
    <View className={'flex-1'} style={{backgroundColor: ColorGuide['bg-dark']}}>
      <NoMenuPageHeader backing={true} leftLabel='New list'/>
      <View className='w-full flex flex-row py-4 justify-center'>
        <View className='rounded-full overflow-hidden'>
          <SelectGalleryImageFlex picture={listPicture} selectingImage={updatePicture} size={92}/>
        </View>
      </View>
      <View className='flex flex-row w-full'>
        <View className='flex-1 border-y-2 py-4 flex flex-row items-center px-2'>
          <Text className='text-white text-lg font-bold'>Name: </Text>
          <LargeTextInputComponent 
            value={listName} 
            onChange={updateListName} 
            placeholder='List Name...'
            capitalize='true'
            multiline={false}/>
        </View>
      </View>
      <View className='flex flex-row w-full'>
        <View className='flex-1 border-y-2 py-4 flex flex-row items-center px-2'>
          <Text className='text-white text-lg font-bold'>Description: </Text>
          <LargeTextInputComponent 
            value={listDescription} 
            onChange={updateListDescription} 
            placeholder='List Description...'
            capitalize='true'
            multiline={false}/>
        </View>
      </View>
      <View className='flex flex-row w-full justify-between py-4 px-2'>
        <Text className='text-white text-lg font-bold'>Public</Text>
        <Switch
          className="scale-85"
          onValueChange={updateListPublic}
          trackColor={{false: '#fafafa', true: '#e94f4e'}}
          value={listPublic}
        />
      </View>
      <View className='flex-1'></View>
      <MenuSubButtonComponent loading={currentlyUploading} handleFunction={submitUpdatedList} justify='end' label='Update List'/>
    </View>
  )
}

export default EditListScreen
