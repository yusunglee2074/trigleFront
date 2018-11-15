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
        <Text>프로필 수정(무료우편)</Text>
        <Text>통계</Text>
        <Text>주소록</Text>
        <Text>보낸 편지 내역</Text>
        <Text>받은 편지 내역</Text>
        <Text>문의하기(무료우편)</Text>
        <Text>어떤 서비스인가요?</Text>
        <Text>회원 탈퇴</Text>
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
