'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Image
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import ImageCapture from '../classes/ImageCapture';


/**
 * CameraView presents the camera view for capturing the image
 */
export default class CameraView extends Component {

  constructor() {
    super();
    this.state = {
      imageURL: '',
    };
    this.ImageCapture = new ImageCapture('http://0.0.0.0:80/');
    this.handleUploadImage = this.handleUploadImage.bind(this);
    this.takePicture = this.takePicture.bind(this);
  }

  // <View style={styles.cameraContainer}>
  //     <TouchableOpacity style={styles.capture} onPress={this.handleUploadImage.bind(this)}>
  //         <Text style={styles.text}>Upload Image</Text>
  //     </TouchableOpacity>
  // </View>

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
          <View style={styles.cameraContainer}>
              <TouchableOpacity style={styles.capture} onPress={this.takePicture.bind(this)}>
                  <Image source={require('../assets/app-imgs/img-camera-50.png')} style={styles.capture}/>
              </TouchableOpacity>
          </View>

        </RNCamera>
      </View>
    );
  }


  /**
   * async handleUploadImage - Handles Image Upload
   *
   * @param  {type} picturePath path to the where the image is saved i.e. the URI
   * @return {type}             description
   */
  async handleUploadImage(picturePath) {
    // Creates a new formdata object:
    const data = new FormData();
    // Appends the uri path of the photo and grabs the image data to the data
    data.append('picture', { uri: picturePath, name: 'scanned.jpg', type: 'image/jpg' })

    this.ImageCapture.uploadImageToServer(data)
      .then((response) => {
        if (response) {
          console.log("Success");
        } else {
          console.log("Failed");
        }
      })
      .catch(err => {
        console.error(err);
      });
  }



   /**
    * async takePicture - Takes a photo with the users camera
    *
    * @return {BOOL}  returns whether we were able to take a photo with the camera
    */
   async takePicture() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      const coded = data.base64;
      const uri = data.uri;
      console.log(uri);
      this.setState({uri : uri})
      return true
    } else {
      return false;
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'black'
  },
  text : {
    color: 'white',
    alignSelf: 'flex-end'
  },
  cameraContainer : {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  capture: {
    flex: 0,
    alignSelf: 'flex-end',
  }
});
