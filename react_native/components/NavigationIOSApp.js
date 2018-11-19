'use strict';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  NavigatorIOS,
  Text,
  View,
  StyleSheet,
  AppRegistry,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import CameraView from './CameraView';

class MyScene extends React.Component {

  static propTypes = {
    route: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }),
    navigator: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this._onForward = this._onForward.bind(this);
  }

  _onForward() {
    let nextIndex = this.props.index;
    console.log("Value: ", nextIndex, this.props.index);
    this.props.navigator.push({
      component: CameraView,
      title: 'Scan ID',
    })
  }

  render() {
    console.log("Other: ", this.props.index);

    return (
      <View style={styles.container}>
        <Text>Current Scene: {this.props.title}</Text>
        <Button
          onPress={this._onForward}
          title="Tap me to load the next scene"
        />
      </View>
    );
  }
}

export default class NavigationIOSApp extends React.Component {

  render() {
    console.log("Loading the Navigator Ios");
    return (
      <NavigatorIOS
        initialRoute={{
          component: MyScene,
          title: 'ID Scanner',
          passProps: {index: 1},
        }}
        style={{flex: 1}}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text : {
    color: 'black'
  }
});
