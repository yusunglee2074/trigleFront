import React, { Component } from 'react';
import { 
  FlatList, AsyncStorage, View, Text, Button, StyleSheet, SafeAreaView, TouchableOpacity, WebView
} from 'react-native';
import { Icon, SearchBar, Avatar } from 'react-native-elements';

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

class SelectReceiver extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data,
    };
  }

  componentDidMount() {
    this.props.navigation.state.params.getData('sex');
  }
  
  componentDidAppear() {
    this.setState({ text: 'power' });
  }

  render () {
    return (
      <SafeAreaView style={styles.container}>
        <SearchBar
          round
          onChangeText={this._add}
          onClearText={this._add}
          placeholder='검색어' />
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
                  <Text>서울특별시</Text>
                  <View style={styles.divider}/>
                  <Text>주고받은 횟수 4</Text>
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

export default SelectReceiver;
