import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../Configs/Colors';

export default function BottomNav() {
  return (
    <View style={styles.overlay}>
      <View style={styles.bottomOverlay}>
        <TouchableOpacity style={styles.navButtons}>
          <Octicons name="history" size={25} color={colors.lightGray} />
          <Text style={styles.navLabel}>History</Text>
        </TouchableOpacity>

        <View style={styles.middleButton}>
          <TouchableOpacity style={styles.navButtons}>
            <MaterialIcons
              name="qr-code-scanner"
              size={30}
              color={colors.darkGray}
              style={styles.middleIcon}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.navButtons}>
          <MaterialCommunityIcons
            name="view-grid-plus-outline"
            size={25}
            color={colors.lightGray}
          />
          <Text style={styles.navLabel}>Generate</Text>
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
    padding: 10,
    borderRadius: 10,
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
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 30,
  },
});
