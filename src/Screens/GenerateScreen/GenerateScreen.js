import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import BottomNav from '../../components/BottomNav/BottomNav';
import {colors} from '../../Configs/Colors';
import {itemList} from '../../Configs/ItemList';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function GenerateScreen({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.headerText]}>Generate</Text>
      </View>

      <View style={styles.content}>
        <FlatList
          data={itemList}
          renderItem={({item}) => (
            <View style={styles.itemContainer}>
              <View style={[styles.icon, {backgroundColor: item.color}]}>
                <TouchableOpacity onPress={() => alert(item.label)}>
                  <MaterialIcons
                    name={item.iconName}
                    size={20}
                    color={colors.white}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.item}>{item.label}</Text>
            </View>
          )}
          keyExtractor={item => item.label}
          numColumns={2}
          columnWrapperStyle={{flex: 1, justifyContent: 'center'}}
        />
      </View>

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
  itemContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '45%',
    padding: 25,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 5,
    margin: 10,
  },
  icon: {
    borderRadius: 50,
    padding: 10,
  },
  item: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});
