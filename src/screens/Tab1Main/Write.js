import React, { Component } from 'react';
import { 
  TouchableOpacity, FlatList, AsyncStorage, View, Text, TextInput, Button, Platform, StyleSheet, SafeAreaView
} from 'react-native';
import { Card, Icon } from 'react-native-elements';
import api from './../../api';


class WriteScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      contentText: '',
    };
  }

  static navigationOptions =  ({ navigation }) => {
    return {
      headerRight: (
        <TouchableOpacity
          onPress={navigation.getParam('add')}
        >
          <View style={{marginRight: 18 }}>
            <Text style={{ fontSize: 16, color: "rgb(31, 133, 250)" }}>게시</Text>
          </View>
        </TouchableOpacity>
      )
    }
  }

  _add = () => {
    let st = this.state;
    let query = `mutation {
      createMail(
        sender: "${st.user.nickname}",
        senderId: "${st.user.id}",
        content: "${st.contentText}",
        isOffline: false,
      ) {
        id
      }
    }`;
    api.post(query)
      .then(r => {
        if (!r.data.data.errors) {
          this.props.navigation.state.params.getOnlineMails();
          this.props.navigation.goBack(null);
        }
      })
      .catch(e => console.log(e));
  }

  componentDidMount() {
    api.getStorageUser(AsyncStorage)
      .then(user => {
        return api.getUser(user.id)
      })
      .then(r => {
        this.setState({user: r.data.data.user});
        return api.setStorageUser(AsyncStorage, r.data.data.user)
      })
      .catch(e => console.log('에러', e))
    this.props.navigation.setParams({ add: this._add });
  }
  
  navigate = (to) => {
    switch(to) {
      case 'mailDetail':
        this.props.navigation.goBack(null);
        break;
    }
  }

  render () {
    return (
      <SafeAreaView style={styles.container}>
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
      </SafeAreaView>
    );
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
});

export default WriteScreen;
