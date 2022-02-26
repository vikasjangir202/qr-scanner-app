import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './src/Screens/HomeScreen/HomeScreen';
import GenerateScreen from './src/Screens/GenerateScreen/GenerateScreen';
import SettingScreen from './src/Screens/SettingScreen/SettingScreen';
import HistroyTabs from './src/Screens/HistoryScreen/HistroyTabs';
import {colors} from './src/Helpers/Colors';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SplashScreen from 'react-native-splash-screen';

const Tab = createBottomTabNavigator();

function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
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
              position: 'absolute',
              left: 5,
              right: 5,
            },
          }}>
          <Tab.Screen
            options={{
              title: 'Scan',
              tabBarActiveTintColor: colors.yellow,
              tabBarInactiveTintColor: colors.lightGray,
              tabBarIcon: tabInfo => {
                return (
                  <View>
                    <AntDesign
                      name="scan1"
                      size={25}
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
              title: 'Settings',
              tabBarActiveTintColor: colors.yellow,
              tabBarInactiveTintColor: colors.lightGray,
              tabBarIcon: tabInfo => {
                return (
                  <AntDesign
                    name="setting"
                    size={25}
                    color={tabInfo.focused ? colors.yellow : colors.lightGray}
                  />
                );
              },
            }}
            name="SettingScreen"
            component={SettingScreen}
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
  middleIcon: {
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
  },
});
