import React, { Component } from 'react';
import { 
  TouchableOpacity, ScrollView, Dimensions, Image, Alert, AsyncStorage, View, Text, TextInput, Platform, StyleSheet, SafeAreaView
} from 'react-native';
import { Divider, Input, Button } from 'react-native-elements';
import SplashScreen from 'react-native-splash-screen';
import ProfileImgSwiper from './Component/ProfileImgSwiper';
import api from './../api';

const deviceWidth = Dimensions.get('window').width;

class AuthScreen extends Component {
  constructor(props) {
    setTimeout(() => {
      SplashScreen.hide();
    }, 500)
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  componentDidMount() {
  }
  
  componentDidAppear() {
  }

  signInClick = () => {
    // 로그인 로직 유저 있는지 없는지 검사 Asyncstorage유저 저장
    const self = this;
    const query = `{
      userWithPassword(email: "${this.state.email}", password: "${this.state.password}") {
        id
        nickname
        email
      }
    }`;
    api.get(query).then(r => {
      if (r.data.errors) {
        if (r.data.errors[0].message === "password is not correct") {
          throw Alert.alert("이메일/패스워드가 일치하지 않습니다.");
        }
        else if (r.data.errors[0].message === "email does not exist") {
          throw Alert.alert("해당 이메일이 존재하지 않습니다.");
        }
        else throw Alert.alert("에러발생");
      } else {
        return api.setStorageUser(AsyncStorage, r.data.data.userWithPassword) 
      }
    }).then(user => {
      self.props.navigation.navigate('main')
    }).catch(e => console.log(e));

  }


  render () {
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{height: 150, width: deviceWidth * 0.7, margin: deviceWidth * 0.15, marginBottom: 60 }}
        >
          <Image
            style={{flex: 1, width: null, height: null}}
            source={require('./../static/title.png')}
          />
        </View>
        <Input 
          onChangeText={(email) => this.setState({ email })} 
          name="email" 
          placeholder="이메일" 
          containerStyle={styles.input}
          textContentType="username"></Input>
        <Input 
          onChangeText={(password) => this.setState({ password})}
          containerStyle={styles.input}
          name="password"
          placeholder="패스워드"
          textContentType="password"
          secureTextEntry></Input>
        <Button
          title="로그인"
          onPress={this.signInClick}
          loadingProps={{ size: "large", color: "rgba(111, 202, 186, 1)" }}
          titleStyle={{ fontWeight: "700" }}
          buttonStyle={{
            backgroundColor: api.color.sd,
            width: deviceWidth * 0.6,
            height: 45,
            borderColor: "transparent",
            borderWidth: 0,
            marginTop: 0,
            marginBottom: 0,
            margin: deviceWidth * 0.2,
            borderRadius: 5
          }}
          containerStyle={{ marginTop: 20 }}
        />
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
  input: {
    width: deviceWidth * 0.7,
    height: 45,
    borderColor: "transparent",
    borderWidth: 0,
    marginTop: 0,
    marginBottom: 0,
    margin: deviceWidth * 0.15,
  }
});

export default AuthScreen;
