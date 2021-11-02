import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../Configs/Colors';
import {itemStyle} from '../../Configs/ItemStyle';

export default function ScannedTab() {
  const [scannedItems, setscannedItems] = useState([
    {
      id: 0,
      itemType: 'email',
      content: 'vikasjangir202@gmail.com',
      created_at: '2021-09-21',
    },
    {
      id: 1,
      itemType: 'contact',
      content: 'vikas jangir mob- 7073230332',
      created_at: '2021-09-21',
    },
    {
      id: 2,
      itemType: 'phone_number',
      content: '+917597707546',
      created_at: '2021-12-01',
    },
    {
      id: 3,
      itemType: 'message',
      content: 'hello lorem ipsum so lem sa kiten',
      created_at: '2021-09-21',
    },
    {
      id: 4,
      itemType: 'url',
      content: 'rajwoodenarthouse.com',
      created_at: '2021-09-15',
    },
    {
      id: 5,
      itemType: 'wifi',
      content: 'SKYNET INFONET',
      created_at: '2021-03-15',
    },
    {
      id: 6,
      itemType: 'clipboard',
      content: 'just a copied string ',
      created_at: '2021-05-07',
    },
    {
      id: 7,
      itemType: 'location',
      content: '432432.34.54.54.2.4.45.45..',
      created_at: '2021-11-29',
    },
    {
      id: 8,
      itemType: 'wifi',
      content: 'BSNL 5g',
      created_at: '2021-29-15',
    },
  ]);

  return (
    <ScrollView style={{width: '100%', padding: 20, height: '70%'}}>
      {scannedItems &&
        scannedItems.map(item => (
          <View key={item.id} style={styles.itemCard}>
            <View style={styles.left}>
              <View
                style={[
                  styles.icon,
                  {backgroundColor: itemStyle[item.itemType].color},
                ]}>
                <MaterialIcons
                  name={itemStyle[item.itemType].iconName}
                  size={20}
                  color={colors.white}
                />
              </View>
              <View style={styles.typeAndContent}>
                <Text style={{fontWeight: 'bold', fontSize: 16}}>
                  {itemStyle[item.itemType].label}
                </Text>
                <Text>{item.content}</Text>
              </View>
            </View>

            <View style={styles.arrow}>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={20}
                color={colors.lightGray}
              />
            </View>
          </View>
        ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  itemCard: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: colors.border,
    padding: 18,
    marginVertical: 10,
    borderRadius: 5,
  },
  left: {
    display: 'flex',
    flexDirection: 'row',
  },
  icon: {
    borderRadius: 50,
    padding: 10,
    marginRight: 16,
  },
});
