import React, { Component } from 'react';
import { 
  AsyncStorage, View, Text, TextInput, Button, Platform, StyleSheet, SafeAreaView
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { Navigation } from 'react-native-navigation';


class AuthScreen extends Component {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
    this.state = {
      text: 'test'
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
        <View style={styles.content}>
          <Text>편지지 선택</Text>
          <Button title='보내기'></Button>
      </View>
      </SafeAreaView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 30,
  },
});

export default AuthScreen;
