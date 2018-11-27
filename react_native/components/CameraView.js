'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View
} from 'react-native';
import { RNCamera } from 'react-native-camera';

export default class CameraView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style = {styles.container}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.off}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={'We need your permission to use your camera phone'}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes)
        }}>
          <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
              <TouchableOpacity style={styles.capture} onPress={this.takePicture.bind(this)}>
                  <Text style={styles.text}>Take</Text>
              </TouchableOpacity>
          </View>
        </RNCamera>
      </View>
    );
  }

  takePicture = async function() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      const coded = data.base64;
      const uri = data.uri;
      console.log(uri);
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  text : {
    color: 'black'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingTop: 100,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  }
});
