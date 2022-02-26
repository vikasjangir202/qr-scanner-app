import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Header from '../../components/Header/Header';
import {colors} from '../../Helpers/Colors';

export default function SettingScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header title={'Settings'} />
      <View style={styles.settingsConatiner}>
        <TouchableOpacity style={styles.buttons}>
          <Text style={styles.buttonLabel}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttons}>
          <Text style={styles.buttonLabel}>Clear history</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttons}>
          <Text style={styles.buttonLabel}>Rate Us !</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.bottomText}>Made in India with ❤️</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray,
  },
  settingsConatiner: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
  },
  buttons: {
    width: '100%',
    backgroundColor: colors.darkGray,
    marginVertical: 7,
    borderRadius: 10,
  },
  buttonLabel: {
    color: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 17,
  },
  bottomText: {color: 'white', textAlign: 'center'},
});
