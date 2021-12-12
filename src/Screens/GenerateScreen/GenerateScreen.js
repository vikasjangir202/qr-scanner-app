import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import BottomNav from '../../components/BottomNav/BottomNav';
import {colors} from '../../Helpers/Colors';

export default function GenerateScreen({navigation}) {
  const [text, setText] = useState('');

  function handleTextChange(text) {
    if (text.length <= 100) {
      setText(text);
    } else {
      Alert.alert('Alert', 'Maximum limit reached');
    }
  }

  function handleSubmit() {
    if (text.length) {
      navigation.navigate('ScannedResult', {
        data: text,
        type: 'QRCODE',
        flag: 'generated',
      });
    } else {
      Alert.alert('Alert', 'Cannot generate QRCode for empty message');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.headerText]}>Generate</Text>
      </View>

      <ScrollView style={styles.content}>
        <TextInput
          placeholder={'Write here'}
          placeholderTextColor={colors.lightGray}
          style={styles.textArea}
          multiline={true}
          numberOfLines={7}
          onChangeText={value => handleTextChange(value)}
          value={text}
          blurOnSubmit={true}
        />
        <View style={styles.textLimitView}>
          <Text style={{color: colors.black}}>{text.length}/100</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
          <Text style={styles.buttonText}>Generate</Text>
        </TouchableOpacity>
      </ScrollView>

      <BottomNav navigation={navigation} routeName="generate" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    backgroundColor: colors.lightWhite,
  },
  header: {
    backgroundColor: colors.white,
    width: '100%',
    padding: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
    color: colors.black,
  },
  content: {
    backgroundColor: colors.white,
    width: '100%',
    display: 'flex',
    padding: 20,
    flex: 1,
  },
  textArea: {
    width: '100%',
    padding: 10,
    fontSize: 18,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 5,
    color: colors.black,
  },
  textLimitView: {
    width: '99%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginVertical: 8,
  },
  button: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.yellow,
    borderWidth: 1,
    borderColor: colors.darkGray,
    borderRadius: 5,
    paddingVertical: 7,
    marginVertical: 12,
  },
  buttonText: {
    fontSize: 17,
    color: colors.darkGray,
  },
});
