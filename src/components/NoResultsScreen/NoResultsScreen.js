import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {colors} from '../../Helpers/Colors';

export default function NoResultsScreen() {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.gray,
        },
      ]}>
      <Image
        source={require('../../assets/empty.png')}
        style={styles.img}
        resizeMode="contain"
      />
      <Text style={[styles.label, {color: colors.lightGray}]}>
        Sorry, we couldn't find any results
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 300,
    height: 300,
  },
  label: {
    fontSize: 14,
  },
});
