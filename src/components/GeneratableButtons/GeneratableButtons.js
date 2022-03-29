import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../Helpers/Colors';

export default function GeneratableButtons({
  label,
  action,
  iconName,
  navigation,
}) {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.buttonAndLabel}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate(action)}>
          <MaterialCommunityIcons
            name={iconName}
            size={22}
            color={colors.yellow}
          />
        </TouchableOpacity>
        <Text style={styles.buttonLabel}>{label}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 30,
    marginRight: 35,
  },
  buttonAndLabel: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    display: 'flex',
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.darkGray,
    borderRadius: 10,
    padding: 5,
  },
  buttonLabel: {
    color: 'lightgray',
    fontSize: 10,
    paddingTop: 5,
  },
});
