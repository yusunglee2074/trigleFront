import React, { Component } from 'react';
import { 
  Alert, AsyncStorage, View, Text, StyleSheet, SafeAreaView, TouchableOpacity
} from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import api from './../../api';
import axios from 'axios';
axios.defaults.headers.get['Authorization'] = 'KakaoAK cc62ead48c2202c3e98c5d994d4bc7dd'

class AboutTrigle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      searchWord: '',
      searchAddresses: '',
      nickname: '',
      address1: '',
      address2: '',
      detailAddress: '',
      phone: '',
    };
  }

  componentWillMount() {
    api.getStorageUser(AsyncStorage)
      .then(user => {
        this.setState({ user });
      })
      .catch(e => console.log(e));
  }
  
  componentDidAppear() {
    this.setState({ text: 'power' });
  }

  searchAddress = () => {
    axios.get(`https://dapi.kakao.com/v2/local/search/address.json?query=${this.state.searchWord}`)
      .then(r => {
        let searchAddress = r.data.documents
        searchAddress.length ? null : searchAddress = '검색결과가 없습니다.';
        this.setState({ searchAddress: searchAddress })
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

  saveAddress = () => {
    let st = this.state;
    if (!st.nickname || !st.address1 || !st.address2 || !st.detailAddress) {
      return Alert.alert("빈칸 오류", "주소와 닉네임을 모두 채워주세요");
    };
    const query = `mutation {
      createAddress(
        userId: "${this.state.user.id}",
        receiverName: "${this.state.nickname}",
        address1: "${this.state.address1}",
        address2: "${this.state.address2}",
        detailAddress: "${this.state.detailAddress}",
        numberOfSent: 0,
        numberOfReceived: 0,
        profileImage: "5c38332a7e74266b562ccc1b"
      ) {
        userId {
          id
          nickname
          email
        }
        receiverName
        address1
      }
    }`;
    api.post(query)
      .then(r => {
        if (r.status === 200) {
          this.props.navigation.state.params.getAddresses();
          this.props.navigation.goBack(null);
        }
      })
      .catch(e => console.log(e));
  }

  requestSMS = () => {
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
            <Text>{this.state.searchAddress[i].address_name}</Text>
          </TouchableOpacity>
        ));
      }
    }
    else {
      addressList = <Text>{this.state.searchAddress}</Text>
    }
    return (
      <SafeAreaView style={styles.container}>
      <Input
        placeholder='주소명'
        onChangeText={(searchWord) => this.setState({ searchWord })}
        leftIcon={
          <Icon
            name='user'
            size={24}
            color='black'
          />
        }
      />
        <Button title="주소검색" onPress={() => this.searchAddress()}></Button>
        { addressList }
        <Input
          placeholder='이름'
          onChangeText={(nickname) => this.setState({ nickname })}
          value={this.state.nickname}
          leftIcon={
            <Icon
              name='user'
              size={24}
              color='black'
            />
          }
        />
        <Input
          placeholder='주소1'
          onChangeText={(address1) => this.setState({ address1 })}
          value={this.state.address1}
          leftIcon={
            <Icon
              name='user'
              size={24}
              color='black'
            />
          }
        />
        <Input
          placeholder='주소2'
          onChangeText={(address2) => this.setState({ address2 })}
          value={this.state.address2}
          leftIcon={
            <Icon
              name='user'
              size={24}
              color='black'
            />
          }
        />
        <Input
          placeholder='상세주소'
          onChangeText={(detailAddress) => this.setState({ detailAddress })}
          value={this.state.detailAddress}
          leftIcon={
            <Icon
              name='user'
              size={24}
              color='black'
            />
          }
        />
        <Button title="저장" onPress={() => this.saveAddress()}></Button>
        <Text>휴대폰번호로 상대방에게 주소를 요청할 수 있습니다.</Text>
        <Text>상대방이 웹사이트에 접속 후 주소를 입력할 시 완료됩니다.</Text>
        <Input
          onChangeText={(phone) => this.setState({ phone })}
          value={this.state.phone}
          placeholder='휴대폰번호'
          leftIcon={
            <Icon
              name='user'
              size={24}
              color='black'
            />
          }
        />
        <Button title="요청" onPress={() => this.requestSMS()}></Button>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AboutTrigle;
