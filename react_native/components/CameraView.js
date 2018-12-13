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
import Svg, { Rect } from 'react-native-svg';
import { RNCamera } from 'react-native-camera';
import ImageCapture from '../classes/ImageCapture';
import DisplayUserInfo from './DisplayUserInfo';

const { width, height } = Dimensions.get('window');

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
            <Svg height={height * 0.85} width={width * 0.8}>
              <Rect
                x="1"
                y="215"
                width={width * 0.8 - 2}
                height={height * 0.55}
                fill="none"
                stroke="green"
                strokeWidth="2"
              />
            </Svg>
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
          if (res.success) {
            // Set the state here
            this.setState({student_address : res.student_address, student_email : res.user_email, imageUploadedSuccessfully : true, processingImage : false })
          } else {
            // TODO: need to update it such that it fetches an error message instead and displays a different error message
            this.setState({ imageUploadedSuccessfully : false, processingImage : false, error_msg : res.error_msg, error : true })
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
    } else if (this.state.processingImage) {
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
    } else if (!this.state.imageUploadedSuccessfully && this.state.error) {
      <View style={styles.container}>
        <Text>{this.state.error_msg}</Tex>
      </View>
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
    position: 'absolute',
    justifyContent: 'center',
    bottom: 15,
    // left: width / 2 - 10,
    // right: width / 2 + 10
  }
});


export default CameraView;
