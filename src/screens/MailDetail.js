import React, { Component } from 'react';
import { 
  ScrollView, AsyncStorage, View, Text, Button, StyleSheet, SafeAreaView, TouchableOpacity, WebView
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Avatar } from 'react-native-elements';

const mailData = {
  sender: {
    nickname: '파란#1'
  },
  receiver: {
    nickname: '짜장#1'
  },
  content: "안안안녕 만나서 반갑습니다.\n저는 이유성입니다. \n하하하안녕 만나서 반갑습니다.\n안안녕 만나서 반갑습니다.\n저는 이유성입니다. \n하하하안녕 만나서 반갑습니다.\n안안녕 만나서 반갑습니다.\n저는 이유성입니다. \n하하하안녕 만나서 반갑습니다.\n안안녕 만나서 반갑습니다.\n저는 이유성입니다. \n하하하안녕 만나서 반갑습니다.\n안안녕 만나서 반갑습니다.\n저는 이유성입니다. \n하하하안녕 만나서 반갑습니다.\n안안녕 만나서 반갑습니다.\n저는 이유성입니다. \n하하하안녕 만나서 반갑습니다.\n안안녕 만나서 반갑습니다.\n저는 이유성입니다. \n하하하안녕 만나서 반갑습니다.\n안녕 만나서 반갑습니다.\n저는 이유성입니다. \n하하하안녕 만나서 반갑습니다.\n저는 이유성입니다. \n하하하안녕 만나서 반갑습니다.\n저는 이유성입니다. \n하하하안녕 만나서 반갑습니다.\n저는 이유성입니다. \n하하하안녕 만나서 반갑습니다.\n저는 이유성입니다. \n하하하안녕 만나서 반갑습니다.\n저는 이유성입니다. \n하하하안녕 만나서 반갑습니다.\n저는 이유성입니다. \n하하하안녕 만나서 반갑습니다.\n저는 이유성입니다. \n하하하안녕 만나서 반갑습니다.\n저는 이유성입니다. \n하하하녕 만나서 반갑습니다.\n저는 이유성입니다. \n하하하. 저기 잘먹고 잘살고있어요?",
  date: JSON.stringify(new Date())
}

class AboutTrigle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mail: mailData
    };
  }

  componentDidMount() {
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
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={{ maxHeight: "74%"}}>
            <ScrollView>
              <Text style={styles.receiver}><Text>To. </Text>{this.state.mail.receiver.nickname}</Text>
              <Text style={styles.text}>{this.state.mail.content}</Text>
            </ScrollView>
          </View>
          <TouchableOpacity 
            onPress={() => this.navigate('profileDetail')}
            style={styles.sender}>
            <Avatar
              size='medium'
              source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg"}}
              activeOpacity={0.7}
            />
            <View style={{ flex: 0.9, marginLeft: 10 }}>
              <Text style={styles.senderName}>{this.state.mail.sender.nickname}</Text>
              <Text style={styles.date}>{this.state.mail.date}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    backgroundColor: 'grey',
    padding: 20,
    margin: 25,
    flex: 1,
  },
  receiver: {
    fontSize: 17,
    backgroundColor: 'red',
    marginBottom: 20
  },
  dear: {
    fontSize: 14
  },
  text: {
    fontSize: 15,
    lineHeight: 25,
    marginBottom: 30,
  },
  sender: {
    marginTop: 40,
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#969696',
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    margin: 10,
    // ios
    backgroundColor: '#fffef9',
    shadowOffset: {width: 0, height: 13}, 
    shadowOpacity: 0.3,
    shadowRadius: 6,

    // android (Android +5.0)
    elevation: 3,
    
  }
});

export default AboutTrigle;
