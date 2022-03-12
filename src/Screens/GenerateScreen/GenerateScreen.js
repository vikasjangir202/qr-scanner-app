import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import GeneratableItemScreen from './GeneratableItemScreen';
import GenerateContact from './ItemScreens/GenerateContact';
import GeneratePhone from './ItemScreens/GeneratePhone';
import GenerateSMS from './ItemScreens/GenerateSMS';
import GenerateEmail from './ItemScreens/GenerateEmail';

const Stack = createNativeStackNavigator();

export default function GenerateScreen({navigation}) {
  return (
    <Stack.Navigator
      initialRouteName="generatableItemScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="generatableItemScreen"
        component={GeneratableItemScreen}
      />
      <Stack.Screen name="contact" component={GenerateContact} />
      <Stack.Screen name="phone" component={GeneratePhone} />
      <Stack.Screen name="message" component={GenerateSMS} />
      <Stack.Screen name="email" component={GenerateEmail} />
    </Stack.Navigator>
  );
}
