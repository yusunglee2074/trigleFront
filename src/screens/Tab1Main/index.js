import React, { Component } from 'react';
import { 
  TouchableOpacity, FlatList, AsyncStorage, View, Text, TextInput, Button, Platform, StyleSheet, SafeAreaView
} from 'react-native';
import { Card, Icon } from 'react-native-elements';

const data = [
  {
    content: '안녕 만나서 반가워! 나는 28살이고 경기도 수원에 살고있는 남자야! 나는 앱 개발자로 일하고있어! 너는 어떤일을 하고 있니?',
    sender: '볶음김치#123',
    date: JSON.stringify(new Date())
  },
  {
    content: '안녕 만나서 반가워! 나는 28살이고 경기도 수원에 살고있는 남자야! 나는 앱 개발자로 일하고있어! 너는 어떤일을 하고 있니?',
    sender: '볶음김치#123',
    date: JSON.stringify(new Date())
  },
  {
    content: '안녕 만나서 반가워! 나는 28살이고 경기도 수원에 살고있는 남자야! 나는 앱 개발자로 일하고있어! 너는 어떤일을 하고 있니?',
    sender: '볶음김치#123',
    date: JSON.stringify(new Date())
  },
  {
    content: '안녕 만나서 반가워! 나는 28살이고 경기도 수원에 살고있는 남자야! 나는 앱 개발자로 일하고있어! 너는 어떤일을 하고 있니?',
    sender: '볶음김치#123',
    date: JSON.stringify(new Date())
  },
  {
    content: '안녕 만나서 반가워! 나는 28살이고 경기도 수원에 살고있는 남자야! 나는 앱 개발자로 일하고있어! 너는 어떤일을 하고 있니?',
    sender: '볶음김치#123',
    date: JSON.stringify(new Date())
  },
  {
    content: '안녕 만나서 반가워! 나는 28살이고 경기도 수원에 살고있는 남자야! 나는 앱 개발자로 일하고있어! 너는 어떤일을 하고 있니?',
    sender: '볶음김치#123',
    date: JSON.stringify(new Date())
  },
];

class AuthScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data
    };
  }

  static navigationOptions =  ({ navigation }) => {
    return {
      headerRight: (
        <View style={{ flexDirection: 'row' }}>
          <Icon
            name='question-circle-o'
            type='font-awesome'
            color='#f50'
            onPress={navigation.getParam('add')} />
        </View>
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
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Text
          style={{ margin: 20, fontSize: 20}}>여러분 우리같이 힘내요! - 푸른기사#12</Text>
        </View>
        <FlatList
          style={{ flex:1, marginHorizontal: 10 }}
          data={this.state.data}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
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
                <Text>{item.sender}</Text>
                <Text>{item.date}</Text>
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

export default AuthScreen;
