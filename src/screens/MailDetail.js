import React, { Component } from 'react';
import { 
  ScrollView, AsyncStorage, View, Text, Button, StyleSheet, SafeAreaView, TouchableOpacity, WebView
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Avatar } from 'react-native-elements';
import api from './../api';
import moment from 'moment';

class MailDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mail: '',
      isLoading: true,
    };
  }

  componentDidMount() {
    let mailId = this.props.navigation.state.params.mailId;
    const query = `{
      mail(id: "${mailId}") {
        id
        content
        createdAt
        isOffline
        senderId {
          id
          nickname
          profileImage {
            url
          }
        }
        receiverAddressId {
          id
          receiverId {
            id
            nickname
          }
        }
      }
    }`
    api.get(query).then(r => {
      this.setState({ mail: r.data.data.mail, isLoading: false });
    })
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
    if (this.state.isLoading) return (<Text>로딩중</Text>)
    else { 
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.content}>
            <View style={{ maxHeight: "74%"}}>
              <ScrollView>
                <Text style={styles.receiver}>
                  To. {this.state.mail.isOffline
                      ? this.state.mail.receiverAddressId.receiverId.nickname
                      : "누군가"
                  }
                </Text>
                <Text style={styles.text}>{this.state.mail.content}</Text>
              </ScrollView>
            </View>
            <TouchableOpacity 
              onPress={() => this.navigate('profileDetail', { userId: this.state.mail.senderId.id })}
              style={styles.sender}>
              <Avatar
                size='medium'
                source={{uri: this.state.mail.senderId.profileImage.url }}
                activeOpacity={0.7}
              />
              <View style={{ flex: 0.9, marginLeft: 10 }}>
                <Text style={styles.senderName}>{this.state.mail.senderId.nickname}</Text>
                <Text style={styles.date}>{moment(this.state.mail.createdAt).fromNow()}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    margin: 25,
    flex: 1,
  },
  receiver: {
    fontSize: 17,
    backgroundColor: 'red',
    marginBottom: 20
  },
  dear: {
    fontSize: 14
  },
  text: {
    fontSize: 15,
    lineHeight: 25,
    marginBottom: 30,
  },
  sender: {
    marginTop: 40,
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#969696',
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    margin: 10,
    // ios
    backgroundColor: '#fffef9',
    shadowOffset: {width: 0, height: 13}, 
    shadowOpacity: 0.3,
    shadowRadius: 6,

    // android (Android +5.0)
    elevation: 3,
    
  }
});

export default MailDetail;
