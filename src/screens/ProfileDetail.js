import React, { Component } from 'react';
import { 
  ScrollView, AsyncStorage, View, Text, StyleSheet, SafeAreaView, TouchableOpacity, WebView
} from 'react-native';
import { Icon, Avatar, Button } from 'react-native-elements';
import moment from 'moment';
import 'moment/locale/ko'
import api from './../api';

const user = {
  nickname: '볶음밥#13',
  profileImage: '',
  birthday: '1991.04.12',
  address: {
    address1: '경기도 수원시',
    address2: '세지로 420 301호'
  },
  keyword: '#과학#프로그래밍#소설#영화#맛집#술#',
  gender: 'male',
  hide: '#address#birthDay',
  lastLogin: '1일 전' 
}

class ProfileDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileUser: '',
      me: '',
    };
  }

  static navigationOptions =  ({ navigation }) => {
    return {
      title: navigation.getParam('title'),
      headerStyle: {
        backgroundColor: 'red',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
      }
    }
  }

  componentDidMount() {
    api.getStorageUser(AsyncStorage)
      .then(user => {
        return this.setState({ me: user })
      })
      .then(r => {
        // 나와 이 유저와의 관계를 알아내는게 있어야 한다.
        // 주소록에 등록되어있나?
        let currentProfileUserId = this.props.navigation.state.params.user.id;
        return api.getUser(currentProfileUserId, ['profileImage{ url }', 'updatedAt', 'keywords{ keywordId { keyword } }', 'birthday']);
      })
      .then(r => {
        let user = r.data.data.user;
        moment.locale('ko')
        user.updatedAt = moment(user.updatedAt).fromNow();
        return this.setState({ profileUser: user })
      })
      .catch(e => console.log(e))
  }

  componentDidAppear() {
    this.setState({ text: 'power' });
  }

  render () {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={{ backgroundColor: 'grey', height: 65 }}>
          </View>
          <View style={{ marginTop: 100, padding: 20 }}>
            <Text style={{ fontSize: 26, marginBottom: 6 }}>{this.state.profileUser.nickname}</Text>
            <View style={{ flexDirection: 'row'}}>
              <Icon name="cake" type="entypo" size={14}></Icon>
              <Text> 생일: {this.state.profileUser.birthday ? this.state.profileUser.birthday : "공개안함"}</Text>
            </View>
            <View style={{ flexDirection: 'row'}}>
              <Icon name="location-pin" type="entypo" size={14}></Icon>
              <Text> 지역: {this.state.profileUser.address1 ? this.state.profileUser.address1 : "공개안함"}</Text>
            </View>
            <View style={{ flexDirection: 'row'}}>
              <Icon name="documents" type="entypo" size={14}></Icon>
              <Text> 답장률: 70%</Text>
            </View>
            <View style={{ flexDirection: 'row'}}>
              <Icon name="back-in-time" type="entypo" size={14}></Icon>
              <Text> 마지막 접속: {this.state.profileUser.updatedAt}</Text>
            </View>
            <Button title="주소록에 추가" onPress={() => this.toggleAddress()}></Button>
            <View style={styles.divider}/>
            <View>
              <Text>관심 키워드</Text>
              <View style={{ flexDirection: 'row', flex: 1, flexWrap: 'wrap' }}>
                <Button
                  title="#나는 배고프다"
                  titleStyle={{ color: 'black', fontWeight: 'normal', fontSize: 13 }}
                  buttonStyle={{
                    height: 30,
                    backgroundColor: "transparent",
                    borderColor: "rgba(92, 99,216, 1)",
                    alignSelf: 'flex-start',
                    borderWidth: 2,
                    borderRadius: 5
                  }}
                  containerStyle={{ marginTop: 10, marginRight: 5 }}
                />
                <Button
                  title="#영화"
                  titleStyle={{ color: 'black', fontWeight: 'normal', fontSize: 13 }}
                  buttonStyle={{
                    height: 30,
                    backgroundColor: "transparent",
                    borderColor: "rgba(92, 99,216, 1)",
                    alignSelf: 'flex-start',
                    borderWidth: 2,
                    borderRadius: 5
                  }}
                  containerStyle={{ marginTop: 10, marginRight: 5 }}
                />
                <Button
                  title="#나는 다이어트가 하고싶다"
                  titleStyle={{ color: 'black', fontWeight: 'normal', fontSize: 13 }}
                  buttonStyle={{
                    height: 30,
                    backgroundColor: "transparent",
                    borderColor: "rgba(92, 99,216, 1)",
                    alignSelf: 'flex-start',
                    borderWidth: 2,
                    borderRadius: 5
                  }}
                  containerStyle={{ marginTop: 10, marginRight: 5 }}
                />
                <Button
                  title="#영화"
                  titleStyle={{ color: 'black', fontWeight: 'normal', fontSize: 13 }}
                  buttonStyle={{
                    height: 30,
                    backgroundColor: "transparent",
                    borderColor: "rgba(92, 99,216, 1)",
                    alignSelf: 'flex-start',
                    borderWidth: 2,
                    borderRadius: 5
                  }}
                  containerStyle={{ marginTop: 10, marginRight: 5 }}
                />
              </View>
            </View>
            <View style={{ marginTop: 30 }}>
              <Text>개인 키워드</Text>
              <View style={{ flexDirection: 'row', flex: 1, flexWrap: 'wrap' }}>
                <Button
                  title="#나는 배고프다"
                  titleStyle={{ color: 'black', fontWeight: 'normal', fontSize: 13 }}
                  buttonStyle={{
                    height: 30,
                    backgroundColor: "transparent",
                    borderColor: "rgba(92, 99,216, 1)",
                    alignSelf: 'flex-start',
                    borderWidth: 2,
                    borderRadius: 5
                  }}
                  containerStyle={{ marginTop: 10, marginRight: 5 }}
                />
                <Button
                  title="#영화"
                  titleStyle={{ color: 'black', fontWeight: 'normal', fontSize: 13 }}
                  buttonStyle={{
                    height: 30,
                    backgroundColor: "transparent",
                    borderColor: "rgba(92, 99,216, 1)",
                    alignSelf: 'flex-start',
                    borderWidth: 2,
                    borderRadius: 5
                  }}
                  containerStyle={{ marginTop: 10, marginRight: 5 }}
                />
                <Button
                  title="#나는 다이어트가 하고싶다"
                  titleStyle={{ color: 'black', fontWeight: 'normal', fontSize: 13 }}
                  buttonStyle={{
                    height: 30,
                    backgroundColor: "transparent",
                    borderColor: "rgba(92, 99,216, 1)",
                    alignSelf: 'flex-start',
                    borderWidth: 2,
                    borderRadius: 5
                  }}
                  containerStyle={{ marginTop: 10, marginRight: 5 }}
                />
                <Button
                  title="#영화"
                  titleStyle={{ color: 'black', fontWeight: 'normal', fontSize: 13 }}
                  buttonStyle={{
                    height: 30,
                    backgroundColor: "transparent",
                    borderColor: "rgba(92, 99,216, 1)",
                    alignSelf: 'flex-start',
                    borderWidth: 2,
                    borderRadius: 5
                  }}
                  containerStyle={{ marginTop: 10, marginRight: 5 }}
                />
              </View>
            </View>
          </View>
          <View
            style={{ position:'absolute', left: 15, top: 0 }}>
            <Avatar
              size="xlarge"
              containerStyle={{ borderWidth: 3, borderColor: 'white', backgroundColor: "white" }}
              source={{uri: this.state.profileUser.profileImage ? this.state.profileUser.profileImage.url : ''}}
              onPress={() => console.log("Works!")}
              activeOpacity={0.7}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  divider: { marginTop: 20, marginBottom: 20, borderBottomColor: '#cccccc', borderBottomWidth: 1 }
});

export default ProfileDetail;
