import React, { Component } from 'react';
import { 
  FlatList, AsyncStorage, View, Text, Button, StyleSheet, SafeAreaView, TouchableOpacity, WebView
} from 'react-native';
import { Icon, SearchBar, Avatar } from 'react-native-elements';
import api from './../../api'

import SplitTwoBar from './../Component/SplitTwoBar';

class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      addresses: '',
      isLoading: true,
    };
  }

  static navigationOptions =  ({ navigation }) => {
    return {
      headerRight: (
        <TouchableOpacity
          onPress={navigation.getParam('add')}
        >
          <View style={{marginRight: 18 }}>
            <Text style={{ fontSize: 16, color: "rgb(31, 133, 250)" }}>추가</Text>
          </View>
        </TouchableOpacity>
        )
    }
  }

  _add = () => {
    this.props.navigation.navigate('newAddress', { userId: this.state.user.id, getAddresses: () => this.getAddresses() })
  }

  getAddresses = () => {
    api.getStorageUser(AsyncStorage)
      .then(user => {
        this.setState({ user });
        const query = `{
          addresses(userId: "${this.state.user.id}"){
            id
            receiverId {
              id
              nickname
              profileImage {
                url
              }
              address1
            }
            profileImage {
              url
            }
            receiverName
            address1
            numberOfSent
            numberOfReceived
          }
        }`;
        return api.get(query)
      })
      .then(r => {
        console.log(r.data.data.addresses)
        if (r.status === 200) this.setState({ isLoading: false, addresses: r.data.data.addresses });
        else throw r.data.data.errors
      })
      .catch(e => console.log(e))
  }

  componentWillMount() {
    this.props.navigation.setParams({ add: this._add });
    this.getAddresses();
  }
  
  componentDidAppear() {
    this.setState({ text: 'power' });
  }

  navigate = (to, params) => {
    switch(to) {
      case 'profileDetail':
        this.props.navigation.navigate('profileDetail', params);
        break;
    }
  }

  render () {
    if (!this.state.isLoading) {
      return (
        <SafeAreaView style={styles.container}>
          <FlatList
            style={{ flex:1, marginHorizontal: 10 }}
            data={this.state.addresses}
            keyExtractor={(item, index) => item.id}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  onPress={() => this.navigate('profileDetail', 
                    { userId: item.receiverId ? item.receiverId.id : null, addressId: item.id })}
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
                    source={{uri: item.receiverId ? item.receiverId.profileImage.url : item.profileImage.url}}
                    containerStyle={{ borderWidth: 2, borderColor: 'tomato' }}
                    onPress={() => console.log("Works!")}
                    activeOpacity={0.7}
                  />
                  <Text>{item.receiverId ? item.receiverId.nickname : item.receiverName}</Text>
                  <Text>지역: {item.address1 ? item.address1 
                      : (item.receiverId.addrss1 ? item.receiverId.addrss1 : "미입력") }</Text>
                  <View style={styles.divider}/>
                  <Text>주고 받은 횟수: {item.numberOfSent + item.numberOfReceived}</Text>
                </TouchableOpacity>
              );
            }}
            numColumns= {2}
          />
        </SafeAreaView>
      );
    }
    else {
      return <Text>로딩중</Text>
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  divider: { width: '85%', margin: 4, borderBottomColor: 'red', borderBottomWidth: 1 }
});

export default Address;
