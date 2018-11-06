import React, { Component } from 'react';
import { 
  AsyncStorage, View, Text, TextInput, Button, Platform, StyleSheet, SafeAreaView
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';


class AuthScreen extends Component {
  constructor(props) {
    setTimeout(() => {
      SplashScreen.hide();
    }, 500)
    super(props);
    this.state = {
      text: 'test'
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('user').then(user => {
      if (user) {
        // 유저가 있으며 메인 페이지로 쏨j

      }
    })
  }
  
  componentDidAppear() {
    this.setState({ text: 'power' });
  }

  render () {
    return (
      <SafeAreaView style={styles.container}>
        <Text>TRIPLE(로고)</Text>
        <Text>반갑습니다 여러분 </Text>
        <Text></Text>
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
    backgroundColor: '#33373B',
  },
});

export default AuthScreen;
