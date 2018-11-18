'use strict';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Loading from './Loading';
import { Button } from 'react-native';


class ScannedResultsScreen extends React.Component {
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
      <View style={styles.container}>
        <Text>Open up ScannedResultsScreen.js to start working on your ScannedResultsScreen!</Text>
        <Text>Email: {this.props.email}</Text>
        <Text>Address: {this.props.address}</Text>
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

export default Loading(ScannedResultsScreen);
