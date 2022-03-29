import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState, useRef} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import Header from '../../../components/Header/Header';
import {colors} from '../../../Helpers/Colors';
import Input from '../../../components/TextInput/Input';
import EmptySpace from '../../../components/EmptySpace/EmptySpace';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ScannedResult from '../../../components/ScannedResult/ScannedResult';

export default function GeneratePhone() {
  const refRBSheet = useRef();
  const [countryCode, setCountryCode] = useState('+91');
  const [phone, setPhone] = useState('7073230332');
  const [modalData, setModalData] = useState({
    data: '',
    flag: 'generated',
    from: 'generated',
  });

  function handleSubmit() {
    let phoneQr = `${countryCode} ${phone}`;
    console.log('p', phoneQr);
    if (phoneQr) {
      setModalData({
        data: phoneQr,
        type: 'QRCODE',
        flag: 'generated',
        from: 'generated',
      });
      refRBSheet.current.open();
    } else {
      alert('Cannot generate QRCode for empty message');
    }
  }

  function setValue(type, text) {
    console.log('tetttt', type);
    console.log('ttxxtt', text);
    switch (type) {
      case 'Phone':
        setPhone(text);
        break;
      case 'Country Code':
        setCountryCode(text);
        break;
    }
  }
  return (
    <View style={styles.container}>
      <Header title={'Phone'} />
      <ScrollView>
        <View style={styles.form}>
          <Input
            setValue={setValue}
            stat={countryCode}
            label={'Country Code'}
          />
          <Input setValue={setValue} stat={phone} label={'Phone'} />
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleSubmit()}>
            <Ionicons name="create-outline" size={25} color={colors.darkGray} />
          </TouchableOpacity>
        </View>
        <EmptySpace />
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
    flex: 1,
    width: '100%',
    backgroundColor: colors.gray,
  },
  form: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  button: {
    width: '90%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: colors.yellow,
    borderWidth: 1,
    borderColor: colors.darkGray,
    borderRadius: 5,
    margin: 10,
  },
});
