import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import BottomNav from '../../components/BottomNav/BottomNav';
import {colors} from '../../Configs/Colors';

import SQLite from 'react-native-sqlite-storage';
var database_name = 'qrdata'; // Add your Database name
var database_version = '1.0'; // Add your Database Version
var database_size = 200000; // Add your Database Size
var database_displayname = 'SQL Database'; // Add your Database Displayname
var db;

export default function HistoryScreen({navigation}) {
  const [card, setCardType] = useState('scanned');
  const [history, setHistory] = useState();
  const [render, setRender] = useState();

  useEffect(() => {
    getHistory();

    return () => {
      setHistory([]);
      setRender([]);
    };
  }, []);

  async function getHistory() {
    //get histroy from db
    db = SQLite.openDatabase(
      database_name,
      database_version,
      database_displayname,
      database_size,
    );
    let data = [];
    await db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM qr_data order by created_at desc',
        [],
        (tx, results) => {
          let len = results.rows.length;
          for (let i = 0; i < len; i++) {
            data.push(results.rows.item(i));
          }
          if (data.length) {
            setHistory(data);

            // this gives an object with dates as keys
            const groups = data
              .filter(item => item.flag === card)
              .reduce((groups, game) => {
                const date = game.created_at.split('T')[0];
                if (!groups[date]) {
                  groups[date] = [];
                }
                groups[date].push(game);
                return groups;
              }, {});

            // Edit: to add it in the array format instead
            const groupArrays = Object.keys(groups).map(date => {
              return {
                date,
                games: groups[date],
              };
            });

            setRender(groupArrays);
          } else {
            setHistory([]);
            setRender([]);
          }
        },
      );
    });
  }

  function handleCardType(type) {
    if (type === 'generated') {
      setCardType('generated');
      if (history) {
        // this gives an object with dates as keys
        const groups = history
          .filter(item => item.flag === 'generated')
          .reduce((groups, game) => {
            const date = game.created_at.split('T')[0];
            if (!groups[date]) {
              groups[date] = [];
            }
            groups[date].push(game);
            return groups;
          }, {});

        // Edit: to add it in the array format instead
        const groupArrays = Object.keys(groups).map(date => {
          return {
            date,
            games: groups[date],
          };
        });

        setRender(groupArrays);
      } else {
        setRender([]);
      }
    } else {
      setCardType('scanned');
      if (history) {
        // this gives an object with dates as keys
        const groups = history
          .filter(item => item.flag === 'scanned')
          .reduce((groups, game) => {
            const date = game.created_at.split('T')[0];
            if (!groups[date]) {
              groups[date] = [];
            }
            groups[date].push(game);
            return groups;
          }, {});

        // Edit: to add it in the array format instead
        const groupArrays = Object.keys(groups).map(date => {
          return {
            date,
            games: groups[date],
          };
        });

        setRender(groupArrays);
      } else {
        setRender([]);
      }
    }
  }

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
            tx.executeSql(
              'DELETE FROM qr_data where flag=?',
              [card === 'scanned' ? 'scanned' : 'generated'],
              (tx, results) => {
                if (results.rowsAffected > 0) {
                  Alert.alert(
                    'Done',
                    'History Cleared Successfully',
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
              },
            );
          });
        },
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text />
        <Text style={[styles.headerText]}>History</Text>
        <TouchableOpacity onPress={() => handleHistoryDelete()}>
          <MaterialIcons name="delete" color={colors.darkGray} size={23} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.scannedGenerated}>
          <TouchableOpacity
            onPress={() => handleCardType('scanned')}
            style={[
              styles.Topbuttons,
              {borderBottomWidth: card === 'scanned' ? 2 : 0},
            ]}>
            <Text style={styles.headerText}>Scanned</Text>
          </TouchableOpacity>
          <View style={styles.middleBorder} />
          <TouchableOpacity
            onPress={() => handleCardType('generated')}
            style={[
              styles.Topbuttons,
              {borderBottomWidth: card === 'generated' ? 2 : 0},
            ]}>
            <Text
              style={[
                styles.headerText,
                {
                  color: card === 'generated' ? colors.black : colors.lightGray,
                },
              ]}>
              Generated
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.historyList}>
          {render &&
            render.map(outer => (
              <>
                <View style={styles.dateView}>
                  <Text style={styles.dateLabel}>
                    {outer.date === new Date().toISOString().split('T')[0]
                      ? 'Today'
                      : outer.date ===
                        new Date(Date.now() - 864e5).toISOString().split('T')[0]
                      ? 'Yesterday'
                      : outer.date.split('-')[2] +
                        '-' +
                        outer.date.split('-')[1] +
                        '-' +
                        outer.date.split('-')[0]}
                  </Text>
                </View>
                {outer.games.map(item => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() =>
                      navigation.navigate('ScannedResult', {
                        data: item.data,
                        type: 'QRCODE',
                        flag: 'scanned',
                        from: 'history',
                      })
                    }>
                    <View style={styles.itemCard}>
                      <View>
                        <Text style={styles.label} numberOfLines={1}>
                          {item.data}
                        </Text>
                      </View>

                      <MaterialIcons
                        name="keyboard-arrow-right"
                        size={20}
                        color={colors.black}
                      />
                    </View>
                  </TouchableOpacity>
                ))}
              </>
            ))}

          {render && render.length === 0 && (
            <View style={styles.noResults}>
              <Text style={styles.label} numberOfLines={1}>
                No results found
              </Text>
            </View>
          )}
        </ScrollView>
      </View>

      <BottomNav navigation={navigation} routeName="history" />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    color: colors.black,
  },
  content: {
    backgroundColor: colors.white,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannedGenerated: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    padding: 3,
    paddingBottom: 15,
  },
  middleBorder: {width: 2, backgroundColor: colors.border},
  Topbuttons: {
    padding: 8,
  },
  itemCard: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20,
    marginVertical: 10,
    backgroundColor: 'whitesmoke',
    borderRadius: 5,
    width: '100%',
  },
  noResults: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: colors.border,
    padding: 18,
    marginVertical: 10,
    backgroundColor: 'whitesmoke',
    borderRadius: 5,
  },
  label: {fontSize: 16, color: colors.darkGray},
  historyList: {
    width: '100%',
    padding: 20,
    height: '65%',
  },
  dateView: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  dateLabel: {
    fontSize: 14,
    backgroundColor: 'whitesmoke',
    paddingVertical: 2,
    paddingHorizontal: 9,
    borderRadius: 5,
    borderWidth: 0.5,
  },
});
