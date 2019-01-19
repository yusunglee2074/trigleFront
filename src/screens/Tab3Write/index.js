import React, { Component } from 'react';
import { 
  AsyncStorage, View, Text, TextInput, StyleSheet, SafeAreaView, TouchableOpacity
} from 'react-native';
import { Icon, Divider, Button } from 'react-native-elements';
import api from './../../api';

class Tab3Write extends Component {
  constructor(props) {
    super(props);
    this.state = {
      child: '',
      user: '',
      senderName: '',
      receiver: [],
      contentText: '',
      files: [],
    };
  }

  static navigationOptions =  ({ navigation }) => {
    return {
      headerRight: (
        <View style={{ flexDirection: 'row' }}>
          <Icon
            name='send-o'
            type='font-awesome'
            color='#f50'
            onPress={navigation.getParam('post')} />
          <Icon
            name='paperclip'
            type='font-awesome'
            color='#f50'
            onPress={navigation.getParam('add')} />
        </View>
        )
    }
  }

  _add = () => {
    alert('ㅇㅎ')
  }

  _post = () => {
    alert('보낸다 정말')
  }

  setReceiver = async () => {
    let receiver = await api.getReceiver(AsyncStorage)
    if (receiver.updatedAt === "미가입유저") {
      let tempReceiver = this.state.receiver;
      tempReceiver.push(receiver);
      this.setState({ receiver: tempReceiver });
    }
    else if (receiver.nickname) {
      let tempReceiver = this.state.receiver;
      tempReceiver.push(receiver);
      this.setState({ receiver: tempReceiver });
    }
    api.setReceiver(AsyncStorage, [])
  }

  componentWillMount() {
    api.setReceiver(AsyncStorage, [])
      .then(r => {
        this.setState({ receiver: [] });
      })
      .catch(e => console.log(e));
    const didBlurSubscription = this.props.navigation.addListener(
      'didFocus',
      payload => {
        this.setReceiver();
      }
    );
    this.props.navigation.setParams({ add: this._add });
    this.props.navigation.setParams({ post: this._post });
    api.getStorageUser(AsyncStorage)
      .then(user => {
        return api.getUser(user.id,)
      })
      .then(r => {
        let user = r.data.data.user;
        this.setState({ user, senderName: user.nickname })
      })
      .catch(e => console.log(e));
  }
  
  componentDidAppear() {
    this.setState({ text: 'power' });
  }

  addReceiver = () => {
    this.props.navigation.navigate('selectReceiver');
  }

  navigate = (to) => {
    switch(to) {
      case 'letterPaper':
        this.props.navigation.navigate('selectPaper');
        break;
      case 'write':
        this.props.navigation.navigate('write');
        break;
      case 'receiver':
        this.props.navigation.navigate('selectReceiver');
        break;
      case 'envelope':
        this.props.navigation.navigate('selectEnvelope');
        break;
      case 'media':
        this.props.navigation.navigate('selectMedia');
        break;
    }
  }

  deleteReceiver = (index) => {
    let tempReceiver = Object.assign([], this.state.receiver);
    tempReceiver.splice(index, 1)
    this.setState({ receiver: tempReceiver });
  }

  render () {
    let receivers = [];
    for (let i = 0; i < this.state.receiver.length; i++) {
      receivers.push((
            <Button 
              key={i}
              onPress={() => this.deleteReceiver(i)}
              titleStyle={{ fontSize: 14 }}
              style={styles.buttonInput}
              title={this.state.receiver[i].nickname.length > 4
                  ? (this.state.receiver[i].nickname.slice(0, 4) + '...')
              : this.state.receiver[i].nickname}></Button>
      ));
    }
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <View 
            style={styles.inputForm}>
            <Text
              style={styles.label}
            >보낸이</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(senderName) => this.setState({ senderName })}
              value={this.state.senderName}
              placeholder="보낸사람"
            ></TextInput>
          </View>
          <View style={styles.divider}/>
          <TouchableOpacity 
            style={styles.inputForm}
            onPress={this.addReceiver}
          >
            <Text
              style={styles.label}
            >받는이</Text>
            <View style={{ marginLeft: 4, flex: 0.83, flexDirection: 'row' }}>
              { receivers }
            </View>
          </TouchableOpacity>
          <View style={styles.divider}/>
        </View>
        <View style={{ flex: 1}}>
          <View style={{ flex: 1, justifyContent: 'flex-start', marginLeft: 10, marginTop:10 }}>
            <TextInput
              style={{ fontSize: 16 }}
              value={this.state.contentText}
              onChangeText={contentText =>this.setState({ contentText })}
              multiline={true}
              underlineColorAndroid='transparent'
              placeholder='내용 작성'
            />
          </View>
        </View>

        { /*
        <ListItem
          onPress={() => this.navigate('letterPaper')}
          title="편지지"
          content="기본편지지"
        ></ListItem>
        <ListItem
          onPress={() => this.navigate('write')}
          title="내용"
          content=""
        ></ListItem>
        <ListItem
          onPress={() => this.navigate('receiver')}
          title="받는이"
          content=""
        ></ListItem>
        <ListItem
          onPress={() => this.navigate('envelope')}
          title="편지봉투"
          content="기본 편지봉투"
        ></ListItem>
        <ListItem
          onPress={() => this.navigate('media')}
          title="(옵션) 사진, 영상추가"
          content="추가안함"
        ></ListItem>
        <View>
          <Text style={styles.price}>우편소모 3장</Text>
          <Button title="보내기" onPress={this.postMail}></Button>
        </View>
        */ }

      </SafeAreaView>
    );
  }
}

class ListItem extends Component {
  render () {
    return (
      <TouchableOpacity style={this.props.content ? styles.item : styles.emptyItem} onPress={this.props.onPress}>
        <Text>{this.props.title}</Text>
        <Text>{this.props.content.length > 15 ? this.props.content.slice(0, 15) + "..." : this.props.content}</Text>
      </TouchableOpacity>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: '#33373B',
  },
  item: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#d3c208',
    padding: 10,
    borderStyle: 'solid',
    marginBottom: 10,
    backgroundColor: '#bdf280'
  },
  emptyItem: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#d3c208',
    padding: 10,
    borderStyle: 'solid',
    marginBottom: 10,
    backgroundColor: '#f47a42'
  },
  inputForm: { height: 50, flexDirection: 'row', alignItems:'center', paddingLeft: 10},
  label: {
    flex: 0.17,
    fontSize: 16
  },
  textInput: {
    flex: 0.83,
    fontSize: 16
  },
  buttonInput: {
    marginRight: 4,
    height: 30,
    fontSize: 8,
    width: 74,
  },
  divider: { borderBottomColor: '#cccccc', borderBottomWidth: 1 }
});

export default Tab3Write;
