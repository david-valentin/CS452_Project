import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  NativeModules,
  DeviceEventEmitter,
} from 'react-native';

import Uploader from './Uploader';

export default class App extends React.Component {

  componentDidMount() {
    var RNUploader = NativeModules.RNUploader;
  }

  render() {
    return (
      <View style={styles.container}>
        <Uploader />
      </View>
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
});
