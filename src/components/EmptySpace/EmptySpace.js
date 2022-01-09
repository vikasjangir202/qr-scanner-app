import React from 'react';
import {View, StyleSheet} from 'react-native';

export default function EmptySpace() {
  return <View style={styles.itemCard} />;
}

const styles = StyleSheet.create({
  itemCard: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    marginVertical: 10,
    backgroundColor: 'transparent',
    borderRadius: 5,
    width: '100%',
    marginTop: 40,
  },
});
