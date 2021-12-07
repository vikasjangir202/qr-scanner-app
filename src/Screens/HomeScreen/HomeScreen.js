import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Scanner from '../../components/scanner/Scanner';
import Loading from '../../components/Loading/Loading';
import SQLite from 'react-native-sqlite-storage';

export default function HomeScreen({navigation}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //Create table if not exists
    var database_name = 'qrdata';
    var database_version = '1.0';
    var database_size = 200000;
    var database_displayname = 'SQL Database';
    var db;

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
              'CREATE TABLE IF NOT EXISTS qr_data(id INTEGER PRIMARY KEY AUTOINCREMENT, data VARCHAR(255), flag VARCHAR(10), created_at VARCHAR(50))',
              [],
            );
          }
        },
      );
    });

    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? <Loading /> : <Scanner navigation={navigation} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
