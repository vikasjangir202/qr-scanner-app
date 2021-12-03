import React, {useState, useEffect} from 'react';
import {Image, SafeAreaView, View, ActivityIndicator} from 'react-native';
import Scanner from '../../components/scanner/Scanner';
import {colors} from '../../Configs/Colors';
export default function HomeScreen({navigation}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={50} color={colors.yellow} />
        </View>
      ) : (
        <Scanner navigation={navigation} />
      )}
    </SafeAreaView>
  );
}
