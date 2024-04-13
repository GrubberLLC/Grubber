import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from 'react-native';

function App(): React.JSX.Element {
  return (
    <SafeAreaView className={`bg-neutral-900 h-full w-full`}>
      <StatusBar
        barStyle={'light-content'}
      />
      <View>
        <Text className={`m-2 text-lg text-white font-bold`}>Grubber</Text>
      </View>
    </SafeAreaView>
  );
}

export default App;

