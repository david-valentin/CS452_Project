'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import {Button, NavigatorIOS, Text, View, StyleSheet, ScrollView} from 'react-native';
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
    console.log("Index ", this.props.index);
    // let nextIndex = ++this.props.index;
    // console.log("Index ", nextIndex);
    this.props.navigator.push({
      component: CameraView,
      title: 'Scene ' + 1,
      passProps: {index:  1},
    });
  }


  render() {
    console.log("Loading the initial view");
    return (
      <ScrollView>
        <View style={styles.container}>
            <Text style={styles.text}>Mail Center ID Scanner</Text>
            <Button
              onPress={this._onForward}
              title="Tap to begin scanning ID"
            />
        </View>
      </ScrollView>
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
          passProps: { index: 1 }
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
    flexDirection : 'column',
    justifyContent: 'center',
  },
  text : {
    color: 'black',
  }
});
