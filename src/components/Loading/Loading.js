import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {colors} from '../../Helpers/Colors';

export default function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={50} color={colors.yellow} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
