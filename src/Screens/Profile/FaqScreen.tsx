import React from 'react';
import { Text, View } from 'react-native';
import ColorGuide from '../../ColorGuide';
import NoMenuPageHeader from '../../Components/Headers/NoMenuPageHeader';
import { useAuth } from '../../Context/UserContext';
import { ScrollView } from 'react-native-gesture-handler';
import { questions } from '../../Utils'; // Correct import
import MenuSubButtonComponent from '../../Components/Buttons/MenuSubButtonComponent';
import { useNavigation } from '@react-navigation/native';

const FaqScreen = () => {
  const navigation = useNavigation()

  return (
    <View className='flex-1' style={{ backgroundColor: ColorGuide['bg-dark'] }}>
      <NoMenuPageHeader leftLabel={'FAQ\'s'} backing={true}/>
      <ScrollView className='w-full flex flex-col px-2'>
        {
          questions.map((question: any, index: number) => (
            <View key={index} className='mb-4'>
              <Text className='text-white text-xl font-semibold py-3'>{question.question}</Text>
              {
                question.answer.map((answer: any, answerIndex: number) => (
                  <View key={answerIndex} className='mt-4 ml-4'>
                    <Text className='text-white text-base'>{answerIndex + 1}. {answer}</Text>
                  </View>
                ))
              }
            </View>
          ))
        }
      </ScrollView>
      <MenuSubButtonComponent justify='center' label='Contact Support' handleFunction={() => {navigation.navigate('ContactUsScreen')}}/>
    </View>
  );
};

export default FaqScreen;
