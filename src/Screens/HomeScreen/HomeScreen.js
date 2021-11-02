import React from 'react';
import {SafeAreaView} from 'react-native';
import Scanner from '../../components/scanner/Scanner';

export default function HomeScreen({navigation}) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Scanner navigation={navigation} />
    </SafeAreaView>
  );
}
