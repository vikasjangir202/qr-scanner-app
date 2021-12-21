/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  useColorScheme,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import BottomNav from '../../components/BottomNav/BottomNav';
import {colors} from '../../Helpers/Colors';

import SQLite from 'react-native-sqlite-storage';
var database_name = 'qrdata'; // Add your Database name
var database_version = '1.0'; // Add your Database Version
var database_size = 200000; // Add your Database Size
var database_displayname = 'SQL Database'; // Add your Database Displayname
var db;

export default function HistoryScreen({navigation}) {
  const colorScheme = useColorScheme() === 'light' ? 1 : 0;
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
              },
            );
          });
        },
      },
    ]);
  }

  function handleSingleDelete(id) {
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
                  Alert.alert(
                    'Success',
                    'Record deleted',
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
      <View
        style={[
          styles.content,
          {backgroundColor: colorScheme ? colors.white : colors.darkGray},
        ]}>
        <View style={styles.scannedGenerated}>
          <TouchableOpacity
            onPress={() => handleCardType('scanned')}
            style={[
              styles.Topbuttons,
              {borderBottomWidth: card === 'scanned' ? 2 : 0},
              {borderColor: colorScheme ? colors.black : colors.yellow},
            ]}>
            <Text
              style={[
                styles.headerText,
                {
                  opacity: card === 'scanned' ? 1 : 0.5,
                },
                {color: colorScheme ? colors.black : colors.white},
              ]}>
              Scanned
            </Text>
          </TouchableOpacity>
          <View style={styles.middleBorder} />
          <TouchableOpacity
            onPress={() => handleCardType('generated')}
            style={[
              styles.Topbuttons,
              {borderBottomWidth: card === 'generated' ? 2 : 0},
              {borderColor: colorScheme ? colors.black : colors.yellow},
            ]}>
            <Text
              style={[
                styles.headerText,
                {
                  opacity: card === 'generated' ? 1 : 0.5,
                },
                {color: colorScheme ? colors.black : colors.white},
              ]}>
              Generated
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.historyList}
          contentContainerStyle={{paddingBottom: 30}}>
          {render &&
            render.map(outer => (
              <>
                <View style={styles.dateView} key={outer.date}>
                  <Text
                    style={[
                      styles.dateLabel,
                      {
                        backgroundColor: colorScheme
                          ? 'whitesmoke'
                          : colors.gray,
                        // borderColor: colorScheme ? colors.black : colors.white,
                        color: colorScheme ? colors.black : colors.white,
                      },
                    ]}>
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
                    }
                    onLongPress={() => handleSingleDelete(item.id)}>
                    <View
                      style={[
                        styles.itemCard,
                        {
                          backgroundColor: colorScheme
                            ? 'whitesmoke'
                            : colors.gray,
                        },
                      ]}>
                      <View>
                        <Text
                          style={[
                            styles.label,
                            {
                              color: colorScheme ? colors.black : colors.white,
                            },
                          ]}
                          numberOfLines={1}>
                          {item.data}
                        </Text>
                      </View>

                      <MaterialIcons
                        name="keyboard-arrow-right"
                        size={20}
                        color={colorScheme ? colors.black : colors.white}
                      />
                    </View>
                  </TouchableOpacity>
                ))}
              </>
            ))}

          {render && render.length === 0 && (
            <View
              style={[
                styles.noResults,
                {
                  backgroundColor: colorScheme ? colors.white : colors.gray,
                },
              ]}>
              <Text
                style={[
                  styles.label,
                  {color: colorScheme ? colors.black : colors.white},
                ]}
                numberOfLines={1}>
                No results found
              </Text>
            </View>
          )}
        </ScrollView>
        <View style={styles.item} />
      </View>
      <BottomNav navigation={navigation} routeName="history" />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    width: '100%',
    height: '43%',
  },
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
  },
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
  content: {
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
    padding: 20,
    marginVertical: 10,
    backgroundColor: colors.gray,
    borderRadius: 5,
    width: '100%',
  },
  noResults: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 18,
    marginVertical: 10,
    backgroundColor: 'whitesmoke',
    borderRadius: 5,
  },
  label: {fontSize: 16},
  historyList: {
    width: '100%',
    padding: 20,
  },
  dateView: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  dateLabel: {
    fontSize: 12,
    paddingVertical: 3,
    paddingHorizontal: 12,
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: 'transparent',
  },
});
