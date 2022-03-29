import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState, useRef} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import Header from '../../../components/Header/Header';
import {colors} from '../../../Helpers/Colors';
import Input from '../../../components/TextInput/Input';
import EmptySpace from '../../../components/EmptySpace/EmptySpace';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ScannedResult from '../../../components/ScannedResult/ScannedResult';

export default function GenerateContact() {
  const refRBSheet = useRef();
  const [fullname, setFullName] = useState('vikas');
  const [email, setEmail] = useState('vikas.com');
  const [phone, setPhone] = useState('7073230332');
  const [cell, setCell] = useState('100');
  const [organisation, setOrganisation] = useState('Infoeye');
  const [fax, setFax] = useState('009987');
  const [street, setStreet] = useState('Bari');
  const [city, setCity] = useState('Sardar');
  const [postcode, setPostcode] = useState('331403');
  const [country, setCountry] = useState('India');
  const [url, setUrl] = useState('www.google.com');
  const [modalData, setModalData] = useState({
    data: '',
    flag: 'generated',
    from: 'generated',
  });

  function handleSubmit() {
    let vCard = `BEGIN:VCARD
                VERSION:3.0
                N:${fullname};${fullname}
                ORG:${organisation}
                TITLE:Test
                email;type=internet:${email}
                URL:${url}
                TEL;TYPE=CELL:${cell}
                TEL:${phone}
                TEL;TYPE=FAX:${fax}
                ADR:;;${street};${city};${postcode};${country}
                END:VCARD`;
    if (vCard) {
      setModalData({
        data: vCard,
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
    switch (type) {
      case 'Name':
        setFullName(text);
        break;
      case 'Email':
        setEmail(text);
        break;
      case 'Phone':
        setPhone(text);
        break;
      case 'Cell':
        setCell(text);
        break;
      case 'Organisation':
        setOrganisation(text);
        break;
      case 'Fax':
        setFax(text);
        break;
      case 'Street':
        setStreet(text);
        break;
      case 'City':
        setCity(text);
        break;
      case 'Postcode':
        setPostcode(text);
        break;
      case 'Country':
        setCountry(text);
        break;
      case 'URL/Website':
        setUrl(text);
        break;
    }
  }
  return (
    <View style={styles.container}>
      <Header title={'Contact'} />
      <ScrollView>
        <View style={styles.form}>
          <Input setValue={setValue} stat={fullname} label={'Name'} />
          <Input setValue={setValue} stat={email} label={'Email'} />
          <Input setValue={setValue} stat={phone} label={'Phone'} />
          <Input setValue={setValue} stat={cell} label={'Cell'} />
          <Input
            setValue={setValue}
            stat={organisation}
            label={'Organisation'}
          />
          <Input setValue={setValue} stat={fax} label={'Fax'} />
          <Input setValue={setValue} stat={street} label={'Street'} />
          <Input setValue={setValue} stat={city} label={'City'} />
          <Input setValue={setValue} stat={postcode} label={'Postcode'} />
          <Input setValue={setValue} stat={country} label={'Country'} />
          <Input setValue={setValue} stat={url} label={'URL/Website'} />
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
