'use strict';
import React, { PureComponent } from 'react';
import {
  ActivityIndicator,
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native'

const Loading = (ComponentToLoad) => {
  return class LoaderHOC extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        loading : true,
      }
    }

    componentDidMount() {
      setTimeout(() => {
        this.setState({loading: false})
      }, 3000)
    }

    render() {
      console.log("Test ", this.state.loading);
      if (this.state.loading) {
        console.log("Loading!");
        return (
          <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )
      } else if (!this.state.loading) {
        console.log("It should be loading");
        return (
          <ComponentToLoad address={this.state.address} email={this.state.email}/>
        )
      }
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor : '#3066BE'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
})

export default Loading;
