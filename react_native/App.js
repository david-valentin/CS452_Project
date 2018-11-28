'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import {Button, NavigatorIOS, Text, View, StyleSheet, ScrollView} from 'react-native';
import Loading from './components/Loading';
import {createStackNavigator} from 'react-navigation';
import NavigationIOSApp from "./components/NavigationIOSApp";

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name : "",
      box_number : "",
      address : ""
    }
  }

  render() {
    return (
      <NavigationIOSApp style={styles.container}/>
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
    backgroundColor: 'black'
  }
});

export default App;
