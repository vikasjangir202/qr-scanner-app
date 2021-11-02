import React from 'react';
import {View, Text} from 'react-native';
import BottomNav from '../../components/BottomNav/BottomNav';

export default function GenerateScreen({navigation}) {
  return (
    <View style={{display: 'flex', flex: 1}}>
      <Text>GenerateScreen</Text>
      <BottomNav navigation={navigation} routeName="generate" />
    </View>
  );
}
