import React, { Component } from 'react';
import { 
  AsyncStorage, View, Text, TextInput, StyleSheet, SafeAreaView, TouchableOpacity
} from 'react-native';
import { Icon, Divider } from 'react-native-elements'

class Tab3Write extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  static navigationOptions =  ({ navigation }) => {
    return {
      headerRight: (
        <View style={{ flexDirection: 'row' }}>
          <Icon
            name='send-o'
            type='font-awesome'
            color='#f50'
            onPress={navigation.getParam('add')} />
          <Icon
            name='mail-read'
            type='octicon'
            color='#f50'
            onPress={navigation.getParam('add')} />
          <Icon
            name='paperclip'
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

        <View>
          <View 
            style={styles.inputForm}>
            <Text
              style={styles.label}
            >보낸사람</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => this.setState({ text })}
              placeholder="보낸사람"
            ></TextInput>
          </View>
          <View style={styles.divider}/>
          <View 
            style={styles.inputForm}>
            <Text
              style={styles.label}
            >받는사람</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => this.setState({ text })}
            ></TextInput>
          </View>
          <View style={styles.divider}/>
        </View>
        <View style={{ flex: 1}}>
          <View style={{ flex: 1, justifyContent: 'flex-start', marginLeft: 10, marginTop:10 }}>
            <TextInput
              style={{ fontSize: 16 }}
              value={this.state.value}
              onChangeText={text=>this.setState({value:text})}
              multiline={true}
              underlineColorAndroid='transparent'
              placeholder='내용 작성'
            />
          </View>
        </View>

        { /*
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
        */ }

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
  },
  inputForm: { height: 50, flexDirection: 'row', alignItems:'center', paddingLeft: 10},
  label: {
    flex: 0.17,
    fontSize: 16
  },
  textInput: {
    flex: 0.83,
    fontSize: 16
  },
  divider: { borderBottomColor: '#cccccc', borderBottomWidth: 1 }
});

export default Tab3Write;
