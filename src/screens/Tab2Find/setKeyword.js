import React, { Component } from 'react';
import { 
  TextInput, Alert, ScrollView, FlatList, AsyncStorage, View, Text, StyleSheet, SafeAreaView, TouchableOpacity, WebView
} from 'react-native';
import { Input, Icon, SearchBar, Avatar, Button } from 'react-native-elements';
import axios from 'axios';
axios.defaults.headers.get['Authorization'] = 'KakaoAK cc62ead48c2202c3e98c5d994d4bc7dd'

import api from './../../api';

class SetKeyword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultKeywords: [],
      checkedKeywords: {},
      nickname: '',
      searchWord: '',
      searchAddresses: '',
      nickname: '',
      address1: '',
      address2: '',
      detailAddress: '',
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
    let st = this.state;
    if (!st.nickname || !st.address1 || !st.address2 || !st.detailAddress) {
      return Alert.alert("빈칸 오류", "주소와 닉네임을 모두 채워주세요");
    };
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
        return api.updateUser({ 
          id: this.state.user.id, 
          nickname: this.state.nickname,
          address1: this.state.address1,
          address2: this.state.address2,
          detailAddress: this.state.detailAddress,
        })
      })
      .then(r => {
        this.props.navigation.state.params.setKeywords(keywords);
        this.props.navigation.goBack(null)
      })
      .catch(e => {
        console.log(e)
      });
  }

  searchAddress = () => {
    axios.get(`https://dapi.kakao.com/v2/local/search/address.json?query=${this.state.searchWord}`)
      .then(r => {
        let searchAddress = r.data.documents
        searchAddress.length ? null : searchAddress = '검색결과가 없습니다.';
        this.setState({ searchAddress: searchAddress })
        console.log(this.state)
      })
      .catch(e => console.log(e))
  }

  getAddress = (address) => {
    if (!address.address || !address.road_address) {
      return Alert.alert("주소를 끝까지 입력해주세요.", 
        "우만동(X) 우만동 503(O),\n세지로 200길(X) 세지로 200길 42(O)");
    }
    this.setState({ 
      address1: address.road_address.region_1depth_name + ' ' + address.road_address.region_2depth_name, 
      address2: address.road_address.road_name + ' ' 
      + address.road_address.main_building_no
      + (address.road_address.sub_building_no ? '-' + address.road_address.sub_building_no : ''),
    });
  }

  render () {
    let addressList;
    if (typeof this.state.searchAddress === 'object') {
      addressList = [];
      for (let i = 0; i < this.state.searchAddress.length; i++) {
        addressList.push((
          <TouchableOpacity
            key={i}
            onPress={() => this.getAddress(this.state.searchAddress[i])}
          >
            <Text style={styles.addressList}>{this.state.searchAddress[i].address_name}</Text>
          </TouchableOpacity>
        ));
      }
    }
    else {
      addressList = <Text>{this.state.searchAddress}</Text>
    }
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <FlatList
            data = {this.state.defaultKeywords}
            columnWrapperStyle={{flexGrow: 1, justifyContent: 'center'}}
            keyExtractor={(item, index) => index}
            numColumns={4}
            renderItem={({ item, index }) => (
              <Button
                key={index}
                title={item.keyword.replace('#', '# ')}
                titleStyle={{ color: 'black', fontWeight: '100', fontSize: 15 }}
                onPress={() => this.clickKeywords(item, index)}
                buttonStyle={{
                  elevation: 0,
                  height: 40,
                  backgroundColor: item.checked ? "red" : "transparent",
                  borderColor: api.color.s,
                  borderWidth: 2,
                  borderRadius: 5
                }}
                containerStyle={{ marginTop: 10, marginRight: 5 }}
              />
            )}
          />
          <View style={styles.address}>
            <Text sytle={{ color: api.color.p, fontWeight: "300" }}>주소는 다른이에게 공개되지 않습니다.</Text>
            <Input
              placeholder='도로명, 지번 주소'
              onChangeText={(searchWord) => this.setState({ searchWord })}
              leftIcon={
                <Icon
                  name='map'
                  type='simple-line-icon'
                  size={23}
                  color={api.color.sd}
                />
              }
            />
            <Button
              buttonStyle={{ marginTop: 3, elevation: 0, backgroundColor: api.color.s }} 
              title="주소검색" 
              onPress={() => this.searchAddress()}></Button>
            { addressList }
            <Input
              placeholder='닉네임'
              onChangeText={(nickname) => this.setState({ nickname })}
              value={this.state.nickname}
              leftIcon={
                <Icon
                  name='people'
                  type='simple-line-icon'
                  size={23}
                  color={api.color.sd}
                />
              }
            />
            <Input
              placeholder='주소1'
              onChangeText={(address1) => this.setState({ address1 })}
              value={this.state.address1}
              leftIcon={
                <Icon
                  name='direction'
                  type='simple-line-icon'
                  size={23}
                  color={api.color.sd}
                />
              }
            />
            <Input
              placeholder='주소2'
              onChangeText={(address2) => this.setState({ address2 })}
              value={this.state.address2}
              leftIcon={
                <Icon
                  name='direction'
                  type='simple-line-icon'
                  size={23}
                  color={api.color.sd}
                />
              }
            />
            <Input
              placeholder='상세주소'
              onChangeText={(detailAddress) => this.setState({ detailAddress })}
              value={this.state.detailAddress}
              leftIcon={
                <Icon
                  name='directions'
                  type='simple-line-icon'
                  size={23}
                  color={api.color.sd}
                />
              }
            />
            <Button 
              buttonStyle={{ marginTop: 3, elevation: 0, backgroundColor: api.color.s }} 
              title="저장" 
              onPress={() => {this.saveKeyword()}}></Button>
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
  address: {
    padding: 20,
  },
  addressList: {
    fontSize: 14,
    padding: 5,
    margin: 5,
    borderWidth: 1,
    borderColor: api.color.sd
  },
  divider: { width: '85%', margin: 4, borderBottomColor: 'red', borderBottomWidth: 1 }
});

export default SetKeyword;
