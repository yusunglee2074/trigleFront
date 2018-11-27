import React, { Component } from 'react';
import { 
  FlatList, AsyncStorage, View, Text, Button, StyleSheet, SafeAreaView, TouchableOpacity, WebView
} from 'react-native';
import { Icon, SearchBar, Avatar } from 'react-native-elements';

import SplitTwoBar from './../Component/SplitTwoBar';

const data = [
  {
    id: 1,
    nickname: '하늘이#13',
    profilePicUrl: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    commonTopic: 3,
  },
  {
    id: 2,
    nickname: '하늘이#13',
    profilePicUrl: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    commonTopic: 3,
  },
  {
    id: 3,
    nickname: '하늘이#13',
    profilePicUrl: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    commonTopic: 3,
  },
  {
    id: 4,
    nickname: '하늘이#13',
    profilePicUrl: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    commonTopic: 3,
  },
  {
    id: 5,
    nickname: '하늘이#13',
    profilePicUrl: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    commonTopic: 3,
  },
];

class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data
    };
  }

  static navigationOptions =  ({ navigation }) => {
    return {
      headerRight: (
        <Icon
          name='plus'
          type='simple-line-icon'
          color='#000000'
          onPress={navigation.getParam('add')} />
        )
    }
  }

  _add = () => {
    alert('ㅇㅎ')
  }

  componentDidMount() {
    this.props.navigation.setParams({ add: this._add });
  }
  
  componentDidAppear() {
    this.setState({ text: 'power' });
  }

  navigate = (to) => {
    switch(to) {
      case 'profileDetail':
        this.props.navigation.navigate('profileDetail');
        break;
    }
  }

  render () {
    let tempList = [{name: '성유#12', address1: '경기도 수원시 우만동', address2: '세지로 420 301호'}, {name: '김철수', address1: '전라남도 목포시 용해동', address2: '동아아파트 301호'}]
    return (
      <SafeAreaView style={styles.container}>
        <SearchBar
          lightTheme
          round
          onChangeText={this._add}
          onClearText={this._add}
          placeholder='Type Here...' />
        <FlatList
          style={{ flex:1, marginHorizontal: 10 }}
          data={this.state.data}
          keyExtractor={(item, index) => item.id}
          renderItem={({ item, index }) => {
            return (
                <TouchableOpacity
                  onPress={() => this.navigate('profileDetail')}
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
                    source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg"}}
                    containerStyle={{ borderWidth: 2, borderColor: 'tomato' }}
                    onPress={() => console.log("Works!")}
                    activeOpacity={0.7}
                  />
                  <Text>{item.nickname}</Text>
                  <Text>#주부, #짜장면, #오버워치</Text>
                  <View style={styles.divider}/>
                  <Text>공통 키워드 4</Text>
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
  divider: { width: '85%', margin: 4, borderBottomColor: 'red', borderBottomWidth: 1 }
});

export default Address;
