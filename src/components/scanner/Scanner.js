import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'react-native-image-picker';
import {Slider} from '@miblanchard/react-native-slider';
import RNQRGenerator from 'rn-qr-generator';
import RBSheet from 'react-native-raw-bottom-sheet';
import {colors} from '../../Helpers/Colors';
import ScannedResult from '../ScannedResult/ScannedResult';

class Scanner extends Component {
  constructor(props) {
    super(props);
    this.camera = null;
    this.barcodeCodes = [];

    this.state = {
      camera: {
        type: RNCamera.Constants.Type.back,
        flashMode: RNCamera.Constants.FlashMode.off,
      },
      zoom: 0,
      reader: {
        message: null,
        data: null,
      },
      modalData: {
        data: '',
        flag: 'scanned',
        from: 'scanner',
      },
      ShowComment: false,
    };
  }

  onBarCodeRead(scanResult) {
    if (scanResult.data != null) {
      this.setState({
        modalData: {
          data: scanResult.data,
        },
      });
      this.setState({
        ShowComment: true,
      });
      this.RBSheet.open();
    }
    return;
  }

  pendingView() {
    return (
      <View style={styles.waiting}>
        <Text>Waiting</Text>
      </View>
    );
  }

  openPicker() {
    ImagePicker.showImagePicker(
      {
        title: 'Select Image',
        mediaType: 'photo',
        takePhotoButtonTitle: '',
        chooseFromLibraryButtonTitle: 'Choose from Library...',
        selectionLimit: 1,
        includeBase64: true,
      },
      response => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          if (response.uri) {
            console.log(response);
            RNQRGenerator.detect({
              uri: response.path,
              base64: response.uri,
            })
              .then(response => {
                const {values} = response; // Array of detected QR code values. Empty if nothing found.
                if (values[0]) {
                  this.setState({
                    modalData: {
                      data: values[0],
                    },
                  });
                  this.setState({
                    ShowComment: true,
                  });
                  this.RBSheet.open();
                } else {
                  alert('QrCode not found in given image');
                }
              })
              .catch(error => alert('QrCode not found in given image'));
          }
        }
      },
    );
  }

  render() {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.darkGray,
          },
        ]}>
        {!this.state.ShowComment && (
          <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            flashMode={this.state.camera.flashMode}
            onBarCodeRead={this.onBarCodeRead.bind(this)}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
            captureAudio={false}
            style={styles.preview}
            type={this.state.camera.type}
            zoom={this.state.zoom}>
            <BarcodeMask
              edgeColor={colors.yellow}
              showAnimatedLine={true}
              animatedLineColor={colors.yellow}
              lineAnimationDuration={2000}
              width={270}
              height={270}
              outerMaskOpacity={0.6}
              edgeRadius={5}
            />
          </RNCamera>
        )}
        <View style={styles.sliderView}>
          <Text style={[styles.sliderLabel, {left: 40}]}>-</Text>
          <Slider
            value={this.state.zoom}
            containerStyle={styles.sliderOverLay}
            onValueChange={value =>
              this.setState({
                zoom: parseFloat(value[0].toFixed(1)),
              })
            }
            thumbTintColor={colors.yellow}
            trackStyle={{backgroundColor: colors.white, height: 2}}
          />
          <Text style={[styles.sliderLabel, {right: 33}]}>+</Text>
        </View>
        <View style={[styles.overlay, styles.topOverlay]}>
          <Text style={styles.scanScreenMessage}>
            Align the QR code within the frame to scan
          </Text>
        </View>
        <View style={[styles.overlay, styles.topOverlayButtons]}>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                camera: {
                  flashMode:
                    this.state.camera.flashMode === 0
                      ? RNCamera.Constants.FlashMode.torch
                      : RNCamera.Constants.FlashMode.off,
                  type: this.state.camera.type,
                },
              });
            }}>
            <Text>
              <MaterialIcons
                name={
                  this.state.camera.flashMode !== 0 ? 'flash-on' : 'flash-off'
                }
                size={25}
                color={
                  this.state.camera.flashMode !== 0
                    ? colors.yellow
                    : colors.white
                }
              />
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.openPicker()}>
            <Text>
              <MaterialIcons name="image" size={25} color="white" />
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.setState({
                camera: {
                  type:
                    this.state.camera.type === 0
                      ? RNCamera.Constants.Type.front
                      : RNCamera.Constants.Type.back,
                  flashMode: this.state.camera.flashMode,
                },
              });
            }}>
            <Text>
              <MaterialIcons
                name="flip-camera-android"
                size={25}
                color={
                  this.state.camera.type !== 0 ? colors.yellow : colors.white
                }
              />
            </Text>
          </TouchableOpacity>
        </View>

        <RBSheet
          ref={ref => {
            this.RBSheet = ref;
          }}
          closeOnDragDown={true}
          closeOnPressMask={false}
          animationType="fade"
          onClose={() => this.setState({ShowComment: false})}
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
          <ScannedResult route={this.state.modalData} />
        </RBSheet>
      </View>
    );
  }
}

const styles = {
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
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    padding: 12,
    right: 0,
    left: 0,
    alignItems: 'center',
  },
  topOverlay: {
    top: 120,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    width: '100%',
  },
  sliderLabel: {
    color: colors.yellow,
    fontSize: 25,
    position: 'absolute',
    bottom: 155,
  },
  sliderView: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderOverLay: {
    width: 250,
    bottom: 150,
    position: 'absolute',
  },

  topOverlayButtons: {
    top: 15,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    display: 'flex',
    // width: '100%',
    backgroundColor: 'rgba(0,0,0,0.4)',
    marginHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  enterBarcodeManualButton: {
    backgroundColor: 'white',
    borderRadius: 40,
  },
  scanScreenMessage: {
    width: '45%',
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  waiting: {
    flex: 1,
    backgroundColor: 'lightgreen',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default Scanner;
