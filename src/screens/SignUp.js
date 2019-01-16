import React, { Component } from 'react';
import { 
  Alert, AsyncStorage, View, Text, TextInput, Button, Platform, StyleSheet, SafeAreaView
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import ProfileImgSwiper from './Component/ProfileImgSwiper';
import api from './../api';

class AuthScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      profileImgIdx: 0,
    };
  }

  componentDidMount() {
    let databaseUser;
    setTimeout(() => SplashScreen.hide(), 500);
    api.getStorageUser(AsyncStorage)
      .then(user => {
        if (!user) return;
        const query = `
          {
            user(id: "${user.id}") {
              id
              accessToken
              email
            }
          }`;
        return api.get(query)
      })
      .then(r => {
        if (!r) return;
        if (!r.data.data.user) throw "user not exist";
        if (r.data.data.user) this.props.navigation.navigate('main');
      })
      .catch(e => console.log(e));
  }
  
  componentDidAppear() {
    this.setState({ text: 'power' });
  }

  signUpClick = async () => {
    // checkEmail and password
    let regEmailCheker = /\S+@\S+\.\S+/;
    if (regEmailCheker.test(this.state.email)) {
      if (this.state.password.length < 4) Alert.alert('오류', '패스워드는 4자리 이상이여야 합니다.');
      else {
        const self = this;
        let createUserQuery = `mutation {
            createUser(
              email: "${this.state.email}",
              password: "${this.state.password}",
              profileImgIdx: "${this.state.profileImgIdx}"
            ) {
              id
              email
              accessToken
            }}`
        api.post(createUserQuery)
          .then(r => {
            if (!r.data.errors) {
              return AsyncStorage.setItem('user', JSON.stringify(r.data.data.createUser))
            } else if(r.data.errors[0].message === "email already exist") {
              Alert.alert('오류', '이미 가입된 이메일이 존재합니다.')
              throw "email already exist";
            } else {
              Alert.alert('치명 오류', '고객센터에 문의하십시오.');
              throw r.data.errors[0];
            }
          })
          .then(() => {
            return AsyncStorage.getItem('user')
          })
          .then(item => {
            self.props.navigation.navigate('main')
          })
          .catch(e => {
            console.log(e);
          });
      }
    } else Alert.alert('오류', '이메일 형식을 확인하세요');
  }

  signInClick = () => {
    this.props.navigation.navigate('signIn')
  }

  aboutServiceClick = () => {
      this.props.navigation.navigate('about')
  }

  changeProfile = (index) => {
    this.setState({ profileImgIdx: index });
    console.log(this.state)
  }

  render () {
    return (
      <SafeAreaView style={styles.container}>
        <Text>TRIPLE(로고)</Text>
        <Button title="어떤 서비스인가요?" onPress={this.aboutServiceClick}></Button>
        <View style={{ flex: 0.5, width: "50%", alignSelf:'center' }}>
          <ProfileImgSwiper onIndexChanged={this.changeProfile}></ProfileImgSwiper>
        </View>
        <TextInput onChangeText={(email) => this.setState({ email })} name="email" placeholder="이메일" textContentType="username"></TextInput>
        <TextInput onChangeText={(password) => this.setState({ password})} name="password" placeholder="패스워드" textContentType="password" secureTextEntry></TextInput>
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
        <Button title="로그인하러가기" onPress={this.signInClick}></Button>
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
