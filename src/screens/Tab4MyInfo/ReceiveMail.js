import React, { Component } from 'react';
import { 
  Alert, AppState, FlatList, AsyncStorage, View, Text, StyleSheet, SafeAreaView, TouchableOpacity, WebView
} from 'react-native';
import { Icon, SearchBar, Avatar, Button } from 'react-native-elements';
import api from './../../api';


class SendMail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mails: '',
      isLoading: true,
    };
  }


  _add = () => {
    alert('ㅇㅎ')
  }

  componentDidMount() {
    this.props.navigation.setParams({ add: this._add });
    const query = `{
      getOfflineMails(senderId: "${this.props.navigation.state.params.userId}") {
        id
        content
        senderId {
          id
          nickname
          profileImage {
            url
          }
        }
        receiverAddressId {
          id
          receiverName
          address1
          address2
          detailAddress
          profileImage {
            url
          }
        }
        receiverId {
          id
          nickname
          address1
          address2
          detailAddress
          profileImage {
            url
          }
        }
        willSendAt
      }
    }`
    api.get(query).then(r => {
      this.setState({ isLoading: false, mails: r.data.data.getOfflineMails })
    })
  }
  
  componentDidAppear() {
    this.setState({ text: 'power' });
  }

  render () {
    if (this.isLoading) {
      return (<Text>로딩중</Text>);
    } else {
      console.log(this.state)
      return (
        <SafeAreaView style={styles.container}>
          <FlatList
            style={{ flex:1, marginHorizontal: 10 }}
            data={this.state.mails}
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
                  <View style={{ flexDirection: 'row' }}>
                    <Avatar
                      size="large"
                      rounded
                      source={{uri: item.senderId.profileImage.url}}
                      containerStyle={{ marginBottom: 10, borderWidth: 2, borderColor: 'tomato' }}
                      onPress={() => console.log("Works!")}
                      activeOpacity={0.7}
                    />
                    <Icon name="cake" type="entypo" size={14}></Icon>
                    <Avatar
                      size="large"
                      rounded
                      source={{uri: item.receiverId
                        ? item.receiverId.profileImage.url
                        : item.receiverAddressId.profileImage.url
                      }}
                      containerStyle={{ marginBottom: 10, borderWidth: 2, borderColor: 'tomato' }}
                      onPress={() => console.log("Works!")}
                      activeOpacity={0.7}
                    />
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text>{item.senderId.nickname}</Text>
                    <Icon name="cake" type="entypo" size={14}></Icon>
                    <Text>{item.receiverId
                        ? item.receiverId.nickname
                        : item.receiverAddressId.receiverName
                    }</Text>
                </View>
                <View style={styles.divider}/>
                <Text>받는이 주소 {item.receiverId
                    ? item.receiverId.address1 + ' ' + item.receiverId.address1 + ' ' + item.receiverId.detailAddress
                    : item.receiverAddressId.address1 + ' ' + item.receiverAddressId.address1 + ' ' + item.receiverAddressId.detailAddress}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </SafeAreaView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SendMail;
