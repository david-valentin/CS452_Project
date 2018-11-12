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
      return fetch('http://127.0.0.1:5000/student-info/David/Valentin')
      .then((res) => {
        if (res.status === 200) {
          console.log("Res ", res);
          return res.json();
        }
      })
      .then((res_json) => {
        console.log("Res_json: ", JSON.stringify(res_json));
        this.setState({address : res_json.address, email : res_json.email, loading: false})
      })
      .catch((err) => {
        console.error(err);
      });
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
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
})

export default Loading;
