import React from 'react';
import {View, Text, Image, StyleSheet, useColorScheme} from 'react-native';
import {colors} from '../../Helpers/Colors';

export default function NoResultsScreen() {
  const colorScheme = useColorScheme() === 'light' ? 1 : 0;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colorScheme ? colors.white : colors.gray,
        },
      ]}>
      <Image
        source={require('../../assets/empty.png')}
        style={styles.img}
        resizeMode="contain"
      />
      <Text
        style={[
          styles.label,
          {color: colorScheme ? colors.black : colors.lightGray},
        ]}>
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
