import React from 'react';
import {View, StyleSheet} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {colors} from '../../Helpers/Colors';
import ScannedHistoryScreen from './ScannedHistoryScreen';
import GeneratedHistoryScreen from './GeneratedHistoryScreen';
import FavouriteHistoryScreen from './FavouriteHistoryScreen';
import Header from '../../components/Header/Header';

const Tab = createMaterialTopTabNavigator();

export default function HistroyTabs() {
  return (
    <>
      <View style={styles.container}>
        <Header title={'History'} />
      </View>
      <Tab.Navigator
        initialRouteName="scannedHistory"
        tabBarPosition="top"
        tabBarActiveTintColor="red"
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: 12,
            textTransform: 'none',
          },
          tabBarStyle: {
            backgroundColor: colors.darkGray,
          },
          tabBarIndicatorStyle: {backgroundColor: colors.yellow, height: 2},
        }}>
        <Tab.Screen
          name="scannedHistory"
          options={{
            title: 'Scanned',
            tabBarActiveTintColor: colors.white,
            tabBarInactiveTintColor: colors.lightGray,
          }}
          component={ScannedHistoryScreen}
        />
        <Tab.Screen
          name="generatedHistory"
          options={{
            title: 'Generated',
            tabBarActiveTintColor: colors.white,
            tabBarInactiveTintColor: colors.lightGray,
          }}
          component={GeneratedHistoryScreen}
        />

        <Tab.Screen
          name="favouriteHistory"
          options={{
            title: 'Favourites',
            tabBarActiveTintColor: colors.white,
            tabBarInactiveTintColor: colors.lightGray,
          }}
          component={FavouriteHistoryScreen}
        />
      </Tab.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.gray,
  },
});
