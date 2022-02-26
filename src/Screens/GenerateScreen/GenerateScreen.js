import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import ScannedResult from '../../components/ScannedResult/ScannedResult';
import Header from '../../components/Header/Header';
import {colors} from '../../Helpers/Colors';

export default function GenerateScreen() {
  const refRBSheet = useRef();
  const [text, setText] = useState('');
  const [modalData, setModalData] = useState({
    data: '',
    flag: 'generated',
    from: 'generated',
  });

  function handleTextChange(inputValue) {
    if (inputValue.length <= 100) {
      setText(inputValue);
    } else {
      Alert.alert('Alert', 'Maximum limit reached');
    }
  }

  function handleSubmit() {
    if (text.length) {
      setModalData({
        data: text,
        type: 'QRCODE',
        flag: 'generated',
        from: 'generated',
      });
      setText('');
      refRBSheet.current.open();
    } else {
      Alert.alert('Alert', 'Cannot generate QRCode for empty message');
    }
  }

  return (
    <View style={styles.container}>
      <Header title={'Generate'} />

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
          <Text style={{color: colors.white}}>{text.length}/100</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
          <Text style={styles.buttonText}>Generate</Text>
        </TouchableOpacity>
      </ScrollView>

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        animationType="fade"
        height={580}
        customStyles={{
          wrapper: {
            backgroundColor: '#0000009c',
          },
          draggableIcon: {
            backgroundColor: colors.lightGray,
          },
          container: {
            backgroundColor: colors.darkGray,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            alignSelf: 'center',
          },
        }}>
        <ScannedResult route={modalData} />
      </RBSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    backgroundColor: colors.gray,
  },
  content: {
    width: '100%',
    display: 'flex',
    padding: 20,
    flex: 1,
    backgroundColor: colors.gray,
  },
  textArea: {
    width: '100%',
    padding: 10,
    fontSize: 18,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 5,
    color: colors.white,
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
