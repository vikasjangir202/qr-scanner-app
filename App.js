import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
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
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            tabBarStyle: {backgroundColor: colors.darkGray, borderWidth: 0},
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
              title: 'Scan',
              tabBarActiveTintColor: colors.yellow,
              tabBarInactiveTintColor: colors.lightGray,
              tabBarIcon: tabInfo => {
                return (
                  <MaterialCommunityIcons
                    name="barcode-scan"
                    size={25}
                    color={tabInfo.focused ? colors.yellow : colors.lightGray}
                  />
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
  middleIcon: {
    backgroundColor: colors.yellow,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.darkGray,
  },
});
