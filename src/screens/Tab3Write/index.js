import React, { Component } from 'react';
import { 
  AsyncStorage, View, Text, Button, StyleSheet, SafeAreaView, TouchableOpacity
} from 'react-native';

class Tab3Write extends Component {
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

  postMail = () => {
    alert("보내기버리")
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
          title="편지지"
          content="기본편지지"
        ></ListItem>
        <ListItem
          onPress={() => this.navigate('write')}
          title="내용"
          content=""
        ></ListItem>
        <ListItem
          onPress={() => this.navigate('receiver')}
          title="받는이"
          content=""
        ></ListItem>
        <ListItem
          onPress={() => this.navigate('envelope')}
          title="편지봉투"
          content="기본 편지봉투"
        ></ListItem>
        <ListItem
          onPress={() => this.navigate('media')}
          title="(옵션) 사진, 영상추가"
          content="추가안함"
        ></ListItem>
        <View>
          <Text style={styles.price}>우편소모 3장</Text>
          <Button title="보내기" onPress={this.postMail}></Button>
        </View>
      </SafeAreaView>
    );
  }
}

class ListItem extends Component {
  render () {
    return (
      <TouchableOpacity style={this.props.content ? styles.item : styles.emptyItem} onPress={this.props.onPress}>
        <Text>{this.props.title}</Text>
        <Text>{this.props.content.length > 15 ? this.props.content.slice(0, 15) + "..." : this.props.content}</Text>
      </TouchableOpacity>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    margin: 30,
  },
  content: {
    flex: 1,
    backgroundColor: '#33373B',
  },
  item: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#d3c208',
    padding: 10,
    borderStyle: 'solid',
    marginBottom: 10,
    backgroundColor: '#bdf280'
  },
  emptyItem: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#d3c208',
    padding: 10,
    borderStyle: 'solid',
    marginBottom: 10,
    backgroundColor: '#f47a42'
  }
});

export default Tab3Write;
