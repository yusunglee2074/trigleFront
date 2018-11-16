import React, { Component } from 'react';
import { 
  AsyncStorage, View, Text, Button, StyleSheet, SafeAreaView, TouchableOpacity, WebView
} from 'react-native';

import SplitTwoBar from './../Component/SplitTwoBar';

class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  static navigationOptions =  ({ navigation }) => {
    return {
      headerRight: (
        <TouchableOpacity 
          style={{ marginRight: 16 }} 
          onPress={navigation.getParam('add')}>
          <Text>추가</Text>
        </TouchableOpacity>
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

  render () {
    let tempList = [{name: '성유#12', address1: '경기도 수원시 우만동', address2: '세지로 420 301호'}, {name: '김철수', address1: '전라남도 목포시 용해동', address2: '동아아파트 301호'}]
    return (
      <SafeAreaView style={styles.container}>
        <SplitTwoBar left={<Text>{tempList[0].name}</Text>} right={<Text>{tempList[0].address1}</Text>}></SplitTwoBar>
        <SplitTwoBar left={<Text>{tempList[1].name}</Text>} right={<Text>{tempList[1].address1}</Text>}></SplitTwoBar>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Address;
