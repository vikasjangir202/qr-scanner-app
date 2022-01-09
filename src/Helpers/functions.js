import {Share, Alert} from 'react-native';
import SQLite from 'react-native-sqlite-storage';

var database_name = 'qrdata';
var database_version = '1.0';
var database_size = 200000;
var database_displayname = 'SQL Database';
var db;

//Create table if  not exists
export function createTable() {
  db = SQLite.openDatabase(
    database_name,
    database_version,
    database_displayname,
    database_size,
  );

  db.transaction(function (txn) {
    txn.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='qr_data'",
      [],
      function (tx, res) {
        if (res.rows.length === 0) {
          txn.executeSql('DROP TABLE IF EXISTS qr_data', []);
          txn.executeSql(
            'CREATE TABLE IF NOT EXISTS qr_data(id INTEGER PRIMARY KEY AUTOINCREMENT, data VARCHAR(255), flag VARCHAR(10), fav INTEGER(1), created_at VARCHAR(50))',
            [],
          );
        }
      },
    );
  });
}

//Insert scanned or generated data to table
export function storeData(data, flag) {
  db = SQLite.openDatabase(
    database_name,
    database_version,
    database_displayname,
    database_size,
  );
  db.transaction(function (tx) {
    console.log('test');
    tx.executeSql(
      'INSERT INTO qr_data (data, flag, created_at) VALUES (?,?,?)',
      [data, flag ? flag : 'scanned', new Date().toISOString()],
      (tx, results) => {
        if (results.rowsAffected === 0) {
          Alert.alert('Registration Failed');
        }
      },
    );
  });
}

//handle add/remove favourite history
export function handleFavourite(id, fav) {
  if (id) {
    db = SQLite.openDatabase(
      database_name,
      database_version,
      database_displayname,
      database_size,
    );

    db.transaction(tx => {
      tx.executeSql(
        'UPDATE qr_data SET fav=? where id=?',
        [fav ? 0 : 1, id],
        (tx, results) => {
          if (results.rowsAffected > 0) {
          }
        },
      );
    });
  }
}

//hanlde single record delete
export function handleSingleDelete(id) {
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
          tx.executeSql(
            'DELETE FROM qr_data where id=?',
            [id],
            (tx, results) => {
              if (results.rowsAffected > 0) {
              }
            },
          );
        });
      },
    },
  ]);
}

//Handle history destroy action
export function handleHistoryDelete() {
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

//check if given url is valid
export function validURL(str) {
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

//Handle share button logic
export const handleOnShare = async data => {
  try {
    const result = await Share.share({
      title: 'Scanned using QRScanner App',
      message: data,
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
