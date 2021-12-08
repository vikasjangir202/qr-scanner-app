import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../Configs/Colors';

export default function BottomNav({navigation, routeName}) {
  return (
    <View style={styles.overlay}>
      <View style={styles.bottomOverlay}>
        <TouchableOpacity
          style={styles.navButtons}
          onPress={() => navigation.navigate('History')}>
          <Octicons
            name="history"
            size={25}
            color={routeName === 'history' ? colors.yellow : colors.lightGray}
          />

          <Text
            style={[
              styles.navLabel,
              {
                color:
                  routeName === 'history' ? colors.yellow : colors.lightGray,
              },
            ]}>
            History
          </Text>
        </TouchableOpacity>

        <View style={styles.middleButton}>
          <TouchableOpacity
            style={styles.navButtons}
            onPress={() => navigation.navigate('Home')}>
            <MaterialCommunityIcons
              name="qrcode-scan"
              size={30}
              color={colors.darkGray}
              style={styles.middleIcon}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.navButtons}
          onPress={() => navigation.navigate('Generate')}>
          <MaterialCommunityIcons
            name="view-grid-plus-outline"
            size={25}
            color={routeName === 'generate' ? colors.yellow : colors.lightGray}
          />
          <Text
            style={[
              styles.navLabel,
              {
                color:
                  routeName === 'generate' ? colors.yellow : colors.lightGray,
              },
            ]}>
            Generate
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    padding: 12,
    right: 0,
    left: 0,
    alignItems: 'center',
    bottom: 5,
  },
  bottomOverlay: {
    backgroundColor: colors.darkGray,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    padding: 7,
    borderRadius: 7,
  },
  navLabel: {
    color: colors.lightGray,
  },
  navButtons: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleIcon: {
    backgroundColor: colors.yellow,
    borderRadius: 50,
    padding: 15,
    borderWidth: 2,
    borderColor: colors.darkGray,
  },
  middleButton: {
    bottom: 37,
    marginLeft: 10,
  },
});
