import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import NotificationHeader from '../../Components/Headers/NotificationHeader';
import { useAuth } from '../../Context/UserContext';
import ResultsProfile from '../../Components/Profiles/ResultsProfile';
import RequestProfile from '../../Components/Profiles/RequestProfile';
import ColorGuide from '../../ColorGuide';
import RequestFollowProfile from '../../Components/Profiles/RequestFollowProfile';
import ListRequestProfile from '../../Components/Profiles/ListRequestProfile';
// import tailwind from 'tailwind-rn'; // Ensure tailwind-rn is configured properly

const NotificationScreen = () => {
  const { userGroupRequest, pendingFollowRequests} = useAuth();

  return (
    <View className={'flex-1'} style={{backgroundColor: ColorGuide['bg-dark']}}>
      <NotificationHeader />
      <View className='flex-1 px-2'>
        {(userGroupRequest?.length > 0) && (
          <View className='max-h-1/2'>
            {userGroupRequest?.length > 0 && (
              <View>
                <Text className='text-white text-lg font-bold p-2'>List Requests:</Text>
                <ScrollView className='max-h-40'>
                  {userGroupRequest.map((request) => (
                    <View key={request.user_id}>
                      <ListRequestProfile request={request} />
                    </View>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
        )}
        {(pendingFollowRequests?.length > 0) && (
          <View className='max-h-1/2'>
            {
              pendingFollowRequests?.length > 0 && (
                <View className='mb-4'>
                  <Text className='text-white text-lg font-bold p-2' >Friend Requests:</Text>
                  <ScrollView className='max-h-40'>
                    {pendingFollowRequests.map((request) => {
                      return(
                        <View key={request.user_id}>
                          <RequestFollowProfile request={request}/>
                        </View>
                      )
                    })}
                  </ScrollView>
                </View>
              )
            }
          </View>
        )}
        <View className='flex-1'>
          <ScrollView className='flex-1'>
            {/* {activityList?.length > 0 &&
              activityList.map((activity) => (
                <View key={activity.user_id}>
                  <ResultsProfile profile={activity} />
                </View>
              ))} */}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default NotificationScreen;
