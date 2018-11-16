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

  sex = () => {
    alert("sex")
  }

  render () {
    let [id, age, area, gender, keyword, numOfStamp] = Array(6).fill(null).map(() => ({}));
    id.left = (
      <Text>유저 ID</Text>
      );
    id.center = (
      <Text>TEMP 하늘사랑13</Text>
      );
    id.right = (
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <TouchableOpacity onPress={this.sex}><Text>남자</Text></TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          <TouchableOpacity onPress={this.sex}><Text>여자</Text></TouchableOpacity>
        </View>
      </View>
      );
    age.left = (
      <Text>생년월일</Text>
    );
    age.center = (
      <Text>1991.04.12</Text>
    );
    age.right = (
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <TouchableOpacity onPress={this.sex}><Text>남자</Text></TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          <TouchableOpacity onPress={this.sex}><Text>여자</Text></TouchableOpacity>
        </View>
      </View>

    );
    area.left = (
      <Text>지역</Text>
    );
    area.center = (
      <Text>경기도 수원</Text>

    );
    area.right = (
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <TouchableOpacity onPress={this.sex}><Text>남자</Text></TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          <TouchableOpacity onPress={this.sex}><Text>여자</Text></TouchableOpacity>
        </View>
      </View>

    );
    gender.left = (
      <Text>성별</Text>
    );
    gender.center = (
      <Text>여자</Text>

    );
    gender.right = (
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <TouchableOpacity onPress={this.sex}><Text>남자</Text></TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          <TouchableOpacity onPress={this.sex}><Text>여자</Text></TouchableOpacity>
        </View>
      </View>

    );
    keyword.left = (
      <Text>내 키워드</Text>
    );
    keyword.center = (
      <Text>#솔로 #사진찍기 #영화보기</Text>

    );
    keyword.right = (
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <TouchableOpacity onPress={this.sex}><Text>남자</Text></TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          <TouchableOpacity onPress={this.sex}><Text>여자</Text></TouchableOpacity>
        </View>
      </View>

    );
    numOfStamp.left = (
      <Text>우표갯수</Text>
    );
    numOfStamp.center = (
      <Text>13 장</Text>

    );
    numOfStamp.right = (
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <TouchableOpacity onPress={this.sex}><Text>남자</Text></TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          <TouchableOpacity onPress={this.sex}><Text>여자</Text></TouchableOpacity>
        </View>
      </View>

    );
    return (
      <SafeAreaView style={styles.container}>
        <SplitThreeBar left={id.left} center={id.center} right={id.right}></SplitThreeBar>
        <SplitThreeBar left={age.left} center={age.center} right={age.right}></SplitThreeBar>
        <SplitThreeBar left={area.left} center={area.center} right={area.right}></SplitThreeBar>
        <SplitThreeBar left={gender.left} center={gender.center} right={gender.right}></SplitThreeBar>
        <SplitThreeBar left={keyword.left} center={keyword.center} right={keyword.right}></SplitThreeBar>
        <SplitThreeBar left={numOfStamp.left} center={numOfStamp.center} right={numOfStamp.right}></SplitThreeBar>
        <SplitThreeBar left={<Text>회원탈퇴</Text>} center={numOfStamp.center} right={numOfStamp.right}></SplitThreeBar>
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
