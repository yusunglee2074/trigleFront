import React, { Component } from 'react';
import { 
  AsyncStorage, View, Text, TextInput, Button, Platform, StyleSheet, SafeAreaView
} from 'react-native';

class AuthScreen extends Component {
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
        <Text>'@@'님의 편지가 곧 도착할꺼에요! 확인</Text>
        <Text>'@@'님의 편지 잘 읽어보셨나요? 답장하기</Text>
        <Text>익명 포스팅(누구든 답장해주세요) 아래꺼랑 섞어서</Text>
        <Text>이건 어떻게 생각하세요?</Text>
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
