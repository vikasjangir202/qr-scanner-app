/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../Helpers/Colors';
import SQLite from 'react-native-sqlite-storage';
import Loading from '../../components/Loading/Loading';
import ScannedResult from '../../components/ScannedResult/ScannedResult';
import NoResultsScreen from '../../components/NoResultsScreen/NoResultsScreen';
import RBSheet from 'react-native-raw-bottom-sheet';
import {handleFavourite, handleSingleDelete} from '../../Helpers/functions';
import EmptySpace from '../../components/EmptySpace/EmptySpace';

var database_name = 'qrdata'; // Add your Database name
var database_version = '1.0'; // Add your Database Version
var database_size = 200000; // Add your Database Size
var database_displayname = 'SQL Database'; // Add your Database Displayname
var db;

export default function ScannedHistoryScreen() {
  const refRBSheet = useRef();
  const [render, setRender] = useState();
  const [loading, setLoading] = useState(true);
  let [modalData, setModalData] = useState({
    data: '',
    flag: 'scanned',
    from: 'history',
  });

  useEffect(() => {
    //get histroy from db
    db = SQLite.openDatabase(
      database_name,
      database_version,
      database_displayname,
      database_size,
    );
    let data = [];
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM qr_data WHERE flag=? ORDER BY created_at DESC',
        ['scanned'],
        (tx, results) => {
          let len = results.rows.length;
          for (let i = 0; i < len; i++) {
            data.push(results.rows.item(i));
          }
          if (data.length) {
            // this gives an object with dates as keys
            const groups = data.reduce((groups, game) => {
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
            setRender([]);
            setLoading(false);
          }
        },
      );
    });
  }, [render]);

  return (
    <View
      style={{
        backgroundColor: colors.gray,
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
                        backgroundColor: colors.darkGray,
                        color: colors.white,
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
                  <View style={styles.itemContainer}>
                    <TouchableOpacity
                      style={{width: '100%'}}
                      key={item.id}
                      onPress={() => {
                        setModalData({
                          data: item.data,
                          type: 'QRCODE',
                          flag: 'scanned',
                          from: 'history',
                        });
                        refRBSheet.current.open();
                      }}
                      onLongPress={() => handleSingleDelete(item.id)}>
                      <View
                        style={[
                          styles.itemCard,
                          {
                            backgroundColor: colors.listItem,
                          },
                        ]}>
                        <View>
                          <Text
                            style={[
                              styles.label,
                              {
                                color: colors.white,
                              },
                            ]}
                            numberOfLines={1}>
                            {item.data}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{position: 'absolute', right: 20}}
                      onPress={() => handleFavourite(item.id, item.fav)}>
                      <MaterialIcons
                        name={item.fav ? 'favorite' : 'favorite-border'}
                        size={25}
                        color={colors.yellow}
                      />
                    </TouchableOpacity>
                  </View>
                ))}
              </>
            ))}

          {render && <EmptySpace />}

          {render && render.length === 0 && <NoResultsScreen />}
        </ScrollView>
      )}

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
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
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
