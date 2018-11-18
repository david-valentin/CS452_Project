'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import {Button, NavigatorIOS, Text, View, StyleSheet} from 'react-native';
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
    let nextIndex = ++this.props.index;
    this.props.navigator.push({
      component: MyScene,
      title: 'Scene ' + nextIndex,
      passProps: {index: nextIndex},
    });
  }


  render() {
    console.log("Loading the initial view");
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Mail Center ID Scanner</Text>
        <Button
          onPress={this._onForward}
          title="Tap being scanning ID"
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
          component: CameraView,
          title: 'ID Scanner',
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
