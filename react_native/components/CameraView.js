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
  Image,
  Alert
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import ImageCapture from '../classes/ImageCapture';
import DisplayUserInfo from './DisplayUserInfo';

/**
 * CameraView presents the camera view for capturing the image
 */
class CameraView extends Component {

  constructor() {
    super();
    this.state = {
      imageURL: '',
      imageCaptured : false
    };
    this.ImageCapture = new ImageCapture('http://basin.cs.middlebury.edu:5000');
    this.handleUploadImage = this.handleUploadImage.bind(this);
    this.takePicture = this.takePicture.bind(this);
    this.renderCameraView = this.renderCameraView.bind(this);
  }

  /**
   * renderCameraView - Renders the camera view
   *
   * @return {COMPONENT}  description
   */
  renderCameraView() {
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
    let data = new FormData();
    var photo = {
    	uri: picturePath,
    	type: 'image/jpeg',
    	name: 'scanned_image.jpg',
    };
    data.append('file', photo);
    data.append('title', 'scanned_id')
    // Appends the uri path of the photo and grabs the image data to the data
    this.ImageCapture.uploadImageToServer(data)
      .then((response) => {
        if (response) {
          console.log("Success ", response);
          Promise.resolve(true);
        } else {
          console.log("Failed ", response);
          Promise.resolve(false);
        }
      })
      .catch(err => {
        console.error(err);
      });
  }


   /**
    * async takePicture - Takes a photo with the users camera. This is just a wrapper
    *
    * @return {BOOL}  returns whether we were able to take a photo with the camera
    */
   async takePicture() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      // this calls the take picture
      this.camera.takePictureAsync(options)
        .then((data) => {
          let uri = data.uri;
          return uri;
        })
        .then((uri) => {
          this.setState({ imageURL : uri })
        })
        .then(_ => {
          console.log("STATE: ", this.state.imageURL);
          if (this.handleUploadImage(this.state.imageURL)) {
            console.log("UPLOADED TO SERVER");
            return true;
          } else {
            console.log("FAILED TO UPLOAD TO SERVER");
            return false;
          }
        })
        .then((uploadedToServer) => {
          console.log("DID WE UPLOAD: ", uploadedToServer);
          // If we were able to upload our image to the server
          if (uploadedToServer) {
            console.log("Calling the upload to the server");
            this.setState({imageUploadedSuccessfully : true})
          } else {
            console.log("Failed to upload to the server");
          }
        })
        .catch((err) => {
          console.error(err);
          return false;
        });
    } else {
      return false;
    }

  }


  render() {
    if (!this.state.imageUploadedSuccessfully) {
      return (
        this.renderCameraView()
      );
    } else if (this.state.imageUploadedSuccessfully) {
      return (
        <View style={styles.cameraContainer}>
          <Text>We Did it!</Text>
        </View>
      )
    }
  }
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


export default CameraView;
