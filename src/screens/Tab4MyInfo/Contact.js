import React, { Component } from 'react';
import { 
  AsyncStorage, View, Text, Button, StyleSheet, SafeAreaView, TouchableOpacity, WebView
} from 'react-native';
import { ListItem } from 'react-native-elements';
import api from './../../api';


class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      env: '',
      isLoading: true,
    };
  }

  componentDidMount() {
    const query = `{
      extraEnvs(
        type: "qna"
      ) {
        id
        title
        content
      }
    }`;
    api.get(query).then(r => {
      this.setState({ env: r.data.data.extraEnvs, isLoading: false });
    });
  }
  
  componentDidAppear() {
  }

  togle = (i) => {
    let envs = this.state.env;
    envs[i].checked = !Boolean(envs[i].checked);
    this.setState({ env: envs })
  }

  render () {
    if (this.state.isLoading) {
      return (<Text>로딩중</Text>);
    } else {
      return (
        <SafeAreaView style={styles.container}>
          <View>
            {
              this.state.env.map((item, i) => (
                <TouchableOpacity 
                  onPress={() => this.togle(i)}
                  key={i}>
                  <ListItem
                    rightIcon={{ name: 'arrow-right', type: 'simple-line-icon' }}
                    title={item.title}
                  />
                  { item.checked ? <Text>{ item.content}</Text> : void 0 }
                </TouchableOpacity>
              ))
            }
          </View>
        </SafeAreaView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Contact;
