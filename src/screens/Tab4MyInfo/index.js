import React, { Component } from 'react';
import { 
  ScrollView, TouchableOpacity, AsyncStorage, View, Text, TextInput, Button, Platform, StyleSheet, SafeAreaView
} from 'react-native';
import { List, ListItem } from 'react-native-elements'

const list = [
  {
    navigation: 'statistics',
    title: '공지사항',
    icon: 'newspaper-o',
    iconType: 'font-awesome',
    rightIcon: 'arrow-right',
    rightIconType: 'simple-line-icon'
  }, {
    navigation: 'profile',
    title: '내 프로필',
    icon: 'person',
    rightIcon: 'arrow-right',
    rightIconType: 'simple-line-icon'
  }, {
    navigation: 'address',
    title: '주소록',
    icon: 'address-book-o',
    iconType: 'font-awesome',
    rightIcon: 'arrow-right',
    rightIconType: 'simple-line-icon'
  }, {
    navigation: 'sendMail',
    title: '보낸 편지',
    icon: 'paper-plane-o',
    iconType: 'font-awesome',
    rightIcon: 'arrow-right',
    rightIconType: 'simple-line-icon'
  }, {
    navigation: 'receiveMail',
    title: '받은 편지',
    icon: 'mail-read',
    iconType: 'octicon',
    rightIcon: 'arrow-right',
    rightIconType: 'simple-line-icon'
  }, {
    navigation: 'contact',
    title: '자주 묻는 질문',
    icon: 'question',
    iconType: 'simple-line-icon',
    rightIcon: 'arrow-right',
    rightIconType: 'simple-line-icon'
  }, {
    navigation: 'aboutTrigle',
    title: '회원탈퇴',
    icon: 'trash',
    iconType: 'simple-line-icon',
    rightIcon: 'arrow-right',
    rightIconType: 'simple-line-icon'
  }
]

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
        <ScrollView>
          {
            list.map((item, i) => { 
              let a = (
                <TouchableOpacity
                  onPress={() => {this.navigate(`${item.navigation}`)}}
                  key={i}
                >
                  <ListItem
                    title={item.title}
                    leftIcon={{ name: item.icon, type: item.iconType }}
                    rightIcon={{ name: item.rightIcon, type: item.rightIconType }}
                  />
                </TouchableOpacity>
              )
              switch (item.title) {
                case '내 프로필':
                  return <View key={i}><View style={{ height: 20 }}></View>{a}</View>
                    break;
                case '보낸 편지':
                  return <View key={i}><View style={{ height: 20 }}></View>{a}</View>
                    break;
                case '자주 묻는 질문':
                  return <View key={i}><View style={{ height: 20 }}></View>{a}</View>
                    break;
                default:
                  return a
                  break;
              }
            })
          }
        </ScrollView>
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

export default AuthScreen;
