import React, { Component } from 'react';
import { 
  TouchableOpacity, AsyncStorage, View, Text, TextInput, Button, Platform, StyleSheet, SafeAreaView
} from 'react-native';


class AuthScreen extends Component {
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



  render () {
    return (
      <SafeAreaView style={styles.container}>
        <ListItem
          onPress={() => this.navigate('letterPaper')}
          title="프로필"
        ></ListItem>
        <ListItem
          onPress={() => this.navigate('letterPaper')}
          title="내 통계"
        ></ListItem>
        <ListItem
          onPress={() => this.navigate('letterPaper')}
          title="주소록"
        ></ListItem>
        <ListItem
          onPress={() => this.navigate('letterPaper')}
          title="보낸 편지"
        ></ListItem>
        <ListItem
          onPress={() => this.navigate('letterPaper')}
          title="받은 편지"
        ></ListItem>
        <ListItem
          onPress={() => this.navigate('letterPaper')}
          title="문의하기"
        ></ListItem>
        <ListItem
          onPress={() => this.navigate('letterPaper')}
          title="트리글은 어떤 목표를 갖고있나요?"
        ></ListItem>
      </SafeAreaView>
    );
  }
}

class ListItem extends Component {
  render () {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Text>{this.props.title}</Text>
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
});

export default AuthScreen;
