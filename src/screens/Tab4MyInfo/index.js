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
      case 'profile':
        this.props.navigation.navigate('profile');
        break;
      case 'statistics':
        this.props.navigation.navigate('statistics');
        break;
      case 'address':
        this.props.navigation.navigate('address');
        break;
      case 'sendMail':
        this.props.navigation.navigate('sendMail');
        break;
      case 'receiveMail':
        this.props.navigation.navigate('receiveMail');
        break;
      case 'contact':
        this.props.navigation.navigate('contact');
        break;
      case 'aboutTrigle':
        this.props.navigation.navigate('aboutTrigle');
        break;
    }
  }



  render () {
    return (
      <SafeAreaView style={styles.container}>
        <ListItem
          onPress={() => this.navigate('profile')}
          title="프로필"
        ></ListItem>
        <ListItem
          onPress={() => this.navigate('address')}
          title="주소록"
        ></ListItem>
        <ListItem
          onPress={() => this.navigate('sendMail')}
          title="보낸 편지"
        ></ListItem>
        <ListItem
          onPress={() => this.navigate('receiveMail')}
          title="받은 편지"
        ></ListItem>
        <ListItem
          onPress={() => this.navigate('contact')}
          title="문의하기"
        ></ListItem>
        <ListItem
          onPress={() => this.navigate('aboutTrigle')}
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
