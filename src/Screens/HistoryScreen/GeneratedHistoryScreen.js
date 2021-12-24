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
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';
import {colors} from '../../Helpers/Colors';
import SQLite from 'react-native-sqlite-storage';
import Loading from '../../components/Loading/Loading';
import ScannedResult from '../../components/ScannedResult/ScannedResult';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

var database_name = 'qrdata'; // Add your Database name
var database_version = '1.0'; // Add your Database Version
var database_size = 200000; // Add your Database Size
var database_displayname = 'SQL Database'; // Add your Database Displayname
var db;

export default function GeneratedHistoryScreen() {
  const colorScheme = useColorScheme() === 'light' ? 1 : 0;
  const [card, setCardType] = useState('generated');
  const [history, setHistory] = useState();
  const [render, setRender] = useState();
  const [loading, setLoading] = useState(true);
  let [ShowComment, setShowModelComment] = useState(false);
  let [animateModal, setanimateModal] = useState(false);
  let [modalData, setModalData] = useState({
    data: '',
    flag: 'scanned',
    from: 'scanner',
  });

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
            setLoading(false);
          } else {
            setHistory([]);
            setRender([]);
            setLoading(false);
          }
        },
      );
    });
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
      style={{
        backgroundColor: colorScheme ? colors.white : colors.gray,
        flex: 1,
      }}>
      {loading ? (
        <Loading />
      ) : (
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
                          : colors.darkGray,
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
                    onPress={() => {
                      setModalData({
                        data: item.data,
                        type: 'QRCODE',
                        flag: 'generated',
                        from: 'history',
                      });
                      setShowModelComment(true);
                    }}
                    onLongPress={() => handleSingleDelete(item.id)}>
                    <View
                      style={[
                        styles.itemCard,
                        {
                          backgroundColor: colorScheme
                            ? 'whitesmoke'
                            : colors.darkGray,
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
      )}

      <SwipeUpDownModal
        modalVisible={ShowComment}
        PressToanimate={animateModal}
        //if you don't pass HeaderContent you should pass marginTop in view of ContentModel to Make modal swipeable
        ContentModal={
          <View style={styles.containerContent}>
            <ScannedResult route={modalData} />
          </View>
        }
        HeaderStyle={styles.headerContent}
        ContentModalStyle={styles.Modal}
        duration={300}
        HeaderContent={
          <View style={styles.containerHeader}>
            <TouchableOpacity
              onPress={() => {
                setanimateModal(true);
              }}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 80,
              }}>
              <Text style={{color: colors.lightGray, fontSize: 10}}>
                Click here or swipe down to close
              </Text>
              <SimpleLineIcons
                name="arrow-down"
                size={17}
                color={colors.lightGray}
              />
            </TouchableOpacity>
          </View>
        }
        onClose={() => {
          setanimateModal(false);
          setShowModelComment(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerContent: {flex: 1, marginTop: 50},
  containerHeader: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContent: {
    marginTop: 0,
  },
  Modal: {
    backgroundColor: colors.darkGray,
    marginTop: 60,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  item: {
    width: '100%',
    // height: '43%',
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
