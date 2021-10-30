import React, {Component} from 'react';
import {Button, Text, TouchableOpacity, View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../Configs/Colors';
import BottomNav from '../BottomNav/BottomNav';
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
    };
  }

  onBarCodeRead(scanResult) {
    console.warn(scanResult.type);
    console.warn(scanResult.data);
    if (scanResult.data != null) {
      if (!this.barcodeCodes.includes(scanResult.data)) {
        this.barcodeCodes.push(scanResult.data);
        console.warn('onBarCodeRead call');
      }
    }
    return;
  }

  pendingView() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'lightgreen',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>Waiting</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
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
            width={300}
            height={300}
            outerMaskOpacity={0.7}
            edgeRadius={5}
          />
        </RNCamera>
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

          <TouchableOpacity>
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
        <BottomNav />
      </View>
    );
  }
}

const styles = {
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
    top: 150,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    width: '100%',
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
};

export default Scanner;
