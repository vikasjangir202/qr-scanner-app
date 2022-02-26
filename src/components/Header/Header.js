import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../Helpers/Colors';
import {handleHistoryDelete} from '../../Helpers/functions';

export default function Header({title}) {
  return (
    <View style={[styles.header, {backgroundColor: colors.darkGray}]}>
      {/* <Text /> */}
      <Text style={[styles.headerText, {color: colors.white}]}>{title}</Text>
      {/* <TouchableOpacity onPress={() => handleHistoryDelete()}>
        <MaterialIcons name="delete" color={colors.lightWhite} size={23} />
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    padding: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
  },
});
