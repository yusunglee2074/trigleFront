import React, { Component } from 'react';
import { 
  ScrollView, AsyncStorage, View, Text, Button, StyleSheet, SafeAreaView, TouchableOpacity, WebView
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Avatar, Divider, Input, Icon } from 'react-native-elements';
import api from './../api';
import moment from 'moment';

class MailDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mail: '',
      isLoading: true,
      comment: '',
      liked: false,
      user: '',
    };
  }

  componentDidMount() {
    api.getStorageUser(AsyncStorage).then(user => this.setState({ user }));
    this.getComments();
  }

  componentDidAppear() {
  }

  navigate = (to, params) => {
    switch(to) {
      case 'profileDetail':
        this.props.navigation.navigate('profileDetail', params);
        break;
    }
  }

  commentSave = () => {
    const query = `mutation {
      createComment(
        userId: "${this.state.user.id}",
        content: "${this.state.comment}",
        mailId: "${this.props.navigation.state.params.mailId}",
      ) {
        id
        content
        userId {
          id
          profileImage {
            id
            url
          }
        }
      }
    }`
    api.post(query).then(r => {
      if (r.data.data.errors) throw Error("코멘트 생성 실패");
      this.setState({ isLoading: true, comment: '' });
      this.getComments();
    })
      .catch(e => console.log(e))
  }

  getComments = () => {
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
        comments {
          id
          content
          userId {
            nickname
            id
          }
          createdAt
        }
        likes {
          userId {
            id
            nickname
            profileImage {
              url
            }
          }
        }
      }
    }`
    api.get(query).then(r => {
      let likes = r.data.data.mail.likes;
      let liked = false;
      for (let i = 0; i < likes.length; i++) {
        let like = likes[i];
        if (like.userId.id === this.state.user.id) {
          liked = true;
          break;
        }
      }
      this.setState({ liked, mail: r.data.data.mail, isLoading: false });
    })
  }

  likeTogle = () => {
    const query = `mutation {
      togleLike (
        userId: "${this.state.user.id}",
        mailId: "${this.state.mail.id}"
      )
    }`;
    api.post(query).then(r => {
      if (r.data.data.errors) throw Error('라이크 토글 오류');
      this.setState({ liked: r.data.data.togleLike });
      this.getComments();
    })
      .catch(e => console.log(e))

  }

  render () {
    if (this.state.isLoading) return (<Text>로딩중</Text>)
    else { 
      return (
        <SafeAreaView style={styles.container}>
          <Divider style={{ marginRight: 20, marginLeft: 20, marginTop: 30, backgroundColor: 'grey' }} />
          <View style={styles.content}>
              <ScrollView>
                <Text style={styles.receiver}>
                  To. {this.state.mail.isOffline
                      ? this.state.mail.receiverAddressId.receiverId.nickname
                      : "트리글"
                  }
                </Text>
                <View style={styles.text}>
                  <Text style={styles.text}>{this.state.mail.content}</Text>
                </View>
                <TouchableOpacity 
                  onPress={() => this.navigate('profileDetail', { userId: this.state.mail.senderId.id })}
                  style={styles.sender}>
                  <Text style={styles.senderName}>From. {this.state.mail.senderId.nickname}</Text>
                  <Text style={styles.date}>{moment(this.state.mail.createdAt).fromNow()}</Text>
                </TouchableOpacity>
              </ScrollView>
                <Divider style={{ marginTop: 30, backgroundColor: 'grey' }} />
              <ScrollView
                style={{ marginTop: 20 }}
              >
                {
                  this.state.mail.comments.map((item, i) => { 
                    return (
                      <View 
                        style={{ flexDirection: 'row', marginBottom: 6 }}
                        key={i}>
                        <TouchableOpacity
                          style={{ flex: 3 }}
                          onPress={() => {this.navigate(`profileDetail`, { userId: item.userId.id})}}
                        >
                          <Text style={{ fontWeight: 'bold' }}>{item.userId.nickname}</Text>
                        </TouchableOpacity>
                        <View
                          style={{ flex: 8 }}
                        >
                          <Text style={{ fontWeight: '200' }}>{item.content}</Text>
                        </View>
                        <View
                          style={{ flex: 3 }}
                        >
                          <Text style={{ fontWeight: '100' }}>{moment(item.createdAt).fromNow()}</Text>
                        </View>
                      </View>
                    );
                  })
                }

              </ScrollView>
              <View style={{ flexDirection: 'row' }}>
                <View
                  style={{ flex:6 }}
                >
                  <Input
                    placeholder='댓글'
                    onChangeText={(comment) => this.setState({ comment})}
                    value={this.state.comment}
                  ></Input>
                </View>
                <Icon
                  containerStyle={{ marginTop: 10, flex: 1 }}
                  onPress={() => this.commentSave()}
                  type='simple-line-icon'
                  name='speech' />
                { this.state.liked 
                    ? (<Icon
                      containerStyle={{ marginTop: 10, flex: 1 }}
                      onPress={() => this.likeTogle()}
                      type='font-awesome'
                      color='pink'
                      name='heart' />)
                    : (<Icon
                      containerStyle={{ marginTop: 10, flex: 1 }}
                      onPress={() => this.likeTogle()}
                      type='simple-line-icon'
                      name='heart' />)
                }
              </View>
          </View>
        </SafeAreaView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#969696',
    height: 180,
    flex: 1,
    padding: 10,
    margin: 10,
    // ios
    backgroundColor: '#fffef9',
    shadowOffset: {width: 0, height: 13}, 
    shadowOpacity: 0.3,
    shadowRadius: 6,
    display: 'flex',
    flexDirection: 'column',

    // android (Android +5.0)
    elevation: 3,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    margin: 25,
    flex: 1,
  },
  receiver: {
    fontSize: 17,
    marginBottom: 30
  },
  dear: {
    fontSize: 14
  },
  text: {
    fontWeight: "100",
    flexGrow: 1,
    fontSize: 15,
    lineHeight: 25,
  },
  sender: {
    marginTop: 60,
    padding: 3,
  },
  senderName: {
    fontSize: 14,
    fontWeight: "200",
  },
  date: {
    marginTop: 12,
    fontSize: 12,
    fontWeight: "100",
  },
});

export default MailDetail;
