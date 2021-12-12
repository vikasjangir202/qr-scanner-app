import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import RNQRGenerator from 'rn-qr-generator';
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
        console.log(uri);
      })
      .catch(error => console.log('Cannot create QR code', error));
  }, [data]);

  return (
    <View style={styles.container}>
      {imageUri && width && (
        <Image
          style={{height: height, width: width, transform: [{scale: 2}]}}
          source={{uri: imageUri}}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 5,
    marginTop: 5,
    padding: 60,
  },
});
