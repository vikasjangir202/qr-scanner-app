import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import BottomNav from '../../components/BottomNav/BottomNav';
import {colors} from '../../Configs/Colors';

export default function GenerateScreen({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text
          style={[
            styles.headerText,
            {
              fontSize: 20,
            },
          ]}>
          Generate
        </Text>
      </View>

      <View style={styles.content}></View>

      <BottomNav navigation={navigation} routeName="generate" />
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
    fontSize: 18,
    color: colors.black,
  },
  content: {
    backgroundColor: colors.white,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannedGenerated: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    padding: 3,
  },
  middleBorder: {width: 2, backgroundColor: colors.border},
  Topbuttons: {
    padding: 8,
  },
});
