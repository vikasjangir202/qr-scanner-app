import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import React, {useState, useRef} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import Header from '../../../components/Header/Header';
import {colors} from '../../../Helpers/Colors';
import Input from '../../../components/TextInput/Input';
import EmptySpace from '../../../components/EmptySpace/EmptySpace';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ScannedResult from '../../../components/ScannedResult/ScannedResult';
import {RadioButton} from 'react-native-paper';
import {Switch} from 'react-native-paper';
import {Button} from 'react-native-paper';
export default function GenerateWifi() {
  const refRBSheet = useRef();
  const [netWorkName, setNetWorkName] = useState('SKYNET');
  const [password, setPassword] = useState('0987654321');
  const [enc, setEnc] = useState('WPA');
  const [hidden, setHidden] = useState(false);
  const [modalData, setModalData] = useState({
    data: '',
    flag: 'generated',
    from: 'generated',
  });

  function handleSubmit() {
    let wifiQr = `WIFI:T:${enc};S:${netWorkName};P:${password};H:${hidden};`;
    if (wifiQr) {
      setModalData({
        data: wifiQr,
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
      case 'Network Name':
        setNetWorkName(text);
        break;
      case 'Password':
        setPassword(text);
        break;
    }
  }
  return (
    <View style={styles.container}>
      <Header title={'Wi-Fi'} />
      <ScrollView>
        <View style={styles.form}>
          <Input
            setValue={setValue}
            stat={netWorkName}
            label={'Network Name'}
          />
          <Input setValue={setValue} stat={password} label={'Password'} />
          <View style={styles.radioContainer}>
            <Text style={styles.radioLabel}>Encryption : </Text>
            <RadioButton
              value="NONE"
              status={enc === 'NONE' ? 'checked' : 'unchecked'}
              uncheckedColor={colors.lightGray}
              color={colors.yellow}
              onPress={() => {
                setEnc('NONE');
              }}
            />
            <Text style={styles.radioLabelSmall}>None</Text>
            <RadioButton
              value="WPA"
              status={enc === 'WPA' ? 'checked' : 'unchecked'}
              uncheckedColor={colors.lightGray}
              color={colors.yellow}
              onPress={() => {
                setEnc('WPA');
              }}
            />
            <Text style={styles.radioLabelSmall}>WPA / WPA2</Text>
            <RadioButton
              value="WEP"
              status={enc === 'WEP' ? 'checked' : 'unchecked'}
              uncheckedColor={colors.lightGray}
              color={colors.yellow}
              onPress={() => {
                setEnc('WEP');
              }}
            />
            <Text style={styles.radioLabelSmall}>WEP</Text>
          </View>
          <View style={styles.radioContainer}>
            <Text style={styles.radioLabel}>Hidden : </Text>
            <Switch
              value={hidden}
              color={colors.yellow}
              onValueChange={() => {
                setHidden(!hidden);
              }}
            />
          </View>

          <Button
            mode="contained"
            style={{alignSelf: 'flex-end', marginRight: 20}}
            uppercase={false}
            color={colors.yellow}
            onPress={() => handleSubmit()}>
            Generate
          </Button>
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
  radioContainer: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 5,
  },
  radioLabel: {
    fontSize: 15,
    color: colors.lightWhite,
  },
  radioLabelSmall: {
    fontSize: 10,
    color: colors.lightWhite,
  },
});
