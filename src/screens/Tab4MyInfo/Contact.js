import React, { Component } from 'react';
import { 
  AsyncStorage, View, Text, Button, StyleSheet, SafeAreaView, TouchableOpacity, WebView
} from 'react-native';

class Contact extends Component {
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
        <Text>자주묻는 질문</Text>
        <Text>제목</Text>
        <Text>내용</Text>
        <Text>보내기</Text>
        <Text>답변은 앱과 회원 아이디의 이메일로 전송됩니다.</Text>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Contact;
