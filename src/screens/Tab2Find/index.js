import React, { Component } from 'react';
import { 
  FlatList, AsyncStorage, View, Text, Button, StyleSheet, SafeAreaView, TouchableOpacity, WebView
} from 'react-native';
import { Icon, SearchBar, Avatar } from 'react-native-elements';

import api from './../../api';
import SplitTwoBar from './../Component/SplitTwoBar';


class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    console.log(api.getUser())
  }
  
  componentDidAppear() {
  }

  navigate = (to) => {
    switch(to) {
      case 'profileDetail':
        this.props.navigation.navigate('profileDetail');
        break;
    }
  }

  render () {
    return (
      <SafeAreaView style={styles.container}>
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
