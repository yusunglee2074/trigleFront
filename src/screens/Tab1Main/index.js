import React, { Component } from 'react';
import { 
  TouchableOpacity, FlatList, RefreshControl, AsyncStorage, View, Text, TextInput, Button, Platform, StyleSheet, SafeAreaView
} from 'react-native';
import { Card, Icon } from 'react-native-elements';
import api from './../../api';
import moment from 'moment';
moment.locale('ko')

class Tab1MainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      refreshing: false,
    };
  }

  static navigationOptions =  (navigation) => {
    return {
      title: '트리글',
      headerRight: (
        <View style={{ flexDirection: 'row', marginRight: 14 }}>
          <Icon
            name='plus-square-o'
            type='font-awesome'
            color={api.color.sd}
            onPress={navigation.navigation.getParam('add')} />
        </View>
      )
    }
  }

  _add = () => {
    this.props.navigation.navigate('writeOnlineMail', { getOnlineMails: () => this.getOnlineMails() });
  }

  getOnlineMails = () => {
    const query = `{
      getOnlineMails {
        id
        content
        senderId {
          id
          nickname
        }
        createdAt
        likes {
          userId {
            nickname
          }
        }
      }
    }`;
    api.get(query)
      .then(r => {
        this.setState({ refreshing: false, data: r.data.data.getOnlineMails });
      })
  }

  componentDidMount() {
    this.props.navigation.setParams({ add: this._add });
    this.getOnlineMails();
  }
  
  componentDidAppear() {
    this.setState({ text: 'power' });
  }

  navigate = (to, params) => {
    switch(to) {
      case 'mailDetail':
        this.props.navigation.navigate('mailDetail', params);
        break;
    }
  }

  doRefresh = () => {
    this.getOnlineMails();
  }

  render () {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          style={{ flex:1, marginHorizontal: 10 }}
          data={this.state.data}
          keyExtractor={(item, index) => String(index)}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.doRefresh}
            />
          }
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={() => this.navigate('mailDetail', { mailId: item.id })}
                style={{ 
                  borderWidth: 2,
                  borderRadius: 2,
                  borderColor: '#969696',
                  height: 180,
                  flex: 1,
                  padding: 10,
                  paddingTop: 0,
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
                }}>
                <View style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 10, flexDirection: 'row', flex:1, minHeight: 20,  }}>
                  <Icon
                    containerStyle={{ marginTop: 2 }}
                    onPress={() => this.commentSave()}
                    size={13}
                    type='font-awesome'
                    color={api.color.sl}
                    name='heart' />
                  <Text> {item.likes.length}</Text>
                </View>
                <View style={styles.content}>
                  <Text>{item.content.length < 40 ? item.content : item.content.slice(0, 40) + ' ...'}</Text>
                </View>
                <View style={styles.bottom}>
                  <Text>from. <Text style={{ fontWeight: "bold", fontSize: 15 }}>{item.senderId.nickname}</Text></Text>
                  <Text style={{ fontWeight: "100", fontSize: 11 }}>{moment(item.createdAt).fromNow()}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
          numColumns= {2}
        />
      </SafeAreaView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
  bottom: {
  }
});

export default Tab1MainScreen;
