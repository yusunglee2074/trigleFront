import React, { Component } from 'react';
import { 
  TextInput, Alert, ScrollView, FlatList, AsyncStorage, View, Text, StyleSheet, SafeAreaView, TouchableOpacity, WebView
} from 'react-native';
import { Input, Icon, SearchBar, Avatar, Button } from 'react-native-elements';

import api from './../../api';

class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultKeywords: [],
      checkedKeywords: {},
      nickname: '',
      user: {},
    };
  }

  componentDidMount() {
    const query = `
    {
      keywords(isDefaultKeyword: true) {
        id
        keyword
      }
    }
    `
    api.get(query)
      .then(r => {
        const keywords = Object.assign([], r.data.data.keywords);
        this.setState({ defaultKeywords: keywords });
      })
      .catch(e => console.log(e))
  }

  clickKeywords = (item, index) => {
    let defaultKeywords = Object.assign([], this.state.defaultKeywords);
    defaultKeywords[index]['checked'] = defaultKeywords[index]['checked'] ? false : true;
    let checkedKeywords = Object.assign({}, this.state.checkedKeywords);
    checkedKeywords[index] = checkedKeywords[index] ? null : { keyword: item.keyword, id: item.id };
    this.setState({ defaultKeywords: defaultKeywords, checkedKeywords })
  }

  saveKeyword = async () => {
    if (!this.state.nickname) return Alert.alert("오류", '본인의 닉네임을 입력해주세요.');
    let keywords = this.state.checkedKeywords;
    api.getStorageUser(AsyncStorage)
      .then(user => {
        this.setState({ user });
        let keywordCounter = 0;
        let promiseList = [];
        for (let key in keywords) {
          if (!keywords[key]) continue;
          keywordCounter++;
          let query = `
            mutation {
              createUserKeyword(
                userId: "${user.id}",
                keywordId: "${keywords[key].id}"
              ) {
                userId {
                  email
                }
                keywordId {
                  keyword
                }
              }
            }
            `
          promiseList.push(api.post(query));
        }
        if (!keywordCounter) {
          Alert.alert("오류", "하나 이상의 키워드를 체크해주세요.");
          throw "emptyKeywords";
        }
        return Promise.all(promiseList);
      })
      .then(r => {
        return api.updateUser({ id: this.state.user.id, nickname: this.state.nickname })
      })
      .then(r => {
        this.props.navigation.state.params.setKeywords(keywords);
        this.props.navigation.goBack(null)
      })
      .catch(e => {
        console.log(e)
      });
  }

  render () {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <FlatList
            data = {this.state.defaultKeywords}
            keyExtractor={(item, index) => index}
            numColumns={4}
            renderItem={({ item, index }) => (
              <Button
                key={index}
                title={item.keyword}
                titleStyle={{ color: 'black', fontWeight: 'normal', fontSize: 13 }}
                onPress={() => this.clickKeywords(item, index)}
                buttonStyle={{
                  height: 40,
                  backgroundColor: item.checked ? "red" : "transparent",
                  borderColor: "rgba(92, 99,216, 1)",
                  alignSelf: 'flex-start',
                  borderWidth: 2,
                  borderRadius: 5
                }}
                containerStyle={{ marginTop: 10, marginRight: 5 }}
              />
            )}
          />
        </ScrollView>
        <Input
          placeholder='닉네임'
          onChangeText={(nickname) => this.setState({ nickname })}
          leftIcon={
            <Icon
              name='tag'
              type="evilicon"
              size={24}
              color='black'
            />
          }
        />
        <Button title="저장" onPress={() => {this.saveKeyword()}}></Button>
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
