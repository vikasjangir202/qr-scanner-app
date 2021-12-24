import React from 'react';
import {View, StyleSheet, useColorScheme} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {colors} from '../../Helpers/Colors';
import ScannedHistoryScreen from './ScannedHistoryScreen';
import GeneratedHistoryScreen from './GeneratedHistoryScreen';
import Header from '../../components/Header/Header';

const Tab = createMaterialTopTabNavigator();

export default function HistroyTabs({navigation}) {
  const colorScheme = useColorScheme() === 'light' ? 1 : 0;
  return (
    <>
      <View
        style={[
          styles.container,
          {backgroundColor: colorScheme ? colors.lightWhite : colors.gray},
        ]}>
        <Header />
      </View>
      <Tab.Navigator
        initialRouteName="scannedHistory"
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: 12,
            color: colorScheme ? colors.black : colors.white,
          },
          tabBarStyle: {
            backgroundColor: colorScheme ? colors.white : colors.darkGray,
          },
          tabBarIndicatorStyle: {backgroundColor: colors.yellow, height: 2},
        }}>
        <Tab.Screen
          name="scannedHistory"
          options={{title: 'Scanned'}}
          component={ScannedHistoryScreen}
        />
        <Tab.Screen
          name="generatedHistory"
          options={{title: 'Generated'}}
          component={GeneratedHistoryScreen}
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
  },
});
