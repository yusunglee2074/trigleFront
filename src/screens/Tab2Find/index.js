import React, { Component } from 'react';
import { 
  Alert, AppState, FlatList, AsyncStorage, View, Text, StyleSheet, SafeAreaView, TouchableOpacity, WebView
} from 'react-native';
import { Icon, SearchBar, Avatar, Button } from 'react-native-elements';

import api from './../../api';
import SplitTwoBar from './../Component/SplitTwoBar';


class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      friendlyUsers: '',
    };
  }

  componentDidMount() {
    this.getFriendlyUsers();
  }

  navigate = (to, params) => {
    switch(to) {
      case 'profileDetail':
        this.props.navigation.navigate('profileDetail', params);
        break;
      case 'setKeyword':
        this.props.navigation.navigate('setKeyword', { setKeywords: (keywords) => this.setKeywords(keywords) });
        break;
    }
  }
  
  setKeywords = (keywords) => {
    let user = Object.assign({}, this.state.user)
    user.keywords = keywords;
    api.setStorageUser(AsyncStorage, user)
      .then(user => {
        this.setState({ user: user });
        this.getFriendlyUsers();
      })
      .catch(e => console.log(e))
  }

  getFriendlyUsers = () => {
    api.getStorageUser(AsyncStorage)
      .then(user => {
        this.setState({ user });
        const query = `{
          userKeywords(userId: "${user.id}") {
            keywordId {
              keyword
            }
          }
        }`
        return api.get(query);
      })
      .then(r => {
        if (!r.data.data.userKeywords.length) {
          Alert.alert('키워드가 없습니다.', '친추 추천을 받으려면\n 자신의 키워드를 먼저 골라야합니다.')
          this.navigate("setKeyword")
        } else {
          // 키워드를 이용해서 추천 친구목록을 가져오자!
          const query = `{
            friendlyUsersByKeywords(userId: "${this.state.user.id}") {
              _id {
                id
                email
                profileImage {
                  url
                }
                nickname
                keywords {
                  id
                  keywordId {
                    keyword
                  }
                }
              }
              bothKeywords{
                id
                keyword
              }
              sizeOfBothKeywords
            }
          }`
          return api.get(query);
        }
      })
      .then(r => {
        if (!r) return
        this.setState({ friendlyUsers: r.data.data.friendlyUsersByKeywords})
      })
      .catch(e => console.log(e))
  }

  render () {
    const keywords = (keywords) => {
      let keywordList = [];
      for (let i = 0; i < keywords.length; i++) {
        keywordList.push(
          <Text key={i}>{keywords[i].keyword} </Text>
        );
      }
      return keywordList;
    };
    const hasKeyword = <FlatList
          style={{ flex:1, marginHorizontal: 10 }}
          data={this.state.friendlyUsers}
          keyExtractor={(item, index) => index.toString()}
          numColumns= {1}
          renderItem={({ item, index }) => {
            return (
                <TouchableOpacity
                  onPress={() => this.navigate('profileDetail', { userId: item._id.id })}
                  style={{
                    borderWidth: 2,
                    borderRadius: 2,
                    borderColor: '#969696',
                    height: 170,
                    flex: 1,
                    alignItems: 'center',
                    paddingTop: 15,
                    margin: 10,
                    // ios
                    backgroundColor: '#fffef9',
                    shadowOffset: {width: 0, height: 13}, 
                    shadowOpacity: 0.3,
                    shadowRadius: 6,

                    // android (Android +5.0)
                    elevation: 3,
                  }}>
                  <Avatar
                    size="large"
                    rounded
                    source={{uri: item._id.profileImage.url}}
                    containerStyle={{ marginBottom: 10, borderWidth: 2, borderColor: 'tomato' }}
                    onPress={() => console.log("Works!")}
                    activeOpacity={0.7}
                  />
                  <Text>{item._id.nickname}</Text>
                  <View style={styles.divider}/>
                  <Text>공통 키워드 {item.sizeOfBothKeywords}개</Text>
                  <View style={{flex: 1, flexDirection: 'row'}}>{keywords(item.bothKeywords)}</View>
                </TouchableOpacity>
            );
          }}
        />;
    const hasntKeyword = <Button onPress={() => this.navigate('setKeyword')} title="키워드를 먼저 설정하세요."></Button>;
    return (
      <SafeAreaView style={styles.container}>
        { this.state.friendlyUsers ? hasKeyword : hasntKeyword }
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  divider: { width: '85%', margin: 4, borderBottomColor: 'red', borderBottomWidth: 1 }
});

export default Address;
