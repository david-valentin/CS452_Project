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
  Alert,
  ActivityIndicator
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
      imageCaptured : false,
      processingImage : false
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
    this.setState({processingImage : true})
    let data = new FormData();
    var photo = {
    	uri: picturePath,
    	type: 'image/jpeg',
    	name: 'scanned_image.jpg',
    };
    data.append('file', photo);
    data.append('filename', 'scanned_id')
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
          return this.handleUploadImage(this.state.imageURL)
          console.log("STATE: ", this.state.imageURL);

        })
        .then((res) => {
          console.log("Response: ", JSON.stringify(res));
          // Set the state here
          this.setState({student_address : res.student_address, student_email : res.user_email, imageUploadedSuccessfully : true, processingImage : false })
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
    } else if (this.state.imageUploadedSuccessfully && this.state.processingImage) {
      return (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    } else if (this.state.imageUploadedSuccessfully && !this.state.processingImage) {
      return (
        <View style={styles.container}>
          <DisplayUserInfo email={this.state.student_email} address={this.state.student_address}/>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white'
  },
  text : {
    color: 'white',
    alignSelf: 'flex-end'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
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
