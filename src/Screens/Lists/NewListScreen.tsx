import React, { useState } from 'react'
import { Text, TextInputComponent, View } from 'react-native'
import SelectGalleryImageFlex from '../../Components/Select/SelectGalleryImageFlex'
import SelectedImageComponent from '../../Components/Images/SelectedImageComponent';
import { useList } from '../../Context/ListContext';
import NoMenuPageHeader from '../../Components/Headers/NoMenuPageHeader';
import LargeTextInputComponent from '../../Components/Inputs/LargeTextInputComponent';
import { Users, ChevronsRight } from 'react-native-feather';
import SearchBarComponent from '../../Components/Search/SearchBarComponent';
import { ScrollView, Switch } from 'react-native-gesture-handler';
import { useAuth } from '../../Context/UserContext';
import ProfileHeader from '../../Components/Headers/ProfileHeader';
import PostProfile from '../../Components/Profiles/PostProfile';
import ResultsProfile from '../../Components/Profiles/ResultsProfile';
import IconLoadingButtonComponent from '../../Components/Buttons/IconLoadingButtonComponent';
import MenuSubButtonComponent from '../../Components/Buttons/MenuSubButtonComponent';
import { useNavigation } from '@react-navigation/native';
import ColorGuide from '../../ColorGuide';

interface UserProfile {
  user_id: string;
  username: string;
  email: string;
  phone: string,
  location: string;
  first_name: string;
  last_name: string;
  full_name: string;
  profile_picture: string | null;
  bio: string | null;
  public: number;
  followers: number;
  following: number
}

const NewListScreen = () => {
  const navigation = useNavigation()

  const {listPicture, updatePicture, listName, updateListName, 
    listDescription, updateListDescription, createList, 
    currentlyUploading, listPublic, updateListPublic} = useList()
  const {allProfiles} = useAuth()

  const [term, setTerm] = useState<string>('')
  const [users, setUsers] = useState<UserProfile[] | null>(null)

  const checkUsers = (text: string) => {
    const filteredUsers = allProfiles?.filter((profile) =>
      profile.username.toLowerCase().includes(text.toLowerCase())
    );
    setUsers(filteredUsers ? filteredUsers : null);
  }

  const updateTerm = (text: string) => {
    setTerm(text)
    checkUsers(text)
  }

  const submitList = () => {
    createList(navigation)
  }

  return (
    <View className={'flex-1'} style={{backgroundColor: ColorGuide['bg-dark']}}>
      <NoMenuPageHeader backing={true} leftLabel='New list'/>
      <View className='flex flex-row w-full'>
        <SelectGalleryImageFlex picture={listPicture} selectingImage={updatePicture} size={92}/>
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
      <View className='flex flex-row w-full justify-between p-2'>
        <Text className='text-white text-lg'>Public</Text>
        <Switch
          className="scale-85"
          onValueChange={updateListPublic}
          trackColor={{false: '#fafafa', true: '#e94f4e'}}
          value={listPublic}
        />
      </View>
      <Text className='text-white text-xl font-semibold p-2'>Add Members:</Text>
      <View className='h-16 m-2'>
        <SearchBarComponent term={term} updateTerm={updateTerm} icon='Search' placeholder='search users...'/>
      </View>
      <ScrollView className='flex-1 px-2'>
        {
          users?.map((user: UserProfile) => {
            return(
              <View key={user.user_id}>
                <ResultsProfile profile={user}/>
              </View>
            )
          })
        }
      </ScrollView>
      <MenuSubButtonComponent loading={currentlyUploading} handleFunction={submitList} justify='end' label='Create List'/>
    </View>
  )
}

export default NewListScreen
