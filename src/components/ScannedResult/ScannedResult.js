import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
  Alert,
} from 'react-native';
import {colors} from '../../Helpers/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import QrCarde from '../QrCard/QrCarde';
import {validURL, handleOnShare, storeData} from '../../Helpers/functions';
import Clipboard from '@react-native-clipboard/clipboard';

export default function ScannedResult({route}) {
  const [copied, setCopied] = useState(false);
  const [output, setOutput] = useState('');
  const [qrType, setQrType] = useState('');
  const [sms, setSms] = useState('');

  useEffect(() => {
    let {data, flag, from} = route;

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
      storeData(data, flag);
    }
  }, [route]);

  function handleCopy(str) {
    setCopied(true);
    Clipboard.setString(str);
  }

  return (
    <View style={styles.container}>
      <QrCarde data={output} />

      <View style={styles.content}>
        <View style={styles.resultArea}>
          <ScrollView
            persistentScrollbar={true}
            showsVerticalScrollIndicator={true}>
            <Text style={styles.resultText}>{output}</Text>
          </ScrollView>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => handleCopy(output)}
            style={styles.buttons}>
            <MaterialIcons
              name={copied ? 'check' : 'content-copy'}
              size={25}
              color={colors.yellow}
            />
            <Text style={[styles.buttonLabels, {color: colors.white}]}>
              {copied ? 'Copied' : 'Copy'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleOnShare(output)}
            style={styles.buttons}>
            <MaterialIcons name="share" size={25} color={colors.yellow} />
            <Text style={[styles.buttonLabels, {color: colors.white}]}>
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
                <Text style={[styles.buttonLabels, {color: colors.white}]}>
                  Call
                </Text>
              </TouchableOpacity>
            )}

            {qrType === 'sms' && (
              <TouchableOpacity
                onPress={() => Linking.openURL(`sms:${sms}`)}
                style={styles.buttons}>
                <MaterialIcons name="sms" size={25} color={colors.yellow} />
                <Text style={[styles.buttonLabels, {color: colors.white}]}>
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
                      Alert.alert(
                        'Alert',
                        "Don't know how to open URI: " + output,
                      );
                    }
                  })
                }
                style={styles.buttons}>
                <Feather name="globe" size={25} color={colors.yellow} />
                <Text style={[styles.buttonLabels, {color: colors.white}]}>
                  Browser
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
  },
  content: {
    backgroundColor: colors.darkGray,
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
    backgroundColor: colors.darkGray,
  },
  resultText: {
    fontSize: 20,
    color: colors.white,
  },
  buttonContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 5,
    marginTop: 5,
    justifyContent: 'space-around',
    backgroundColor: colors.darkGray,
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
