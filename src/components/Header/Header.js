import React from 'react';
import {
  View,
  Text,
  useColorScheme,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../Helpers/Colors';

var database_name = 'qrdata'; // Add your Database name
var database_version = '1.0'; // Add your Database Version
var database_size = 200000; // Add your Database Size
var database_displayname = 'SQL Database'; // Add your Database Displayname
var db;

export default function Header() {
  const colorScheme = useColorScheme() === 'light' ? 1 : 0;

  function handleHistoryDelete() {
    //get histroy from db
    db = SQLite.openDatabase(
      database_name,
      database_version,
      database_displayname,
      database_size,
    );

    Alert.alert('Alert', 'Are you sure ?', [
      {
        text: 'Cancel',
      },
      {
        text: 'ok',
        onPress: () => {
          db.transaction(tx => {
            tx.executeSql('DELETE FROM qr_data', (tx, results) => {
              if (results.rowsAffected > 0) {
                Alert.alert(
                  'Done',
                  'History Cleared',
                  [
                    {
                      text: 'Ok',
                      onPress: () => {
                        getHistory();
                      },
                    },
                  ],
                  {cancelable: false},
                );
              }
            });
          });
        },
      },
    ]);
  }

  return (
    <View
      style={[
        styles.header,
        {backgroundColor: colorScheme ? colors.white : colors.darkGray},
      ]}>
      <Text />
      <Text
        style={[
          styles.headerText,
          {color: colorScheme ? colors.black : colors.white},
        ]}>
        History
      </Text>
      <TouchableOpacity onPress={() => handleHistoryDelete()}>
        <MaterialIcons
          name="delete"
          color={colorScheme ? colors.darkGray : colors.lightWhite}
          size={23}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    padding: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
  },
});
