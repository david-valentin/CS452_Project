'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  NavigatorIOS,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image
} from 'react-native';

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
      title: 'Scanner',
      passProps: {index:  1},
    });
  }


  render() {
    console.log("Loading the initial view");
    return (
      <ScrollView style={styles.scrollViewStyle}
      contentContainerStyle ={styles.contentContainer}
      scrollEnabled={false}
      contentCenter={true}>
        <View style={styles.container}>
            <Image
              style={{width: 50, height: 50, flexDirection : 'row', justifyContent : 'center'}}
              source={require('../assets/app-imgs/mail-scanner-img-100px.png')}
             />
            <Text style={styles.text}>Mail Center ID Scanner</Text>
            <Button
              style={styles.btnToScanner}
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
    alignItems: 'center',
    flexDirection : 'column',
    justifyContent: 'center',
    backgroundColor : '#80DED9'
  },
  scrollViewStyle : {
    backgroundColor : '#80DED9',
  },
  contentContainer : {
    alignItems: 'center',
    flexDirection : 'column',
    justifyContent: 'center',
    flexGrow: 1,
  },
  btnToScanner : {
    fontSize : 10,
    backgroundColor : '#3066BE',
    padding : 20,
    color : '#3066BE'
  },
  text : {
    color: 'black',
    fontFamily : 'Avenir',
    fontSize : 20,
  }
});
