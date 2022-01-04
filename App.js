/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView, StyleSheet, View, useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './src/Screens/HomeScreen/HomeScreen';
import GenerateScreen from './src/Screens/GenerateScreen/GenerateScreen';
import HistroyTabs from './src/Screens/HistoryScreen/HistroyTabs';
import {colors} from './src/Helpers/Colors';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

function App() {
  const colorScheme = useColorScheme() === 'light' ? 1 : 0;

  return (
    <SafeAreaView style={[styles.container]}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              backgroundColor: colors.darkGray,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              paddingBottom: 10,
              paddingTop: 10,
              height: 60,
              borderTopColor: 'transparent',
              marginHorizontal: 10,
              position: 'absolute',
              left: 10,
              right: 10,
            },
          }}>
          <Tab.Screen
            options={{
              title: 'History',
              tabBarActiveTintColor: colors.yellow,
              tabBarInactiveTintColor: colors.lightGray,
              tabBarIcon: tabInfo => {
                return (
                  <Octicons
                    name="history"
                    size={25}
                    color={tabInfo.focused ? colors.yellow : colors.lightGray}
                  />
                );
              },
            }}
            name="HistroyTabs"
            component={HistroyTabs}
          />
          <Tab.Screen
            options={{
              title: '',
              tabBarActiveTintColor: colors.yellow,
              tabBarInactiveTintColor: colors.lightGray,
              tabBarIcon: tabInfo => {
                return (
                  <View
                    style={{
                      position: 'absolute',
                      bottom: 4, // space from bottombar
                      height: 60,
                      width: 60,
                      borderRadius: 50,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: colors.darkGray,
                      borderColor: colors.yellow,
                      borderWidth: 2,
                    }}>
                    <MaterialCommunityIcons
                      name="barcode-scan"
                      size={30}
                      color={tabInfo.focused ? colors.yellow : colors.lightGray}
                    />
                  </View>
                );
              },
            }}
            name="Home"
            component={HomeScreen}
          />
          <Tab.Screen
            options={{
              title: 'Generate',
              tabBarActiveTintColor: colors.yellow,
              tabBarInactiveTintColor: colors.lightGray,
              tabBarIcon: tabInfo => {
                return (
                  <MaterialCommunityIcons
                    name="view-grid-plus-outline"
                    size={25}
                    color={tabInfo.focused ? colors.yellow : colors.lightGray}
                  />
                );
              },
            }}
            name="Generate"
            component={GenerateScreen}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
