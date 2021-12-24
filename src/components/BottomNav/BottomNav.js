import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../Helpers/Colors';

export default function BottomNav({navigation, routeName}) {
  const colorScheme = useColorScheme() === 'light' ? 1 : 0;
  return (
    <View style={styles.overlay}>
      <View
        style={[
          styles.bottomOverlay,
          {backgroundColor: colorScheme ? colors.darkGray : colors.gray},
        ]}>
        <TouchableOpacity
          style={styles.navButtons}
          onPress={() => navigation.navigate('HistroyTabs')}>
          <Octicons
            name="history"
            size={20}
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
              size={20}
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
    right: 0,
    left: 0,
    alignItems: 'center',
    bottom: 0,
  },
  bottomOverlay: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    padding: 7,
  },
  navLabel: {
    color: colors.lightGray,
    fontSize: 12,
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
