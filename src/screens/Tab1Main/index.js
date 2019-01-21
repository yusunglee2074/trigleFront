import React, { Component } from 'react';
import { 
  TouchableOpacity, FlatList, AsyncStorage, View, Text, TextInput, Button, Platform, StyleSheet, SafeAreaView
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
    };
  }

  static navigationOptions =  ({ navigation }) => {
    return {
      headerRight: (
        <View style={{ flexDirection: 'row', marginRight: 14 }}>
          <Icon
            name='plus-square-o'
            type='font-awesome'
            color='#f50'
            onPress={navigation.getParam('add')} />
        </View>
      )
    }
  }

  _add = () => {
    this.props.navigation.navigate('writeOnlineMail');
  }

  componentDidMount() {
    this.props.navigation.setParams({ add: this._add });
    const query = `{
      mails(isOffline: false) {
        id
        content
        senderId {
          id
          nickname
        }
        createdAt
      }
    }`;
    api.get(query)
      .then(r => {
        this.setState({ data: r.data.data.mails });
        console.log(r)
      })
  }
  
  componentDidAppear() {
    this.setState({ text: 'power' });
  }

  navigate = (to) => {
    switch(to) {
      case 'mailDetail':
        this.props.navigation.navigate('mailDetail');
        break;
    }
  }

  render () {
    return (
      <SafeAreaView style={styles.container}>
        <View>
        </View>
        <FlatList
          style={{ flex:1, marginHorizontal: 10 }}
          data={this.state.data}
          keyExtractor={(item, index) => String(index)}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={() => this.navigate('mailDetail')}
                style={{ 
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

                  // android (Android +5.0)
                  elevation: 3,
                }}>
                <Text>{item.content}</Text>
                <Text>{item.senderId.nickname}</Text>
                <Text>{moment(item.createdAt).fromNow()}</Text>
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
    flex: 1,
    backgroundColor: '#33373B',
  },
});

export default Tab1MainScreen;
