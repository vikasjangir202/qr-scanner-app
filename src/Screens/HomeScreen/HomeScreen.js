import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Scanner from '../../components/scanner/Scanner';
import {createTable} from '../../Helpers/functions';

export default function HomeScreen({navigation}) {
  useEffect(() => {
    createTable();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Scanner navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
