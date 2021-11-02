import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import BottomNav from '../../components/BottomNav/BottomNav';
import GeneratedTab from '../../components/HistoryTabs/GeneratedTab';
import ScannedTab from '../../components/HistoryTabs/ScannedTab';
import {colors} from '../../Configs/Colors';

export default function HistoryScreen({navigation}) {
  const [card, setCardType] = useState('scanned');
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
          History
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.scannedGenerated}>
          <TouchableOpacity
            onPress={() => setCardType('scanned')}
            style={[
              styles.Topbuttons,
              {borderBottomWidth: card === 'scanned' ? 2 : 0},
            ]}>
            <Text style={styles.headerText}>Scanned</Text>
          </TouchableOpacity>
          <View style={styles.middleBorder} />
          <TouchableOpacity
            onPress={() => setCardType('generated')}
            style={[
              styles.Topbuttons,
              {borderBottomWidth: card === 'generated' ? 2 : 0},
            ]}>
            <Text
              style={[
                styles.headerText,
                {
                  color: card === 'generated' ? colors.black : colors.lightGray,
                },
              ]}>
              Generated
            </Text>
          </TouchableOpacity>
        </View>
        {card === 'scanned' ? <ScannedTab /> : <GeneratedTab />}
      </View>

      <BottomNav navigation={navigation} routeName="history" />
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
