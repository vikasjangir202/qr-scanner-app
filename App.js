import React from 'react';
import {SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/Screens/HomeScreen/HomeScreen';
import HistoryScreen from './src/Screens/HistoryScreen/HistoryScreen';
import GenerateScreen from './src/Screens/GenerateScreen/GenerateScreen';
import ScannedResult from './src/components/ScannedResult/ScannedResult';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="History" component={HistoryScreen} />
          <Stack.Screen name="Generate" component={GenerateScreen} />
          <Stack.Screen name="ScannedResult" component={ScannedResult} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
