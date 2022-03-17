import {View, Text, StyleSheet, TextInput} from 'react-native';
import React from 'react';
import {colors} from '../../Helpers/Colors';
export default function Input({label, stat, setValue}) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      {label && label === 'Text' ? (
        <TextInput
          style={[styles.input, {textAlignVertical: 'top', paddingTop: 10}]}
          multiline={true}
          numberOfLines={7}
          onChangeText={e => setValue(label, e)}
          value={stat}
        />
      ) : (
        <TextInput
          style={styles.input}
          onChangeText={e => setValue(label, e)}
          value={stat}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 13,
    position: 'relative',
  },
  label: {
    color: 'lightgray',
    fontSize: 10,
    position: 'absolute',
    backgroundColor: colors.gray,
    top: -7,
    left: 30,
    zIndex: 999,
    paddingHorizontal: 3,
  },
  input: {
    width: '90%',
    borderWidth: 1,
    borderColor: colors.lightGray,
    padding: 5,
    color: colors.white,
    borderRadius: 3,
    paddingLeft: 10,
  },
});
