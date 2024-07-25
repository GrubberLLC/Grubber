import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../Types/NavigationTypes';
import ListSettingHeader from '../../Components/Headers/ListSettingHeader';
import ListProfile from '../../Components/Profiles/ListProfile';
import AddMemberHeader from '../../Components/Headers/AddMemberHeader';
import SearchBarComponent from '../../Components/Search/SearchBarComponent';
import MenuSubButtonComponent from '../../Components/Buttons/MenuSubButtonComponent';
import { useList } from '../../Context/ListContext';
import { useAuth } from '../../Context/UserContext';
import ResultsProfile from '../../Components/Profiles/ResultsProfile';
import AddMemberProfile from '../../Components/Profiles/AddMemberProfile';
import ColorGuide from '../../ColorGuide';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = screenWidth * 0.7;

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'ListDetailScreen'>;

interface MemberProps {
  bio: string;
  created_at: string;
  email: string;
  first_name: string;
  followers: number;
  following: number;
  full_name: string;
  last_name: string;
  list_id: number;
  location: string;
  member_id: number;
  nickname: string;
  notifications: boolean;
  phone: string;
  profile_id: string;
  profile_picture: string;
  public: boolean;
  sent_request: string;
  status: string;
  type: string;
  user_id: string;
  username: string;
}

interface UserProfile {
  user_id: string;
  username: string;
  email: string;
  phone: string;
  location: string;
  first_name: string;
  last_name: string;
  full_name: string;
  profile_picture: string | null;
  bio: string | null;
  public: number;
  followers: number;
  following: number;
  notifications: boolean;
  fcmtoken: string
}

const ListSettingsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<ProfileScreenRouteProp>();
  const params = route.params;

  const { getAllListMembers, listMembers, loadingListMembers, addSelectedMembersList, addMember, handleAddMember } = useList();
  const { allProfiles } = useAuth();

  const [search, setSearch] = useState<string>('');
  const [userList, setUserList] = useState<UserProfile[]>([]);

  useEffect(() => {
    getAllListMembers(params.list.list_id);
  }, [params.list.list_id]);

  // useEffect(() => {
  //   const filteredProfiles = allProfiles.filter(
  //     (profile) => !listMembers.some((member) => member.user_id === profile.user_id)
  //   );
  //   setUserList(filteredProfiles);
  // }, [allProfiles, listMembers]);

  const updateSearch = (text: string) => {
    setSearch(text);
    setUserList([])
    filterUserByUsername(text);
  };

  const filterUserByUsername = (text: string) => {
    if (text.length > 0) {
      const filteredUsers = allProfiles.filter((profile) => profile.username.toLowerCase().includes(text.toLowerCase()));
      setUserList(filteredUsers);
    }
  };

  return (
    <View className={'flex-1'} style={{backgroundColor: ColorGuide['bg-dark']}}>
      <ListSettingHeader list_name={params.list.name} list_id={params.list.list_id} list={params.list} />
      <View style={{ height: screenHeight, width: screenWidth, backgroundColor: ColorGuide.primary }} className='bg-red-300'>
        <Image className='flex-1' source={{ uri: params.list.picture }} />
        <View
          style={{ backgroundColor: 'rgba(0, 0, 0, .5)', height: screenHeight, width: screenWidth }}
          className='absolute z-5 flex flex-col justify-between p-2'
        >
          <View className='flex flex-row justify-start'>
            <Text className='text-white text-base font-bold'>{params.list.public ? 'Public' : 'private'}</Text>
          </View>
          <View>
            <View className='flex flex-row items-center'>
              <Text className='text-white text-2xl font-bold mr-4'>{params.list.name}</Text>
            </View>
            <View className='flex flex-row items-center'>
              <Text className='text-white text-base font-bold mr-4'>{params.list.description}</Text>
            </View>
          </View>
        </View>
      </View>
      <View className='px-2 py-4 flex flex-row justify-between items-center'>
        <Text className='text-white text-2xl font-semibold'>Members: </Text>
        <TouchableOpacity onPress={handleAddMember}>
          <Text className='text-white text-base text-[#e94f4e] font-semibold'>Add Member</Text>
        </TouchableOpacity>
      </View>
      <ScrollView className='flex-1'>
        {loadingListMembers ? (
          <ActivityIndicator size={'large'} color={'white'} />
        ) : (
          <View>
            {listMembers.map((member: MemberProps) => {
              return(
                <View key={member.user_id}>
                  <ListProfile profile={member} />
                </View>
              )
            })}
          </View>
        )}
      </ScrollView>
      <Modal animationType='slide' transparent={false} visible={addMember}>
        <SafeAreaView className='flex-1' style={{backgroundColor: ColorGuide['bg-dark']}}>
          <View className='flex-1'>
            <AddMemberHeader closeModal={handleAddMember} />
            <View className='h-20 p-2'>
              <SearchBarComponent term={search} updateTerm={updateSearch} icon='Search' placeholder='Search Username...' />
            </View>
            <ScrollView className='flex-1'>
              {
                userList.map((user) => (
                  <View key={user.user_id} className='p-2 border-b border-gray-700'>
                    <AddMemberProfile profile={user} />
                  </View>
                ))
              }
            </ScrollView>
            <MenuSubButtonComponent justify='end' label='Add Members' handleFunction={() => {addSelectedMembersList(params.list.list_id, navigation, params.list)}} />
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

export default ListSettingsScreen;
