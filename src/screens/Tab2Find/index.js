import React, { Component } from 'react';
import { 
  AsyncStorage, View, Text, TextInput, Button, Platform, StyleSheet, SafeAreaView
} from 'react-native';


class AuthScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      age: null,
      sex: null,
      area: null,
      keyword: []
    };
  }

  componentDidMount() {
  }
  
  componentDidAppear() {
    this.setState({ text: 'power' });
  }




  render () {
    return (
      <SafeAreaView style={styles.container}>
        <Button title="나도 리스트에 공개"></Button>
        <Filter></Filter>
        <PeopleList></PeopleList>
      </SafeAreaView>
    );
  }
}

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }
  
  componentDidAppear() {
    this.setState({ text: 'power' });
  }

  render () {
    return (
      <View>
        <Button title="나이"></Button>
        <Button title="성별"></Button>
        <Button title="지역"></Button>
      </View>
    );
  }
}

class PeopleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }
  
  componentDidAppear() {
    this.setState({ text: 'power' });
  }

  render () {
    return (
      <View>
        <Text>닉네임</Text>
        <Text>답장률</Text>
        <Text>나이</Text>
        <Text>키워드</Text>
        <Text>지역</Text>
      </View>
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

export default AuthScreen;
