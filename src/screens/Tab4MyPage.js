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




  signUpClick = () => {
    // 이메일, 비밀번호 서버콜치고 받은 엑세스 코드와 유저정보 acyncstroage에 저장
    AsyncStorage.setItem('user', '저장완료').then(() => {
      // 그 후 메인페이지로 쏨
      Navigation.dismissAllModals();
    })
  }


  render () {
    return (
      <SafeAreaView style={styles.container}>
        <Text>TRIPLE(로고)</Text>
        <Button title="어떤 서비스인가요?"></Button>
        <TextInput placeholder="이메일"></TextInput>
        <TextInput placeholder="패스워드"></TextInput>
        <Button title="회원가입" onPress={this.signUpClick}></Button>
        <View
          style={{
          borderBottomColor: 'black',
          borderBottomWidth: 1,
          marginTop: 10,
          marginBottom: 10
          }}
        />
        <Text>이미 아이디가 있으신가요?</Text>
        <Button title="로그인하러가기"></Button>
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
