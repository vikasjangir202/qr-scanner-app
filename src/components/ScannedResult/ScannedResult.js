import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import BottomNav from '../BottomNav/BottomNav';
import {colors} from '../../Configs/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Clipboard from '@react-native-clipboard/clipboard';

export default function ScannedResult({route, navigation}) {
  const [copied, setCopied] = useState(false);
  let {data, type} = route.params;
  console.log(data, type);

  function handleCopy(str) {
    setCopied(true);
    Clipboard.setString(str);
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.headerText]}>Result</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.copy}>
          <Text style={{fontSize: 20, color: 'black'}}>{data}</Text>
          <TouchableOpacity onPress={() => handleCopy(data)}>
            <MaterialIcons
              name={copied ? 'check' : 'content-copy'}
              size={25}
              color={colors.yellow}
            />
          </TouchableOpacity>
        </View>
      </View>

      <BottomNav navigation={navigation} routeName="scannedResult" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    backgroundColor: colors.lightWhite,
  },
  header: {
    backgroundColor: colors.white,
    width: '100%',
    padding: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
    color: colors.black,
  },
  content: {
    backgroundColor: colors.white,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  copy: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.border,
  },
});
