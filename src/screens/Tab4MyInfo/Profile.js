import React, { Component } from 'react';
import { 
  AsyncStorage, View, Text, Button, StyleSheet, SafeAreaView, TouchableOpacity, WebView
} from 'react-native';

import SplitThreeBar from './../Component/SplitThreeBar';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('user').then(user => {
      if (user) {
        this.setState({ user });
      }
    })
  }
  
  componentDidAppear() {
  }

  render () {
    let userForm;
    if (this.state.user) {
      userForm = (
        <View>
          <Text>반갑습니다 유저님!</Text>
        </View>
        );
    } else {
      userForm = (
        <View>
          <Text>로그인해주세요!</Text>
        </View>
        );
    }
    return (
      <SafeAreaView style={styles.container}>
        <SplitThreeBar left=<Text>유저 ID</Text> center={userForm} right={userForm}></SplitThreeBar>
        <Text>회원탈퇴</Text>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
});

export default Profile;
