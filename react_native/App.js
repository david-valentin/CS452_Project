import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Loading from './components/Loading';
import MiddleScreen from './components/MiddleScreen';

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
      <View style={styles.container}>
        <Text>Open up MiddleScreen.js to start working on your MiddleScreen!</Text>
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

export default Loading(App);
