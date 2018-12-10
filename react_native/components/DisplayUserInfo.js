'use strict';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Loading from './Loading';
import { Button } from 'react-native';


class DisplayUserInfo extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Open up DisplayUserInfo.js to start working on your DisplayUserInfo!</Text>
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

export default Loading(DisplayUserInfo);
