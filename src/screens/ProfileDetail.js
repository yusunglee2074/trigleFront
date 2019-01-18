import React, { Component } from 'react';
import { 
  ScrollView, AsyncStorage, View, Text, StyleSheet, SafeAreaView, TouchableOpacity, WebView
} from 'react-native';
import { Icon, Avatar, Button } from 'react-native-elements';
import moment from 'moment';
import 'moment/locale/ko'
import api from './../api';

class ProfileDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileUser: '',
      me: '',
      address: '',
      isLoading: true,
      notJoinUser: false,
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

  componentWillMount() {
    if (!this.props.navigation.state.params.userId) {
      // 유저 아이디가 없는 그저 주소만 있는 유저를 위해
      api.getStorageUser(AsyncStorage)
        .then(user => {
          return this.setState({ me: user })
        })
        .then(r => {
          let addressId = this.props.navigation.state.params.addressId;
          const query = `{
            address(id: "${addressId}") {
              id
              receiverName
              profileImage {
                url
              }
              address1
              address2
              detailAddress
            }
          }`
          return api.get(query);
        })
        .then(r => {
          let address = r.data.data.address
          let tempUser = {};
          tempUser.nickname = address.receiverName;
          tempUser.profileImage = address.profileImage;
          tempUser.updatedAt = '미가입유저';
          tempUser.keywords = [];
          tempUser.address1 = address.address1;
          tempUser.address2 = address.address2;
          tempUser.id = address.id;
          tempUser.detailAddress = address.detailAddress;

          this.setState({ notJoinUser: true, address: true, profileUser: tempUser, isLoading: false });
        })
        .catch(e => console.log(e));
    }
    else {
      api.getStorageUser(AsyncStorage)
        .then(user => {
          return this.setState({ me: user })
        })
        .then(r => {
          let currentProfileUserId = this.props.navigation.state.params.userId;
          return api.getUser(currentProfileUserId, ['profileImage{ id url }', 'updatedAt', 'keywords{ keywordId { keyword } }', 'birthday']);
        })
        .then(r => {
          let user = r.data.data.user;
          moment.locale('ko')
          user.updatedAt = moment(user.updatedAt).fromNow();
          return this.setState({ profileUser: user })
        })
        .then(r => {
          const query = `{
          address(userId: "${this.state.me.id}", receiverId: "${this.state.profileUser.id}") {
            id
          }
        }`
          return api.get(query);
        })
        .then(r => {
          this.setState({ isLoading: false, address: r.data.data.address });
        })
        .catch(e => console.log(e))
    }
  }

  componentDidAppear() {
    this.setState({ text: 'power' });
  }

  toggleAddress = (add) => {
    let query;
    let profileUser = this.state.profileUser;
    if (add) {
      query = `mutation {
        createAddress(
          userId: "${this.state.me.id}",
          receiverId: "${profileUser.id}",
          numberOfSent: 0,
          numberOfReceived: 0,
        ) {
          id
        }
      }`
    }
    else {
      if (this.state.notJoinUser) {
        return
      }
      query = `mutation {
        deleteAddress(
          userId: "${this.state.me.id}",
          receiverId: "${profileUser.id}",
        )
      }`
    }
    api.post(query)
      .then(r => {
        if (r.status === 200) return this.setState({ address: r.data.data.createAddress || r.data.data.address });
      })
      .catch(e => console.log(e))
  }

  goWrite = () => {
    api.setReceiver(AsyncStorage, this.state.profileUser)
      .then(r => {
        this.props.navigation.navigate('write');
      })
      .catch(e => console.log(e))
  }

  render () {
    if (!this.state.isLoading) {
      let addressButton = <Button title="주소록에 추가" onPress={() => this.toggleAddress(true)}></Button>;
      let alreadyAdded = <Button title="이미 추가된 친구" onPress={() => this.toggleAddress(false)}></Button>;
      let keywords = [];
      for (let i = 0; i < this.state.profileUser.keywords.length; i++) {
        keywords.push(<Button
          key={i}
          title={this.state.profileUser.keywords[i].keywordId.keyword}
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
        />);
      }
      return (
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <View style={{ backgroundColor: 'grey', height: 65 }}>
            </View>
            <View style={{ marginTop: 100, padding: 20 }}>
              <Text style={{ fontSize: 26, marginBottom: 6 }}>{this.state.profileUser.nickname}</Text>
              {this.state.notJoinUser
                  ? null
                  : (<View style={{ flexDirection: 'row'}}>
                    <Icon name="cake" type="entypo" size={14}></Icon>
                    <Text> 생일: {this.state.profileUser.birthday ? this.state.profileUser.birthday : "공개안함"}</Text>
                  </View>) 
              }
              {this.state.notJoinUser
                  ? (<View style={{ flexDirection: 'row'}}>
                    <Icon name="location-pin" type="entypo" size={14}></Icon>
                    <Text> 지역: {this.state.profileUser.address1
                        + ' ' + this.state.profileUser.address2
                        + ' ' + this.state.profileUser.detailAddress }</Text>
                  </View>)
                  : (<View style={{ flexDirection: 'row'}}>
                    <Icon name="location-pin" type="entypo" size={14}></Icon>
                    <Text> 지역: {this.state.profileUser.address1 ? this.state.profileUser.address1 : "공개안함"}</Text>
                  </View>)
              }
              
              {this.state.notJoinUser
                  ? null 
                  : (<View style={{ flexDirection: 'row'}}>
                <Icon name="documents" type="entypo" size={14}></Icon>
                <Text> 답장률: 70%</Text>
              </View>) 
              }
              <View style={{ flexDirection: 'row'}}>
                <Icon name="back-in-time" type="entypo" size={14}></Icon>
                <Text> 마지막 접속: {this.state.profileUser.updatedAt}</Text>
              </View>
              {this.state.address ? alreadyAdded : addressButton}
              <View style={styles.divider}/>
              <View>
                { this.state.notJoinUser ? <Text></Text> : <Text>관심 키워드</Text> }
                <View style={{ flexDirection: 'row', flex: 1, flexWrap: 'wrap' }}>
                  {keywords ? keywords : ''}
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
          <View>
            <Text>주소록삭제 + 차단</Text>
            <Button title="편지쓰기" onPress={() => this.goWrite()}></Button>
          </View>
        </SafeAreaView>
      );
    }
    else {
      return (
        <Text>로딩중</Text>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  divider: { marginTop: 20, marginBottom: 20, borderBottomColor: '#cccccc', borderBottomWidth: 1 }
});

export default ProfileDetail;
