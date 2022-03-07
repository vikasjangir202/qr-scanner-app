import React, {useState, useRef} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import ScannedResult from '../../components/ScannedResult/ScannedResult';
import Header from '../../components/Header/Header';
import {colors} from '../../Helpers/Colors';
import GeneratableButtons from '../../components/GeneratableButtons/GeneratableButtons';
import {personal, tools} from '../../Helpers/generatables';

export default function GenerateScreen() {
  const refRBSheet = useRef();
  const [text, setText] = useState('test');
  const [modalData, setModalData] = useState({
    data: '',
    flag: 'generated',
    from: 'generated',
  });

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
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Personal</Text>
        </View>
        <View style={styles.buttonContainer}>
          {personal &&
            personal.map(item => (
              <GeneratableButtons
                action={item.action}
                label={item.label}
                iconName={item.iconName}
              />
            ))}
        </View>

        <View style={[styles.labelContainer, {width: '60%', marginTop: 20}]}>
          <Text style={styles.label}>Tools</Text>
        </View>
        <View style={styles.buttonContainer}>
          {tools &&
            tools.map(item => (
              <GeneratableButtons
                action={item.action}
                label={item.label}
                iconName={item.iconName}
              />
            ))}
        </View>
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    backgroundColor: colors.gray,
  },
  content: {
    width: '100%',
    padding: 20,
    flex: 1,
    backgroundColor: colors.gray,
  },
  labelContainer: {
    width: '80%',
    display: 'flex',
    marginBottom: 20,
  },
  label: {
    color: colors.white,
    borderBottomColor: colors.yellow,
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
