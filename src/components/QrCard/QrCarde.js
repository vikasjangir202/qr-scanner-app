import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import RNQRGenerator from 'rn-qr-generator';
import RNFetchBlob from 'rn-fetch-blob';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../Helpers/Colors';

export default function QrCarde({data}) {
  const [imageUri, setImageUri] = useState();
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();

  useEffect(() => {
    RNQRGenerator.generate({
      value: data,
      height: 100,
      width: 100,
      base64: true,
    })
      .then(response => {
        const {uri, width, height, base64} = response;
        setImageUri(uri);
        setWidth(width);
        setHeight(height);
        console.log('uurrrii', uri);
      })
      .catch(error => console.log('Cannot create QR code', error));
  }, [data]);

  const pictureFolder = RNFetchBlob.fs.dirs + '/Pictures/QRScanner/';

  async function saveToLocal(uri) {
    let exists = await RNFetchBlob.fs.exists(pictureFolder);
    if (exists) {
      RNFetchBlob.fs
        .stat(uri) // Relative path obtained from document picker
        .then(stats => {
          var str1 = 'file://';
          var str2 = stats.path;
          var correctpath = str1.concat(str2);
          let saved = RNFetchBlob.fs.cp(
            correctpath,
            pictureFolder + stats.filename,
          );
          if (saved) {
            alert('Success');
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      RNFetchBlob.fs
        .mkdir(pictureFolder)
        .then(() => {
          console.log('DIRECTORY CREATED');
        })
        .catch(e => {
          console.log('Directory Creating Error : ' + e.message);
        });
    }
  }

  return (
    <View style={styles.container}>
      {imageUri && width && (
        <Image
          style={{height: height, width: width, transform: [{scale: 1.4}]}}
          source={{uri: imageUri}}
        />
      )}
      <TouchableOpacity
        style={{marginTop: 30}}
        onPress={() => saveToLocal(imageUri)}>
        <AntDesign name="download" color={colors.yellow} size={25} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'column',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    padding: 10,
  },
});
