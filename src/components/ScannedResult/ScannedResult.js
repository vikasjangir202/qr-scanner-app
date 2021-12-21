import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Share,
  ScrollView,
  Alert,
  useColorScheme,
} from 'react-native';
import BottomNav from '../BottomNav/BottomNav';
import {colors} from '../../Helpers/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Clipboard from '@react-native-clipboard/clipboard';
import QrCarde from '../QrCard/QrCarde';

import SQLite from 'react-native-sqlite-storage';
var database_name = 'qrdata'; // Add your Database name
var database_version = '1.0'; // Add your Database Version
var database_size = 200000; // Add your Database Size
var database_displayname = 'SQL Database'; // Add your Database Displayname
var db;

export default function ScannedResult({route, navigation}) {
  const colorScheme = useColorScheme() === 'light' ? 1 : 0;
  const [copied, setCopied] = useState(false);
  const [output, setOutput] = useState('');
  const [qrType, setQrType] = useState('');
  const [sms, setSms] = useState('');

  function errorCB(err) {
    console.log('SQL Error: ' + err);
  }

  function openCB() {
    console.log('Database OPENED');
  }

  function validURL(str) {
    var pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i',
    ); // fragment locator
    return !!pattern.test(str);
  }

  useEffect(() => {
    let {data, flag, from} = route.params;
    console.log(data);

    if (data.includes('tel:')) {
      setOutput(data.replace('tel:', ''));
      setQrType('call');
    } else if (validURL(data)) {
      setOutput(data);
      setQrType('url');
    } else if (data.includes('SMSTO:')) {
      setQrType('sms');
      let removeExtra = data.replace('SMSTO:', '');
      let split = removeExtra.split(':');
      setSms(`${split[0]}?body=${split[1]}`);
      setOutput(`${split[0]}\n${split[1]}`);
    } else {
      setOutput(data);
    }

    if (from !== 'history') {
      //save data to db
      db = SQLite.openDatabase(
        database_name,
        database_version,
        database_displayname,
        database_size,
        openCB(),
        errorCB(),
      );
      db.transaction(function (tx) {
        console.log('test');
        tx.executeSql(
          'INSERT INTO qr_data (data, flag, created_at) VALUES (?,?,?)',
          [data, flag ? flag : 'scanned', new Date().toISOString()],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected === 0) {
              Alert.alert('Registration Failed');
            }
          },
        );
      });
    }
  }, [route.params]);

  const handleOnShare = async data => {
    try {
      const result = await Share.share({
        title: 'Scanned using QRScanner App',
        message: data,
        url: 'https://www.eyenews.uk.com/media/11135/eyejj15-tech-review-fig-1.png?width=699&height=699',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  function handleCopy(str) {
    setCopied(true);
    Clipboard.setString(str);
  }
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: colorScheme ? colors.lightWhite : colors.gray},
      ]}>
      <View
        style={[
          styles.header,
          {backgroundColor: colorScheme ? colors.white : colors.darkGray},
        ]}>
        <Text
          style={[
            styles.headerText,
            {color: colorScheme ? colors.black : colors.white},
          ]}>
          Result
        </Text>
      </View>

      <View
        style={[
          styles.content,
          {backgroundColor: colorScheme ? colors.white : colors.darkGray},
        ]}>
        <View
          style={[
            styles.resultArea,
            {backgroundColor: colorScheme ? colors.white : colors.gray},
          ]}>
          <ScrollView
            persistentScrollbar={true}
            showsVerticalScrollIndicator={true}>
            <Text
              style={{
                fontSize: 20,
                color: colorScheme ? colors.black : colors.white,
              }}>
              {output}
            </Text>
          </ScrollView>
        </View>

        <View
          style={[
            styles.buttonContainer,
            {
              justifyContent: 'space-around',
              backgroundColor: colorScheme ? colors.white : colors.gray,
            },
          ]}>
          <TouchableOpacity
            onPress={() => handleCopy(output)}
            style={styles.buttons}>
            <MaterialIcons
              name={copied ? 'check' : 'content-copy'}
              size={25}
              color={colors.yellow}
            />
            <Text
              style={[
                styles.buttonLabels,
                {color: colorScheme ? colors.black : colors.white},
              ]}>
              Copy
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleOnShare(output)}
            style={styles.buttons}>
            <MaterialIcons name="share" size={25} color={colors.yellow} />
            <Text
              style={[
                styles.buttonLabels,
                {color: colorScheme ? colors.black : colors.white},
              ]}>
              Share
            </Text>
          </TouchableOpacity>
        </View>
        {qrType !== '' && (
          <View style={styles.buttonContainer}>
            {qrType === 'call' && (
              <TouchableOpacity
                onPress={() => Linking.openURL(`tel:${output}`)}
                style={styles.buttons}>
                <MaterialIcons name="phone" size={25} color={colors.yellow} />
                <Text
                  style={[
                    styles.buttonLabels,
                    {color: colorScheme ? colors.black : colors.white},
                  ]}>
                  Call
                </Text>
              </TouchableOpacity>
            )}

            {qrType === 'sms' && (
              <TouchableOpacity
                onPress={() => Linking.openURL(`sms:${sms}`)}
                style={styles.buttons}>
                <MaterialIcons name="sms" size={25} color={colors.yellow} />
                <Text
                  style={[
                    styles.buttonLabels,
                    {color: colorScheme ? colors.black : colors.white},
                  ]}>
                  Message
                </Text>
              </TouchableOpacity>
            )}

            {qrType === 'url' && (
              <TouchableOpacity
                onPress={() =>
                  Linking.canOpenURL(output).then(supported => {
                    if (supported) {
                      Linking.openURL(output);
                    } else {
                      console.log("Don't know how to open URI: " + output);
                    }
                  })
                }
                style={styles.buttons}>
                <Feather name="globe" size={25} color={colors.yellow} />
                <Text
                  style={[
                    styles.buttonLabels,
                    {color: colorScheme ? colors.black : colors.white},
                  ]}>
                  Browser
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        <QrCarde data={output} />
      </View>

      <BottomNav navigation={navigation} routeName="scannedResult" />
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
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 20,
    flex: 1,
  },
  resultArea: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 20,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.border,
    maxHeight: '40%',
    borderRadius: 5,
  },
  buttonContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 5,
    marginTop: 5,
  },
  buttonLabels: {
    color: colors.gray,
    fontSize: 12,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
});
