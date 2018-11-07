import React, { Component } from 'react';
import { 
  AsyncStorage, View, Text, Button, StyleSheet, SafeAreaView, TouchableOpacity, WebView
} from 'react-native';

class SelectReceiver extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }
  
  componentDidAppear() {
    this.setState({ text: 'power' });
  }

  render () {
    return (
      <SafeAreaView style={styles.container}>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SelectReceiver;
